import { GoogleGenAI, Type, Modality } from "@google/genai";
import { ChapterData } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchChapter = async (book: string, chapter: number): Promise<ChapterData> => {
  const modelName = "gemini-2.5-flash";

  const prompt = `
    Retrieve the full text of the Bible book "${book}", Chapter ${chapter}.
    
    1. Provide the Book Name in English, Chinese (Traditional), and Japanese.
    2. Return the content in three languages simultaneously for each verse:
       - Chinese (Traditional Union Version / CUV).
       - English (NIV or KJV).
       - Japanese (Colloquial Japanese or New Japanese Bible).
    
    CRITICAL REQUIREMENT FOR JAPANESE:
    - field 'japaneseHtml': You MUST format the Japanese text using HTML <ruby> tags for Kanji readings (Furigana). Example: <ruby>初<rt>はじめ</rt></ruby>めに...
    - field 'japanesePlain': Provide the same text WITHOUT ruby tags (clean text) for text-to-speech purposes.
    
    Structure the response as a JSON object.
  `;

  // Define the schema for strict JSON output
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      bookName: { type: Type.STRING, description: "Book name in English" },
      bookNameChinese: { type: Type.STRING, description: "Book name in Chinese" },
      bookNameJapanese: { type: Type.STRING, description: "Book name in Japanese" },
      chapterNumber: { type: Type.INTEGER },
      verses: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            verseNumber: { type: Type.INTEGER },
            chinese: { type: Type.STRING, description: "Chinese text" },
            english: { type: Type.STRING, description: "English text" },
            japaneseHtml: { type: Type.STRING, description: "Japanese text with <ruby> tags" },
            japanesePlain: { type: Type.STRING, description: "Japanese text without tags for TTS" }
          },
          required: ["verseNumber", "chinese", "english", "japaneseHtml", "japanesePlain"]
        }
      }
    },
    required: ["bookName", "bookNameChinese", "bookNameJapanese", "chapterNumber", "verses"]
  };

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.1, 
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    const data = JSON.parse(text) as ChapterData;
    return data;

  } catch (error) {
    console.error("Error fetching chapter:", error);
    throw error;
  }
};

// --- Text to Speech Service ---

let audioContext: AudioContext | null = null;

export const playTextToSpeech = async (text: string, language: 'en' | 'zh' | 'ja') => {
  try {
    // Initialize AudioContext on user interaction
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    // Determine voice config based on language
    // Note: Gemini TTS voices are currently limited, 'Kore' is a good general purpose voice.
    // The model handles the language accent surprisingly well even with a default voice.
    const voiceName = 'Kore'; 

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) throw new Error("No audio data received");

    const audioBuffer = await decodeAudioData(
      decode(base64Audio),
      audioContext,
      24000,
      1
    );

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();

  } catch (error) {
    console.error("TTS Error:", error);
    throw error;
  }
};

// --- Audio Helpers ---

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}