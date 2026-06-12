import type { ExtractedContract } from "./types";

const MAX_FILE_BYTES = 20 * 1024 * 1024;
const MAX_CHARACTERS = 300_000;

function cleanText(text: string) {
  return text
    .replace(/\u0000/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim();
}

function enforceLimits(file: File, text: string) {
  if (file.size > MAX_FILE_BYTES) {
    throw new Error("The demo supports files up to 20 MB.");
  }

  const cleaned = cleanText(text);
  if (cleaned.length < 100) {
    throw new Error(
      "No usable text was extracted. Scanned or image-only PDFs are not supported in this demo.",
    );
  }

  if (cleaned.length > MAX_CHARACTERS) {
    throw new Error(
      `The extracted contract exceeds the demo limit of ${MAX_CHARACTERS.toLocaleString()} characters.`,
    );
  }

  return cleaned;
}

async function extractPdf(file: File): Promise<ExtractedContract> {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

  const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
  const pages: string[] = [];
  let emptyPages = 0;

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const text = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    if (!text) emptyPages += 1;
    pages.push(`--- PAGE ${pageNumber} ---\n${text}`);
  }

  const warnings =
    emptyPages > 0
      ? [`${emptyPages} page${emptyPages === 1 ? "" : "s"} contained no extractable text.`]
      : [];
  const text = enforceLimits(file, pages.join("\n\n"));

  return {
    filename: file.name,
    mimeType: file.type || "application/pdf",
    pageCount: pdf.numPages,
    characterCount: text.length,
    text,
    warnings,
  };
}

async function extractDocx(file: File): Promise<ExtractedContract> {
  const mammoth = await import("mammoth/mammoth.browser");
  const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
  const text = enforceLimits(
    file,
    `--- DOCUMENT START ---\n${result.value}\n--- DOCUMENT END ---`,
  );

  return {
    filename: file.name,
    mimeType:
      file.type ||
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    pageCount: null,
    characterCount: text.length,
    text,
    warnings: result.messages.map((message) => message.message),
  };
}

export async function extractContract(file: File): Promise<ExtractedContract> {
  const extension = file.name.split(".").pop()?.toLowerCase();

  if (extension === "pdf") return extractPdf(file);
  if (extension === "docx") return extractDocx(file);

  throw new Error("Unsupported file type. Upload a text-based PDF or DOCX contract.");
}
