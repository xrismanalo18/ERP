declare module "mammoth/mammoth.browser" {
  type MammothMessage = { type: string; message: string };
  type MammothResult = { value: string; messages: MammothMessage[] };

  export function extractRawText(input: {
    arrayBuffer: ArrayBuffer;
  }): Promise<MammothResult>;
}
