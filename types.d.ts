interface Window {
  electron: {
    getAudioKokoro: (payload: ttsKokoro) => Promise<string>
    getAudioEdge: (payload: ttsEdge) => Promise<string>
  }
}

type ttsEdge = {
  text: string
  voice: string
  lang: string
}

type ttsKokoro = {
  text: string
  voice: voice
}

type VoiceOption = {
  label: string
  voice: string
}

type VoiceMap = {
  [lang: string]: VoiceOption[]
}

type EventPayloadMapping = {
  generateAudioEdge: [ttsEdge, string] // [INPUT, OUTPUT]
  generateAudioKokoro: [ttsKokoro, string]
}
