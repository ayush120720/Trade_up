// quizApi.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import apiClient from "../services/apiClient";

/**
 * Fetch a new quiz question set from Gemini.
 * Returns an array of formatted questions:
 * [{ question: string, options: string[], answer: number }, ...]
 */
export const fetchQuizQuestions = async () => {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Missing REACT_APP_GEMINI_API_KEY");
    throw new Error("Missing AI API key");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  // Strong system instruction: request ONLY JSON in the exact schema.
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `
You are a quiz generator bot. Your job is to produce a fresh, non-repeating set of multiple-choice questions every time you are called.

STRICT RULES:
1. ALL questions must be about the STOCK MARKET only.
2. Focus strongly on the UNITED STATES STOCK MARKET (NYSE, NASDAQ, S&P 500, Dow Jones, SEC rules, U.S. trading concepts, U.S. companies, ETFs, etc.).
3. NO question should repeat from any previous response. Avoid reusing question structures, wording, or topics already used.
4. Generate EXACTLY 5 questions.
5. Each question must have EXACTLY 4 options.
6. The correct answer must be one of the options.
7. Vary difficulty (mix of beginner + intermediate).
8. Cover DIFFERENT TOPICS in each set, such as:
   - U.S. stock exchanges
   - U.S. market indices (S&P 500, NASDAQ 100, Dow Jones)
   - U.S. companies & tickers
   - Trading concepts (limit order, market order, bid-ask spread)
   - Technical analysis basics
   - Fundamental terms (EPS, P/E ratio, dividends)
   - U.S. regulations (SEC, FD rules)
   - ETFs, mutual funds, U.S. bond market interactions
9. NEVER generate the same question twice. Always produce new, unique content.

OUTPUT FORMAT (VERY STRICT):
- Output ONLY valid JSON.
- No explanations, no prose, no markdown.
- Follow this exact schema:

{
  "questions": [
    {
      "question": "string",
      "options": ["A", "B", "C", "D"],
      "answer": "exact option text"
    }
  ]
}

DO NOT add any text outside the JSON. NO markdown. NO commentary. NO apologies. ONLY JSON.

    `.trim(),
  });

  const generationConfig = {
    temperature: 0.7,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  try {
    const chatSession = model.startChat({ generationConfig });
    const result = await chatSession.sendMessage("Generate new set of questions");

    // --- Defensive extraction of text from result ---
    let rawText = "";
    try {
      if (result == null) {
        throw new Error("Empty result from model");
      }
      // If result.response.text is a function (common), call it
      if (result.response && typeof result.response.text === "function") {
        rawText = await result.response.text();
      } else if (typeof result.response === "string") {
        rawText = result.response;
      } else if (result?.response?.text) {
        // some shapes: response.text property already present
        rawText = result.response.text;
      } else if (typeof result === "string") {
        rawText = result;
      } else {
        // fallback: stringify the whole object so we can inspect
        rawText = JSON.stringify(result);
      }
    } catch (extractErr) {
      console.error("Failed to extract text from model result:", extractErr, "result:", result);
      throw new Error("Unable to read model response");
    }

    console.debug("Raw model output:", rawText);

    // --- Parse JSON safely. Try direct parse first, then extract JSON block if necessary ---
    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch (parseErr) {
      // look for a JSON block inside rawText (useful if model adds commentary)
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          parsed = JSON.parse(jsonMatch[0]);
        } catch (innerErr) {
          console.error("Failed to parse JSON block from model output:", innerErr);
          throw new Error("Model returned malformed JSON");
        }
      } else {
        console.error("No JSON block found in model output. Raw text:", rawText);
        throw new Error("Model did not return JSON");
      }
    }

    // --- Validate shape ---
    if (!parsed || !Array.isArray(parsed.questions)) {
      console.error("Parsed model response missing 'questions' array:", parsed);
      throw new Error("Model response missing questions array");
    }

    // --- Validate and format each question ---
    const formattedQuestions = parsed.questions.map((q, idx) => {
      if (!q || typeof q.question !== "string") {
        throw new Error(`Invalid question text at index ${idx}`);
      }
      if (!Array.isArray(q.options) || q.options.length !== 4) {
        throw new Error(`Question at index ${idx} must have exactly 4 options`);
      }

      // Determine answer index. Model should return answer as the option text.
      const answerIndex = q.options.indexOf(q.answer);
      if (answerIndex === -1) {
        // fallback: allow numeric answerIndex field
        if (typeof q.answerIndex === "number" && Number.isInteger(q.answerIndex) && q.answerIndex >= 0 && q.answerIndex < q.options.length) {
          return {
            question: q.question,
            options: q.options,
            answer: q.answerIndex,
          };
        }
        throw new Error(`Answer not found among options for question at index ${idx}`);
      }

      return {
        question: q.question,
        options: q.options,
        answer: answerIndex,
      };
    });

    return formattedQuestions;
  } catch (error) {
    // log full error for debugging and throw a readable message for caller
    console.error("Error fetching quiz questions:", error);
    throw new Error("Failed to fetch quiz questions: " + (error.message || error));
  }
};

/**
 * Convert user points to balance via backend endpoint
 * returns backend response (or throws)
 */
export const convertPoints = async (points) => {
  const conversionData = {
    pointsToConvert: points,
  };
  try {
    const response = await apiClient.put("/quiz/convert-points", conversionData);
    console.log("Conversion successful!", response);
    return response;
  } catch (error) {
    console.error("Error while converting points:", error);
    throw error;
  }
};

/**
 * Get user points / balance / rank
 * returns axios response (caller uses response.data)
 */
export const getUserDetails = async () => {
  try {
    const response = await apiClient.get("/quiz/get-points");
    return response;
  } catch (error) {
    console.error("Error while retrieving user details:", error);
    throw error;
  }
};

/**
 * Fetch leaderboard
 */
export const fetchLeaderBoard = async () => {
  try {
    const response = await apiClient.get("/quiz/leaderboard");
    console.log("Leaderboard retrieval successful!", response);
    return response;
  } catch (error) {
    console.error("Error while retrieving leaderboard:", error);
    throw error;
  }
};
