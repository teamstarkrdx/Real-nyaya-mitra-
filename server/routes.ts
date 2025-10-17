import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";
import multer from "multer";

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export function registerRoutes(app: Express): void {
  
  // Chatbot API - OpenAI powered multilingual legal assistant
  app.post("/api/chat", async (req, res) => {
    console.log("Checking for API Key on Vercel:", process.env.OPENAI_API_KEY);
    try {
      const { message, language } = req.body;
      const userLanguage = language || 'English'; // Default to English if not provided

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ 
          error: "OpenAI API key not configured",
          response: "The chatbot service is not properly configured. Please contact support." 
        });
      }

      const systemPrompt = `You are NYAYA MITRA AI, India's premier AI legal assistant. You provide accurate legal guidance based on Indian law including Constitution, IPC, CrPC, and other Indian acts. 

IMPORTANT: Respond in ${userLanguage}. If the language is not English, translate your entire response to ${userLanguage} while maintaining legal accuracy.

Guidelines:
- Provide clear, accurate information about Indian laws
- Cite relevant articles, sections, and acts
- Be empathetic and professional
- Simplify legal jargon for common understanding
- Suggest seeking professional legal counsel for serious matters
- Cover areas: Constitutional law, Criminal law, Civil law, Family law, Consumer rights, Labour law

Always maintain accuracy and cite Indian legal provisions when applicable.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      const response = completion.choices[0]?.message?.content || "I apologize, I couldn't process your request.";

      res.json({ response });
    } catch (error) {
      console.error("Chat API error:", error);
      res.status(500).json({ 
        error: "Failed to get response",
        response: "I apologize for the inconvenience. Please try again later." 
      });
    }
  });

  // Document Verification API - Dual AI verification (OpenAI + Gemini)
  app.post("/api/verify-document", upload.single('document'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Validate API keys
      if (!process.env.OPENAI_API_KEY || !process.env.GEMINI_API_KEY) {
        return res.status(500).json({ 
          error: "Verification service not configured. Both OpenAI and Gemini API keys are required." 
        });
      }

      const fileBuffer = req.file.buffer;
      const base64Image = fileBuffer.toString('base64');
      const mimeType = req.file.mimetype;

      const results = [];

      // OpenAI Vision Analysis
      try {
        const openaiResponse = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `Analyze this document image for authenticity. Check for:
1. Document format and structure
2. Text positioning and alignment
3. Character consistency and fonts
4. Image blur or manipulation
5. Color consistency
6. Presence of official keywords and seals

Provide a JSON response with:
{
  "status": "Real" or "Fake",
  "confidence": <number 0-100>,
  "factors": {
    "format": <boolean>,
    "positioning": <boolean>,
    "characters": <boolean>,
    "blur": <boolean>,
    "colors": <boolean>,
    "keywords": <boolean>
  }
}`
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:${mimeType};base64,${base64Image}`
                  }
                }
              ]
            }
          ],
          max_tokens: 500
        });

        const openaiContent = openaiResponse.choices[0]?.message?.content || '{}';
        // Improved JSON extraction: Remove markdown code blocks if present
        const cleanOpenAIContent = openaiContent.replace(/```json\n?|\n?```/g, '').trim();
        const jsonMatch = cleanOpenAIContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const openaiResult = JSON.parse(jsonMatch[0]);
          // Validate required fields
          if (!openaiResult.status || typeof openaiResult.confidence !== 'number' || !openaiResult.factors) {
            throw new Error("Invalid OpenAI response structure");
          }
          results.push({ api: "OpenAI", ...openaiResult });
        } else {
          throw new Error("Invalid OpenAI response format");
        }
      } catch (error) {
        console.error("OpenAI verification error:", error);
        return res.status(500).json({ 
          error: "OpenAI verification failed. Please try again." 
        });
      }

      // Gemini Vision Analysis
      try {
        const prompt = `Analyze this document image for authenticity. Check for:
1. Document format and structure
2. Text positioning and alignment
3. Character consistency and fonts
4. Image blur or manipulation
5. Color consistency
6. Presence of official keywords and seals

Provide a JSON response with:
{
  "status": "Real" or "Fake",
  "confidence": <number 0-100>,
  "factors": {
    "format": <boolean>,
    "positioning": <boolean>,
    "characters": <boolean>,
    "blur": <boolean>,
    "colors": <boolean>,
    "keywords": <boolean>
  }
}`;

        const result = await genai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [
            {
              inlineData: {
                data: base64Image,
                mimeType: mimeType
              }
            },
            { text: prompt }  // Fixed: Wrap prompt in { text: }
          ]
        });

        const geminiContent = result.text || '{}';
        // Improved JSON extraction: Remove markdown code blocks if present
        const cleanGeminiContent = geminiContent.replace(/```json\n?|\n?```/g, '').trim();
        const jsonMatch = cleanGeminiContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const geminiResult = JSON.parse(jsonMatch[0]);
          // Validate required fields
          if (!geminiResult.status || typeof geminiResult.confidence !== 'number' || !geminiResult.factors) {
            throw new Error("Invalid Gemini response structure");
          }
          results.push({ api: "Gemini", ...geminiResult });
        } else {
          throw new Error("Invalid Gemini response format");
        }
      } catch (error) {
        console.error("Gemini verification error:", error);
        return res.status(500).json({ 
          error: "Gemini verification failed. Please try again." 
        });
      }

      res.json({ results });
    } catch (error) {
      console.error("Document verification error:", error);
      res.status(500).json({ error: "Failed to verify document" });
    }
  });
}
