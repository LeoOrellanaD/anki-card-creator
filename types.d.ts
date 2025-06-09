interface Window {
  electron: {
    generateAudioKokoro: (payload: ttsKokoro) => Promise<string>
    generateAudioEdge: (payload: ttsEdge) => Promise<string>
  }
}

type EventPayloadMapping = {
  generateAudioKokoro: ttsKokoro
  generateAudioEdge: ttsEdge
}

type ttsKokoro = {
  text: string
  voice: voice
}

type ttsEdge = {
  text: string
  voice: string
  lang: string //  I need to do a review of this to understand if this is really necessary or something that comes with the voice by default.
}

type VoiceOption = {
  label: string
  voice: string
}

type VoiceMap = {
  [lang: string]: VoiceOption[]
}
