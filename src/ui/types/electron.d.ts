export {}

declare global {
  interface Window {
    electron: {
      generateAudioKokoro: (text: string) => Promise<string>
      generateAudioEdge: (
        text: string,
        voice?: string,
        lang?: string
      ) => Promise<string>
    }
  }
}
