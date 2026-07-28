export interface Transcription {
  id: string
  title: string
  text: string
  duration: string
  date: string
  type: 'transcription' | 'diary' | 'audio' | 'speaking'
}

export interface DiaryEntry {
  id: string
  title: string
  content: string
  date: string
  mood: string
  duration: string
}

export interface SpeakingSession {
  id: string
  title: string
  transcript: string
  date: string
  duration: string
  score: number
  wpm: number
  fillerWords: { word: string; count: number }[]
}

export interface UsageStats {
  totalTranscriptions: number
  totalMinutes: number
  wordsTranscribed: number
  streak: number
}

export const MOCK_USER = {
  name: 'Alex Rivera',
  email: 'alex@example.com',
  plan: 'Pro',
  joinDate: 'January 2026',
}

export const MOCK_USAGE_STATS: UsageStats = {
  totalTranscriptions: 47,
  totalMinutes: 312,
  wordsTranscribed: 28450,
  streak: 12,
}

export const MOCK_TRANSCRIPTIONS: Transcription[] = [
  {
    id: '1',
    title: 'Team standup meeting',
    text: 'We discussed the roadmap for Q3 and assigned tasks for the new feature rollout. The design team will finalize mockups by Friday.',
    duration: '12:34',
    date: '2026-07-28',
    type: 'transcription',
  },
  {
    id: '2',
    title: 'Morning thoughts',
    text: 'Woke up feeling motivated today. Had a great idea for the podcast intro that I want to explore further this week.',
    duration: '3:22',
    date: '2026-07-27',
    type: 'diary',
  },
  {
    id: '3',
    title: 'Bohemian Rhapsody',
    text: 'Is this the real life, is this just fantasy, caught in a landslide, no escape from reality...',
    duration: '5:55',
    date: '2026-07-26',
    type: 'audio',
  },
  {
    id: '4',
    title: 'Product launch pitch',
    text: 'Good morning everyone. Today I want to talk about our vision for the next generation of voice technology.',
    duration: '8:15',
    date: '2026-07-25',
    type: 'speaking',
  },
  {
    id: '5',
    title: 'Client call notes',
    text: 'The client wants to integrate our API into their mobile app. They need documentation for the webhook setup.',
    duration: '22:10',
    date: '2026-07-24',
    type: 'transcription',
  },
]

export const MOCK_DIARY_ENTRIES: DiaryEntry[] = [
  {
    id: '1',
    title: 'A productive Monday',
    content: 'Started the week strong. Finished the dashboard designs and got positive feedback from the team. Need to follow up on the API integration tomorrow.',
    date: '2026-07-28',
    mood: 'Motivated',
    duration: '2:15',
  },
  {
    id: '2',
    title: 'Weekend reflections',
    content: 'Spent Saturday hiking with friends. The trail was beautiful and it helped clear my mind. Sunday was for reading and planning the week ahead.',
    date: '2026-07-27',
    mood: 'Relaxed',
    duration: '3:40',
  },
  {
    id: '3',
    title: 'New project idea',
    content: 'Had a breakthrough idea for a voice journaling app that could analyze sentiment over time. Need to sketch out the concept more.',
    date: '2026-07-25',
    mood: 'Excited',
    duration: '4:12',
  },
  {
    id: '4',
    title: 'Rainy day thoughts',
    content: 'The rain made everything feel slow today. Spent most of the day reading and catching up on emails. Sometimes a quiet day is exactly what you need.',
    date: '2026-07-23',
    mood: 'Calm',
    duration: '1:55',
  },
]

export const MOCK_SPEAKING_SESSIONS: SpeakingSession[] = [
  {
    id: '1',
    title: 'Product launch pitch',
    transcript: 'Good morning everyone. So, um, today I want to talk about, like, our vision for the next generation of voice technology. You know, we have been working on this for, um, quite some time and I think, basically, the results speak for themselves. Actually, let me show you some examples.',
    date: '2026-07-28',
    duration: '8:15',
    score: 72,
    wpm: 142,
    fillerWords: [
      { word: 'um', count: 4 },
      { word: 'like', count: 3 },
      { word: 'you know', count: 2 },
      { word: 'so', count: 2 },
      { word: 'basically', count: 1 },
      { word: 'actually', count: 1 },
    ],
  },
  {
    id: '2',
    title: 'Investor presentation',
    transcript: 'Thank you for having me. I am, um, excited to share our progress. So basically we have grown, like, significantly this quarter. You know, our users love the product and, um, the metrics show it.',
    date: '2026-07-25',
    duration: '15:30',
    score: 65,
    wpm: 128,
    fillerWords: [
      { word: 'um', count: 5 },
      { word: 'like', count: 4 },
      { word: 'you know', count: 3 },
      { word: 'so', count: 2 },
      { word: 'basically', count: 2 },
    ],
  },
  {
    id: '3',
    title: 'Team retrospective',
    transcript: 'Alright team, let us review the sprint. I think we did well on delivery. The new transcription engine is performing great and the feedback has been positive across the board.',
    date: '2026-07-22',
    duration: '6:45',
    score: 91,
    wpm: 135,
    fillerWords: [
      { word: 'um', count: 1 },
      { word: 'like', count: 1 },
    ],
  },
]

export const MOCK_AUDIO_LIBRARY = [
  { id: '1', title: 'Bohemian Rhapsody', artist: 'Queen', duration: '5:55', date: '2026-07-26' },
  { id: '2', title: 'Hotel California', artist: 'Eagles', duration: '6:30', date: '2026-07-24' },
  { id: '3', title: 'Stairway to Heaven', artist: 'Led Zeppelin', duration: '8:02', date: '2026-07-20' },
  { id: '4', title: 'Imagine', artist: 'John Lennon', duration: '3:07', date: '2026-07-18' },
]

export const FILLER_WORDS = ['um', 'uh', 'like', 'you know', 'so', 'actually', 'basically', 'literally', 'right', 'I mean']

export const SAMPLE_TRANSCRIPT_TEXT =
  'So I had this idea for the podcast intro. Instead of jumping straight into the interview, ' +
  'we open with a quick montage of listener voice messages. Like thirty seconds of real people ' +
  'sharing what the show means to them. Then we fade into the theme music and hit the guest intro. ' +
  'I think it makes the whole thing feel more personal and community driven. We could rotate the ' +
  'clips every few episodes so it stays fresh. Also for the outro maybe we add a teaser clip ' +
  'from next week episode to keep people hooked.'
