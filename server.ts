import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "PEIS Backend" });
  });

  // Gemini API Proxy for Engineering Analysis
  app.post("/api/analyze-drawing", async (req, res) => {
    try {
      const { drawingData } = req.body;
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY || "",
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `
        Analyze the following PGM drawing metadata and verify it against standard engineering rules.
        Identify any inconsistencies in Part Numbers, Material specifications, or Title Block standards.
        
        Data: ${JSON.stringify(drawingData)}
        
        Return a JSON object with:
        {
          "isValid": boolean,
          "issues": string[],
          "suggestions": string[]
        }
      `;

      const result = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt
      });
      
      const text = result.text || "{}";
      
      // Basic JSON extraction from markdown if necessary
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : { isValid: true, issues: [], suggestions: [] };

      res.json(analysis);
    } catch (error: any) {
      console.error("Gemini Analysis Error:", error);
      res.status(500).json({ error: "Failed to analyze drawing" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PEIS Server running on http://localhost:${PORT}`);
  });
}

startServer();
