import fs from "node:fs/promises";
import path from "node:path";
import JSZip from "jszip";

const paragraphs = [
  "ENTERPRISE SOFTWARE AS A SERVICE AGREEMENT",
  "This Enterprise Software as a Service Agreement (the \"Agreement\") is entered into by and between Northstar Cloud Systems, Inc. (\"Provider\") and Meridian Health Analytics, Inc. (\"Customer\").",
  "1. EFFECTIVE DATE AND TERM",
  "This Agreement is effective on January 1, 2026 and continues through December 31, 2027. It automatically renews for successive twelve-month periods unless either party provides written notice at least sixty days before the end of the then-current term.",
  "2. SERVICES AND DELIVERABLES",
  "Provider will provide access to its hosted analytics platform, implementation assistance, standard support, and quarterly business reviews. Customer may authorize up to 500 named users. Additional integrations or professional services require a mutually signed statement of work.",
  "3. FEES AND PAYMENT",
  "Customer will pay USD 280,000 for the initial twenty-four-month term. Provider invoices quarterly in advance. Payment is due within thirty days after the invoice date. Overdue undisputed amounts accrue interest at 1.5 percent per month.",
  "4. CUSTOMER RESPONSIBILITIES",
  "Customer will provide timely access to personnel and systems, maintain the confidentiality of account credentials, and ensure its use of the Services complies with applicable law.",
  "5. SERVICE LEVEL AGREEMENT",
  "Provider will make the production service available 99.5 percent of each calendar month, excluding scheduled maintenance. Provider will respond to Priority 1 incidents within four hours and Priority 2 incidents within eight hours. Customer's sole remedy for an SLA failure is a service credit equal to five percent of the affected monthly fee.",
  "6. DATA PRIVACY AND SECURITY",
  "Provider will maintain reasonable administrative, technical, and physical safeguards. Provider will notify Customer within seventy-two hours after confirming a breach involving Customer Data. Provider may use subprocessors but does not provide a current subprocessor list in this Agreement.",
  "7. CONFIDENTIALITY",
  "Each party will protect the other party's Confidential Information using reasonable care and use it only to perform this Agreement. Confidentiality obligations do not apply to information independently developed, publicly available, or lawfully received from a third party.",
  "8. LIABILITY",
  "Except for Customer's payment obligations, each party's aggregate liability will not exceed fees paid or payable during the twelve months preceding the event giving rise to liability. Neither party is liable for indirect, incidental, special, or consequential damages.",
  "9. TERMINATION",
  "Either party may terminate for material breach if the breach remains uncured thirty days after written notice. Customer may terminate for convenience on ninety days written notice and must pay twenty percent of the fees remaining in the current term.",
  "10. GOVERNING LAW AND DISPUTES",
  "This Agreement is governed by the laws of the State of Delaware. The parties will first attempt good-faith executive negotiation before filing a claim in the state or federal courts located in Wilmington, Delaware.",
  "11. NOTICES",
  "Formal notices must be delivered by recognized overnight courier or email with confirmation of receipt to the addresses designated by each party.",
  "12. ENTIRE AGREEMENT",
  "This Agreement and signed statements of work constitute the entire agreement between the parties and may be amended only in a writing signed by both parties.",
  "INTENTIONAL REVIEW GAPS",
  "This synthetic demo agreement intentionally omits an indemnification clause and does not name specific notice email addresses. The scope of Provider's security audit obligations and Customer's data-deletion rights are also not defined.",
];

const escapeXml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const body = paragraphs
  .map((paragraph, index) => {
    const heading = index === 0 || /^\d+\./.test(paragraph) || paragraph === "INTENTIONAL REVIEW GAPS";
    const props = heading ? "<w:pPr><w:pStyle w:val=\"Heading1\"/></w:pPr>" : "";
    return `<w:p>${props}<w:r><w:t xml:space="preserve">${escapeXml(paragraph)}</w:t></w:r></w:p>`;
  })
  .join("");

const zip = new JSZip();
zip.file(
  "[Content_Types].xml",
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>`,
);
zip.folder("_rels").file(
  ".rels",
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`,
);
zip.folder("word").file(
  "document.xml",
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${body}<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/></w:sectPr></w:body></w:document>`,
);

const output = await zip.generateAsync({ type: "nodebuffer" });
const outputPath = path.join(process.cwd(), "public", "samples", "demo-saas-agreement.docx");
await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, output);
console.log(`Generated ${outputPath}`);
