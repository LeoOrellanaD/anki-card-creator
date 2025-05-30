const voices = [
  {
    label: 'Afrikaans Female (South Africa)',
    voice: 'af-ZA-AdriNeural3',
    lang: 'af-ZA',
  },
  {
    label: 'Afrikaans Male (South Africa)',
    voice: 'af-ZA-WillemNeural3',
    lang: 'af-ZA',
  },

  { label: 'Arabic Female (Egypt)', voice: 'ar-EG-SalmaNeural', lang: 'ar-EG' },
  { label: 'Arabic Female (Jordan)', voice: 'ar-JO-RanaNeural', lang: 'ar-JO' },
  {
    label: 'Arabic Female (Saudi Arabia)',
    voice: 'ar-SA-HamedNeural',
    lang: 'ar-SA',
  },
  {
    label: 'Arabic Male (Saudi Arabia)',
    voice: 'ar-SA-ZariyahNeural',
    lang: 'ar-SA',
  },

  {
    label: 'Bulgarian Female (Bulgaria)',
    voice: 'bg-BG-BorislavNeural',
    lang: 'bg-BG',
  },

  {
    label: 'Catalan Female (Spain)',
    voice: 'ca-ES-JoanaNeural',
    lang: 'ca-ES',
  },

  {
    label: 'Chinese Female (Mainland)',
    voice: 'zh-CN-XiaoxiaoNeural',
    lang: 'zh-CN',
  },
  {
    label: 'Chinese Female (Hong Kong)',
    voice: 'zh-HK-HiuGaaiNeural',
    lang: 'zh-HK',
  },
  {
    label: 'Chinese Female (Taiwan)',
    voice: 'zh-TW-HsiaoChenNeural',
    lang: 'zh-TW',
  },

  {
    label: 'Croatian Female (Croatia)',
    voice: 'hr-HR-SreckoNeural',
    lang: 'hr-HR',
  },

  {
    label: 'Czech Female (Czech Republic)',
    voice: 'cs-CZ-VlastaNeural',
    lang: 'cs-CZ',
  },

  {
    label: 'Danish Female (Denmark)',
    voice: 'da-DK-ChristelNeural',
    lang: 'da-DK',
  },

  {
    label: 'Dutch Female (Netherlands)',
    voice: 'nl-NL-ColetteNeural',
    lang: 'nl-NL',
  },
  {
    label: 'Dutch Male (Netherlands)',
    voice: 'nl-NL-FennaNeural',
    lang: 'nl-NL',
  },

  {
    label: 'English Female (Australia)',
    voice: 'en-AU-NatashaNeural',
    lang: 'en-AU',
  },
  {
    label: 'English Female (Canada)',
    voice: 'en-CA-ClaraNeural',
    lang: 'en-CA',
  },
  {
    label: 'English Female (India)',
    voice: 'en-IN-NeerjaNeural',
    lang: 'en-IN',
  },
  { label: 'English Female (UK)', voice: 'en-GB-EmilyNeural', lang: 'en-GB' },
  { label: 'English Male (UK)', voice: 'en-GB-RyanNeural', lang: 'en-GB' },
  { label: 'English Female (US)', voice: 'en-US-AriaNeural', lang: 'en-US' },
  { label: 'English Male (US)', voice: 'en-US-GuyNeural', lang: 'en-US' },

  {
    label: 'Estonian Female (Estonia)',
    voice: 'et-EE-LyNeural',
    lang: 'et-EE',
  },

  {
    label: 'Finnish Female (Finland)',
    voice: 'fi-FI-NooraNeural',
    lang: 'fi-FI',
  },

  {
    label: 'French Female (France)',
    voice: 'fr-FR-DeniseNeural',
    lang: 'fr-FR',
  },
  { label: 'French Male (France)', voice: 'fr-FR-HenriNeural', lang: 'fr-FR' },

  {
    label: 'German Female (Germany)',
    voice: 'de-DE-KatjaNeural',
    lang: 'de-DE',
  },
  {
    label: 'German Male (Germany)',
    voice: 'de-DE-ConradNeural',
    lang: 'de-DE',
  },

  {
    label: 'Greek Female (Greece)',
    voice: 'el-GR-AthinaNeural',
    lang: 'el-GR',
  },

  { label: 'Hebrew Female (Israel)', voice: 'he-IL-AvriNeural', lang: 'he-IL' },

  { label: 'Hindi Female (India)', voice: 'hi-IN-MadhurNeural', lang: 'hi-IN' },

  {
    label: 'Hungarian Female (Hungary)',
    voice: 'hu-HU-NoemiNeural',
    lang: 'hu-HU',
  },

  {
    label: 'Icelandic Female (Iceland)',
    voice: 'is-IS-GudrunNeural',
    lang: 'is-IS',
  },

  {
    label: 'Indonesian Female (Indonesia)',
    voice: 'id-ID-GadisNeural',
    lang: 'id-ID',
  },

  {
    label: 'Italian Female (Italy)',
    voice: 'it-IT-IsabellaNeural',
    lang: 'it-IT',
  },

  {
    label: 'Japanese Female (Japan)',
    voice: 'ja-JP-AyumiNeural',
    lang: 'ja-JP',
  },

  { label: 'Korean Female (Korea)', voice: 'ko-KR-SunHiNeural', lang: 'ko-KR' },

  {
    label: 'Latvian Female (Latvia)',
    voice: 'lv-LV-EvelinaNeural',
    lang: 'lv-LV',
  },

  {
    label: 'Lithuanian Female (Lithuania)',
    voice: 'lt-LT-OnaNeural',
    lang: 'lt-LT',
  },

  {
    label: 'Malay Female (Malaysia)',
    voice: 'ms-MY-SitiNeural',
    lang: 'ms-MY',
  },

  {
    label: 'Norwegian Female (Norway)',
    voice: 'nb-NO-PernilleNeural',
    lang: 'nb-NO',
  },

  { label: 'Polish Female (Poland)', voice: 'pl-PL-MajaNeural', lang: 'pl-PL' },
  { label: 'Polish Male (Poland)', voice: 'pl-PL-MarekNeural', lang: 'pl-PL' },

  {
    label: 'Portuguese Female (Portugal)',
    voice: 'pt-PT-RaquelNeural',
    lang: 'pt-PT',
  },
  {
    label: 'Portuguese Female (Brazil)',
    voice: 'pt-BR-FranciscaNeural',
    lang: 'pt-BR',
  },
  {
    label: 'Portuguese Male (Brazil)',
    voice: 'pt-BR-AntonioNeural',
    lang: 'pt-BR',
  },

  {
    label: 'Romanian Female (Romania)',
    voice: 'ro-RO-EmilianaNeural',
    lang: 'ro-RO',
  },

  {
    label: 'Russian Female (Russia)',
    voice: 'ru-RU-DariyaNeural',
    lang: 'ru-RU',
  },
  {
    label: 'Russian Male (Russia)',
    voice: 'ru-RU-DmitryNeural',
    lang: 'ru-RU',
  },

  {
    label: 'Slovak Female (Slovakia)',
    voice: 'sk-SK-ViktoriaNeural',
    lang: 'sk-SK',
  },

  {
    label: 'Slovenian Female (Slovenia)',
    voice: 'sl-SI-MajaNeural',
    lang: 'sl-SI',
  },

  {
    label: 'Spanish Female (Spain)',
    voice: 'es-ES-HelenaNeural',
    lang: 'es-ES',
  },
  { label: 'Spanish Male (Spain)', voice: 'es-ES-PabloNeural', lang: 'es-ES' },

  {
    label: 'Swedish Female (Sweden)',
    voice: 'sv-SE-SofieNeural',
    lang: 'sv-SE',
  },

  { label: 'Thai Female (Thailand)', voice: 'th-TH-NidNeural', lang: 'th-TH' },

  {
    label: 'Turkish Female (Turkey)',
    voice: 'tr-TR-EmelNeural',
    lang: 'tr-TR',
  },

  {
    label: 'Ukrainian Female (Ukraine)',
    voice: 'uk-UA-OksanaNeural',
    lang: 'uk-UA',
  },

  {
    label: 'Vietnamese Female (Vietnam)',
    voice: 'vi-VN-HaichNeural',
    lang: 'vi-VN',
  },
]

export default voices
