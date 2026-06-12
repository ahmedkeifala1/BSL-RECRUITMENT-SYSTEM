import { promises as fs } from "fs";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

const MAX_LENGTH = 12000;

const WORD_DOCUMENT_TYPES = [
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
];

export async function extractDocumentText(document: {
  url: string;
  type: string;
}): Promise<string> {
  try {
    const path = `${process.cwd()}/public${document.url}`;
    const buffer = await fs.readFile(path);

    let text = "";
    if (document.type === "application/pdf") {
      const parser = new PDFParse({ data: buffer });
      text = (await parser.getText()).text;
      await parser.destroy();
    } else if (WORD_DOCUMENT_TYPES.includes(document.type)) {
      text = (await mammoth.extractRawText({ buffer })).value;
    } else {
      return "";
    }

    return text.trim().slice(0, MAX_LENGTH);
  } catch {
    return "";
  }
}
