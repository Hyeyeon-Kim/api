import { Inject, Injectable } from "@nestjs/common";
import { GoogleGenAI } from "@google/genai";

@Injectable()
export class TmpService {
  constructor(@Inject("GOOGLE_GENAI") private readonly ai: GoogleGenAI) {}

  async generateText(prompt: string) {
    const res = await this.ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const rawText = typeof res.text === "string" ? res.text : String(res.text);
    const cleaned = rawText.replace(/[\r\n]+/g, "");

    // 3) JSON 배열로 파싱 시도
    try {
      const parsed = JSON.parse(cleaned);

      // AI가 이중으로 문자열화했다면 한번 더 파싱
      const arr =
        typeof parsed === "string" &&
        parsed.startsWith("[") &&
        parsed.endsWith("]")
          ? JSON.parse(parsed)
          : parsed;

      if (Array.isArray(arr)) {
        // 모든 요소를 문자열로 보장
        return arr.map((e) => String(e));
      }
    } catch {
      // 파싱 실패 시 빈 배열로 폴백
    }

    // 4) 배열이 아닐 경우에도 빈 배열 반환
    return [];
  }
}
