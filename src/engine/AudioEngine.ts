type SfxType = 'correct' | 'wrong' | 'levelComplete' | 'click' | 'sceneEnter' | 'hover' | 'heartLoss'

const NOTE: Record<string, number> = {
  C2: 65.41,  Db2: 69.30,  D2: 73.42,  Eb2: 77.78,  E2: 82.41,  F2: 87.31,
  Gb2: 92.50, G2: 98.00,  Ab2: 103.83, A2: 110.00,  Bb2: 116.54, B2: 123.47,
  C3: 130.81, Db3: 138.59, D3: 146.83, Eb3: 155.56, E3: 164.81, F3: 174.61,
  Gb3: 185.00, G3: 196.00, Ab3: 207.65, A3: 220.00, Bb3: 233.08, B3: 246.94,
  C4: 261.63, Db4: 277.18, D4: 293.66, Eb4: 311.13, E4: 329.63, F4: 349.23,
  Gb4: 369.99, G4: 392.00, Ab4: 415.30, A4: 440.00, Bb4: 466.16, B4: 493.88,
  C5: 523.25, Db5: 554.37, D5: 587.33, Eb5: 622.25, E5: 659.25, F5: 698.46,
  Gb5: 739.99, G5: 783.99, Ab5: 830.61, A5: 880.00, Bb5: 932.33, B5: 987.77,
  C6: 1046.50,
}

interface Theme {
  title: string
  bpm: number
  melody: [string | null, number][]
  bass: [string | null, number][]
}

const THEMES: Theme[] = [
  // ─── 1. Für Elise — Beethoven ───────────────────────────────
  {
    title: 'Für Elise — Beethoven',
    bpm: 76,
    melody: [
      ['E5',0.5],['Eb5',0.5],['E5',0.5],['Eb5',0.5],['E5',0.5],['B4',0.5],['D5',0.5],['C5',0.5],
      ['A4',1.0],[null,0.5],['C4',0.5],['E4',0.5],['A4',0.5],
      ['B4',1.0],[null,0.5],['E4',0.5],['Ab4',0.5],['B4',0.5],
      ['C5',3.0],
      ['E5',0.5],['Eb5',0.5],['E5',0.5],['Eb5',0.5],['E5',0.5],['B4',0.5],['D5',0.5],['C5',0.5],
      ['A4',1.0],[null,0.5],['C4',0.5],['E4',0.5],['A4',0.5],
      ['B4',1.0],[null,0.5],['E4',0.5],['Ab4',0.5],['B4',0.5],
      ['A4',3.0],
    ],
    bass: [
      ['A2',3.0],['A2',3.0],['E2',3.0],['A2',3.0],
      ['A2',3.0],['A2',3.0],['E2',3.0],['A2',3.0],
    ],
  },

  // ─── 2. Ode to Joy — Beethoven ──────────────────────────────
  {
    title: 'Ode to Joy — Beethoven',
    bpm: 100,
    melody: [
      ['E4',1.0],['E4',1.0],['F4',1.0],['G4',1.0],
      ['G4',1.0],['F4',1.0],['E4',1.0],['D4',1.0],
      ['C4',1.0],['C4',1.0],['D4',1.0],['E4',1.0],
      ['E4',1.5],['D4',0.5],['D4',2.0],
      ['E4',1.0],['E4',1.0],['F4',1.0],['G4',1.0],
      ['G4',1.0],['F4',1.0],['E4',1.0],['D4',1.0],
      ['C4',1.0],['C4',1.0],['D4',1.0],['E4',1.0],
      ['D4',1.5],['C4',0.5],['C4',2.0],
    ],
    bass: [
      ['C3',4.0],['G2',4.0],['C3',4.0],['G2',4.0],
      ['C3',4.0],['G2',4.0],['C3',4.0],['G2',4.0],
    ],
  },

  // ─── 3. Symphony No.5 — Beethoven ───────────────────────────
  {
    title: 'Symphony No.5 — Beethoven',
    bpm: 108,
    melody: [
      [null,0.5],['G4',0.5],['G4',0.5],['G4',0.5],['Eb4',2.0],[null,0.5],
      [null,0.5],['F4',0.5],['F4',0.5],['F4',0.5],['D4',2.0],[null,0.5],
      [null,0.5],['F4',0.5],['F4',0.5],['F4',0.5],['Eb4',1.5],['E4',0.25],['F4',0.25],
      ['F4',0.5],['F4',0.5],['F4',0.5],['D4',2.5],
      [null,0.5],['G4',0.5],['G4',0.5],['G4',0.5],['Eb4',2.0],[null,0.5],
      [null,0.5],['Ab4',0.5],['Ab4',0.5],['Ab4',0.5],['G4',3.0],
    ],
    bass: [
      ['C3',3.0],['Bb2',3.0],['C3',3.5],['C3',2.5],['C3',3.0],['G2',4.0],
    ],
  },

  // ─── 4. Canon in D — Pachelbel ──────────────────────────────
  {
    title: 'Canon in D — Pachelbel',
    bpm: 80,
    melody: [
      ['F#5',1.0],['E5',1.0],['D5',1.0],['C#5',1.0],
      ['B4',1.0],['A4',1.0],['B4',1.0],['C#5',1.0],
      ['D5',0.5],['E5',0.5],['F#5',0.5],['G5',0.5],['F#5',0.5],['E5',0.5],['D5',0.5],['C#5',0.5],
      ['B4',0.5],['C#5',0.5],['D5',0.5],['E5',0.5],['F#5',0.5],['G5',0.5],['A5',0.5],['B5',0.5],
      ['B5',1.0],['A5',1.0],['G5',1.0],['F#5',1.0],
      ['G5',0.5],['F#5',0.5],['E5',1.0],['D5',1.0],['C#5',1.0],
      ['D5',2.0],['E5',1.0],['F#5',1.0],
      ['D5',4.0],
    ],
    bass: [
      ['D2',1.0],['A2',1.0],['B2',1.0],['Gb2',1.0],
      ['G2',1.0],['D2',1.0],['G2',1.0],['A2',1.0],
      ['D2',1.0],['A2',1.0],['B2',1.0],['Gb2',1.0],
      ['G2',1.0],['D2',1.0],['G2',1.0],['A2',1.0],
      ['D2',1.0],['A2',1.0],['B2',1.0],['Gb2',1.0],
      ['G2',1.0],['D2',1.0],['G2',1.0],['A2',1.0],
      ['D2',2.0],['A2',2.0],
      ['D2',4.0],
    ],
  },

  // ─── 5. Air on G String — Bach ──────────────────────────────
  {
    title: 'Air on G String — Bach',
    bpm: 52,
    melody: [
      ['D5',1.5],['C#5',0.5],['B4',1.0],['A4',1.0],
      ['A4',0.5],['B4',0.5],['C#5',0.5],['D5',0.5],['E5',0.5],['F#5',0.5],['G5',0.5],['A5',0.5],
      ['G5',1.5],['F#5',0.5],['E5',1.0],['D5',1.0],
      ['C#5',2.0],['B4',2.0],
      ['D5',1.5],['C#5',0.5],['B4',1.0],['A4',1.0],
      ['D5',0.5],['E5',0.5],['F#5',0.5],['G5',0.5],['A5',0.5],['G5',0.5],['F#5',0.5],['E5',0.5],
      ['D5',2.0],['E5',1.0],['F#5',1.0],
      ['D5',4.0],
    ],
    bass: [
      ['D2',4.0],['G2',4.0],['E2',4.0],['A2',4.0],
      ['D2',4.0],['G2',4.0],['A2',2.0],['D3',2.0],['D2',4.0],
    ],
  },

  // ─── 6. Minuet in G — Bach/Petzold ─────────────────────────
  {
    title: 'Minuet in G — Bach',
    bpm: 92,
    melody: [
      ['G4',1.0],['C5',0.5],['D5',0.5],['E5',0.5],['D5',0.5],
      ['C5',1.0],['E5',0.5],['D5',0.5],['C5',0.5],['B4',0.5],
      ['A4',0.5],['A4',0.5],['B4',0.5],['C5',0.5],['D5',0.5],['E5',0.5],
      ['G4',3.0],
      ['G4',1.0],['C5',0.5],['D5',0.5],['E5',0.5],['D5',0.5],
      ['C5',1.0],['E5',0.5],['D5',0.5],['C5',0.5],['B4',0.5],
      ['A4',0.5],['D5',0.5],['D5',0.5],['D5',0.5],['G5',0.5],['D5',0.5],
      ['G4',3.0],
    ],
    bass: [
      ['G2',3.0],['C3',3.0],['G2',3.0],['G2',3.0],
      ['G2',3.0],['C3',3.0],['G2',3.0],['G2',3.0],
    ],
  },

  // ─── 7. Prelude in C — Bach ─────────────────────────────────
  {
    title: 'Prelude in C — Bach',
    bpm: 72,
    melody: [
      ['C4',0.5],['E4',0.5],['G4',0.5],['C5',0.5],['E5',0.5],['C5',0.5],['G4',0.5],['E4',0.5],
      ['C4',0.5],['D4',0.5],['G4',0.5],['D5',0.5],['F5',0.5],['D5',0.5],['G4',0.5],['D4',0.5],
      ['B3',0.5],['D4',0.5],['G4',0.5],['D5',0.5],['F5',0.5],['D5',0.5],['G4',0.5],['D4',0.5],
      ['C4',0.5],['E4',0.5],['G4',0.5],['C5',0.5],['E5',0.5],['C5',0.5],['G4',0.5],['E4',0.5],
      ['A3',0.5],['E4',0.5],['A4',0.5],['E5',0.5],['G5',0.5],['E5',0.5],['A4',0.5],['E4',0.5],
      ['D4',0.5],['Gb4',0.5],['A4',0.5],['C5',0.5],['F5',0.5],['C5',0.5],['A4',0.5],['Gb4',0.5],
      ['G3',0.5],['D4',0.5],['G4',0.5],['B4',0.5],['D5',0.5],['B4',0.5],['G4',0.5],['D4',0.5],
      ['C4',0.5],['E4',0.5],['G4',0.5],['C5',0.5],['E5',0.5],['C5',0.5],['G4',0.5],['E4',0.5],
    ],
    bass: [
      ['C3',4.0],['C3',4.0],['B2',4.0],['C3',4.0],
      ['A2',4.0],['D3',4.0],['G2',4.0],['C3',4.0],
    ],
  },

  // ─── 8. Eine Kleine Nachtmusik — Mozart ─────────────────────
  {
    title: 'Eine Kleine Nachtmusik — Mozart',
    bpm: 120,
    melody: [
      ['G4',0.5],['G4',0.25],['G4',0.25],['D5',0.5],['E5',0.25],['D5',0.75],
      ['C5',0.5],['C5',0.25],['C5',0.25],['G4',0.5],['A4',0.25],['G4',0.75],
      ['D4',0.25],['D4',0.25],['E4',0.25],['D4',0.25],['C4',0.25],['B3',0.25],['D4',0.5],['G4',0.5],
      ['G4',4.0],
      ['B4',0.5],['C5',0.5],['D5',0.5],['E5',0.5],['G5',0.5],['F#5',0.5],['E5',0.5],['D5',0.5],
      ['C5',0.5],['B4',0.5],['A4',0.5],['G4',0.5],['F#4',0.5],['E4',0.5],['D4',1.0],
      ['D4',0.5],['E4',0.5],['F#4',0.5],['G4',0.5],['A4',0.5],['B4',0.5],['C5',0.5],['D5',0.5],
      ['G4',4.0],
    ],
    bass: [
      ['G2',4.0],['C3',4.0],['G2',4.0],['G2',4.0],
      ['G2',4.0],['C3',4.0],['D2',4.0],['G2',4.0],
    ],
  },

  // ─── 9. Symphony No.40 — Mozart ─────────────────────────────
  {
    title: 'Symphony No.40 — Mozart',
    bpm: 120,
    melody: [
      ['G4',0.5],['G4',0.5],['G4',0.5],
      ['Bb4',1.5],['A4',0.5],['G4',1.0],
      ['Bb4',1.5],['A4',0.5],['G4',1.0],
      ['Eb5',1.5],['D5',0.5],['C5',1.0],
      ['Eb5',1.5],['D5',0.5],['C5',1.0],
      ['D5',1.5],['C5',0.5],['Bb4',0.5],['A4',0.5],
      ['G4',3.0],
      ['G4',0.5],['G4',0.5],['G4',0.5],
      ['Bb4',1.5],['A4',0.5],['G4',1.0],
      ['Eb5',1.5],['D5',0.5],['C5',1.0],
      ['D5',3.0],
      ['G4',3.0],
    ],
    bass: [
      ['G3',3.0],['G3',3.0],['C3',3.0],['C3',3.0],
      ['D3',3.0],['G3',3.0],['G3',3.0],['G3',3.0],
      ['G3',3.0],['C3',3.0],['D3',3.0],['G3',3.0],
    ],
  },

  // ─── 10. Turkish March — Mozart ─────────────────────────────
  {
    title: 'Turkish March — Mozart',
    bpm: 116,
    melody: [
      ['A4',0.5],['A4',0.5],['A4',0.5],['E4',0.5],
      ['F#4',0.5],['F#4',0.5],['F#4',0.5],['C#4',0.5],
      ['D4',0.5],['D4',0.5],['D4',0.5],['B3',0.5],
      ['C#4',0.5],['E4',0.5],['A4',1.0],
      ['A4',0.5],['A4',0.5],['A4',0.5],['E4',0.5],
      ['F#4',0.5],['F#4',0.5],['F#4',0.5],['C#4',0.5],
      ['D4',0.5],['E4',0.5],['F#4',0.5],['G#4',0.5],
      ['A4',2.0],
      ['E5',0.5],['D#5',0.5],['E5',0.5],['D#5',0.5],['E5',0.5],['B4',0.5],['D5',0.5],['C5',0.5],
      ['A4',2.0],['C4',0.5],['E4',0.5],
      ['A4',0.5],['B4',0.5],['C5',0.5],['D5',0.5],['E5',0.5],['D5',0.5],
      ['A4',4.0],
    ],
    bass: [
      ['A2',2.0],['A2',2.0],['A2',2.0],['A2',2.0],
      ['A2',2.0],['A2',2.0],['A2',2.0],['A2',2.0],
      ['A2',2.0],['A2',2.0],['A2',2.0],['A2',2.0],
    ],
  },

  // ─── 11. Nocturne Op.9 No.2 — Chopin ────────────────────────
  {
    title: 'Nocturne Op.9 No.2 — Chopin',
    bpm: 56,
    melody: [
      ['Bb4',2.0],['C5',0.5],['Bb4',0.5],['Ab4',1.0],
      ['Gb5',2.0],['Gb5',0.5],['F5',0.5],['Eb5',1.0],
      ['Eb5',1.0],['Db5',0.5],['C5',0.5],['Bb4',2.0],
      ['Bb4',2.0],['C5',0.5],['Bb4',0.5],['Ab4',1.0],
      ['Gb4',2.0],['Ab4',0.5],['Bb4',0.5],['Eb5',1.0],
      ['Db5',1.5],['C5',0.5],['Bb4',2.0],
      ['Bb4',4.0],
    ],
    bass: [
      ['Eb2',4.0],['Bb2',4.0],['Eb2',4.0],['Bb2',4.0],
      ['Ab2',4.0],['Eb2',4.0],['Bb2',4.0],
    ],
  },

  // ─── 12. Prelude Op.28 No.4 — Chopin ────────────────────────
  {
    title: 'Prelude in E minor — Chopin',
    bpm: 60,
    melody: [
      ['B4',2.0],['B4',2.0],
      ['B4',1.5],['Bb4',0.5],['A4',1.0],['Ab4',1.0],
      ['G4',2.0],['F#4',2.0],
      ['F4',2.0],['E4',2.0],
      ['B4',2.0],['B4',2.0],
      ['B4',1.5],['Bb4',0.5],['A4',1.0],['Ab4',1.0],
      ['G4',2.0],['E4',2.0],
      ['E4',4.0],
    ],
    bass: [
      ['E3',4.0],['Eb3',4.0],['D3',4.0],['C3',4.0],
      ['E3',4.0],['Eb3',4.0],['D3',4.0],['E3',4.0],
    ],
  },

  // ─── 13. Waltz in A minor — Chopin ──────────────────────────
  {
    title: 'Waltz in A minor — Chopin',
    bpm: 80,
    melody: [
      ['A4',1.0],['B4',1.0],['C5',1.0],
      ['A4',3.0],
      ['E5',1.0],['D5',1.0],['C5',1.0],
      ['B4',3.0],
      ['A4',1.0],['D5',1.0],['E5',1.0],
      ['A5',3.0],
      ['F5',1.0],['E5',1.0],['D5',1.0],
      ['C#5',3.0],
      ['A4',1.0],['B4',1.0],['C5',1.0],
      ['A4',3.0],
      ['E5',1.0],['D5',1.0],['C5',1.0],
      ['A4',3.0],
    ],
    bass: [
      ['A2',3.0],['E3',3.0],['A2',3.0],['E3',3.0],
      ['A2',3.0],['D3',3.0],['E3',3.0],['A2',3.0],
      ['A2',3.0],['E3',3.0],['A2',3.0],['E3',3.0],
    ],
  },

  // ─── 14. Swan Lake Theme — Tchaikovsky ──────────────────────
  {
    title: 'Swan Lake — Tchaikovsky',
    bpm: 80,
    melody: [
      ['B4',0.5],['E5',0.5],['D5',0.5],['C#5',0.5],
      ['B4',1.0],['D5',0.5],['C#5',0.5],
      ['B4',0.5],['E5',0.5],['G5',0.5],['F#5',0.5],
      ['E5',2.0],
      ['G5',0.5],['F#5',0.5],['E5',0.5],['D5',0.5],
      ['C#5',1.0],['E5',0.5],['D5',0.5],
      ['C#5',0.5],['B4',0.5],['A4',0.5],['B4',0.5],
      ['E4',2.0],
      ['B4',0.5],['E5',0.5],['D5',0.5],['C#5',0.5],
      ['B4',1.0],['A4',0.5],['B4',0.5],
      ['G#4',0.5],['B4',0.5],['E5',0.5],['D5',0.5],
      ['C#5',2.0],
      ['E5',0.5],['F#5',0.5],['G#5',0.5],['A5',0.5],
      ['B5',4.0],
    ],
    bass: [
      ['B2',2.0],['E3',2.0],['B2',2.0],['E3',2.0],
      ['B2',2.0],['E3',2.0],['B2',4.0],
      ['B2',2.0],['E3',2.0],['B2',2.0],
      ['E3',2.0],['B2',4.0],
    ],
  },

  // ─── 15. Piano Concerto No.1 — Tchaikovsky ──────────────────
  {
    title: 'Piano Concerto No.1 — Tchaikovsky',
    bpm: 52,
    melody: [
      ['Ab4',2.0],['Bb4',0.5],['Ab4',0.5],['Gb4',1.0],
      ['Eb4',2.0],['Db4',2.0],
      ['Db5',2.0],['Eb5',0.5],['Db5',0.5],['Bb4',1.0],
      ['Ab4',4.0],
      ['Gb4',2.0],['Ab4',0.5],['Gb4',0.5],['Eb4',1.0],
      ['Db4',2.0],['Bb3',2.0],
      ['Ab4',2.0],['Gb4',1.0],['Eb4',1.0],
      ['Db4',4.0],
    ],
    bass: [
      ['Db2',4.0],['Ab2',4.0],['Db2',4.0],['Ab2',4.0],
      ['Db2',4.0],['Ab2',4.0],['Db2',4.0],['Db2',4.0],
    ],
  },

  // ─── 16. Sleeping Beauty Waltz — Tchaikovsky ────────────────
  {
    title: 'Sleeping Beauty Waltz — Tchaikovsky',
    bpm: 66,
    melody: [
      ['D4',1.0],['F#4',1.0],['A4',1.0],
      ['D5',3.0],
      ['C#5',1.0],['E4',1.0],['A4',1.0],
      ['A4',3.0],
      ['B4',1.0],['D4',1.0],['G4',1.0],
      ['G4',3.0],
      ['F#4',1.0],['A4',1.0],['D5',1.0],
      ['D5',3.0],
      ['E5',1.0],['F#5',1.0],['E5',1.0],
      ['D5',1.5],['C#5',0.5],['B4',1.0],
      ['A4',1.0],['G4',1.0],['F#4',1.0],
      ['D4',3.0],
    ],
    bass: [
      ['D2',3.0],['A2',3.0],['G2',3.0],['D2',3.0],
      ['D2',3.0],['A2',3.0],['D2',3.0],['D2',3.0],
      ['D2',3.0],['D2',3.0],['A2',3.0],['D2',3.0],
    ],
  },

  // ─── 17. Romeo and Juliet — Tchaikovsky ─────────────────────
  {
    title: 'Romeo and Juliet — Tchaikovsky',
    bpm: 72,
    melody: [
      ['B4',2.0],['A4',2.0],
      ['G4',2.0],['F#4',2.0],
      ['B4',2.0],['A4',1.0],['G4',1.0],
      ['F#4',4.0],
      ['D5',2.0],['C#5',2.0],
      ['B4',2.0],['A4',2.0],
      ['D5',2.0],['C#5',1.0],['B4',1.0],
      ['A4',4.0],
      ['F#5',2.0],['E5',1.0],['D5',1.0],
      ['C#5',2.0],['B4',2.0],
      ['A4',2.0],['G4',1.0],['F#4',1.0],
      ['B4',4.0],
    ],
    bass: [
      ['B2',4.0],['G2',4.0],['B2',4.0],['F#2',4.0],
      ['B2',4.0],['G2',4.0],['B2',4.0],['A2',4.0],
      ['B2',4.0],['E3',4.0],['A2',4.0],['B2',4.0],
    ],
  },

  // ─── 18. Piano Concerto No.2 — Rachmaninoff ─────────────────
  {
    title: 'Piano Concerto No.2 — Rachmaninoff',
    bpm: 66,
    melody: [
      ['Eb4',2.0],['F4',1.0],['G4',1.0],
      ['Ab4',2.0],['G4',1.0],['F4',1.0],
      ['Eb4',3.0],['D4',1.0],
      ['C4',4.0],
      ['Eb4',2.0],['F4',1.0],['G4',1.0],
      ['Ab4',2.0],['Bb4',1.0],['C5',1.0],
      ['Db5',2.0],['C5',1.0],['Bb4',1.0],
      ['Ab4',4.0],
      ['G4',2.0],['Ab4',1.0],['Bb4',1.0],
      ['C5',2.0],['Db5',1.0],['Eb5',1.0],
      ['F5',2.0],['Eb5',1.0],['Db5',1.0],
      ['C5',4.0],
    ],
    bass: [
      ['C3',4.0],['C3',4.0],['C3',4.0],['C3',4.0],
      ['C3',4.0],['C3',4.0],['Ab2',4.0],['C3',4.0],
      ['G2',4.0],['Ab2',4.0],['C3',4.0],['C3',4.0],
    ],
  },

  // ─── 19. Rhapsody Var.18 — Rachmaninoff ─────────────────────
  {
    title: 'Rhapsody Var.18 — Rachmaninoff',
    bpm: 69,
    melody: [
      ['Ab4',1.5],['Bb4',0.5],['Ab4',1.0],['Gb4',1.0],
      ['Eb4',4.0],
      ['Db5',1.5],['Eb5',0.5],['Db5',1.0],['Bb4',1.0],
      ['Ab4',4.0],
      ['Gb5',1.5],['Ab5',0.5],['Gb5',1.0],['Eb5',1.0],
      ['Db5',1.5],['Eb5',0.5],['Db5',1.0],['Bb4',1.0],
      ['Ab4',2.0],['Gb4',1.0],['Eb4',1.0],
      ['Db4',4.0],
    ],
    bass: [
      ['Db2',4.0],['Ab2',4.0],['Db2',4.0],['Ab2',4.0],
      ['Db2',4.0],['Ab2',4.0],['Db2',4.0],['Db2',4.0],
    ],
  },

  // ─── 20. Vocalise — Rachmaninoff ────────────────────────────
  {
    title: 'Vocalise — Rachmaninoff',
    bpm: 56,
    melody: [
      ['E4',2.0],['F#4',1.0],['G4',1.0],
      ['A4',2.0],['B4',1.0],['C5',1.0],
      ['B4',2.0],['A4',1.0],['G4',1.0],
      ['F#4',4.0],
      ['E4',2.0],['F#4',0.5],['G4',0.5],['A4',0.5],['B4',0.5],
      ['C5',1.0],['D5',1.0],['B4',2.0],
      ['A4',2.0],['G4',1.0],['F#4',1.0],
      ['E4',4.0],
      ['G4',1.5],['A4',0.5],['B4',1.0],['A4',1.0],
      ['G4',2.0],['F#4',2.0],
      ['E4',1.5],['F#4',0.5],['G4',1.0],['A4',1.0],
      ['E4',4.0],
    ],
    bass: [
      ['E2',4.0],['A2',4.0],['E2',4.0],['B2',4.0],
      ['E2',4.0],['A2',4.0],['B2',4.0],['E2',4.0],
      ['C3',4.0],['B2',4.0],['A2',4.0],['E2',4.0],
    ],
  },

  // ─── 21. Gymnopédie No.1 — Satie ────────────────────────────
  {
    title: 'Gymnopédie No.1 — Satie',
    bpm: 52,
    melody: [
      [null,3.0],
      ['E5',1.5],['D5',0.5],['B4',1.0],
      ['A4',1.0],['G4',1.0],['A4',1.0],
      ['B4',3.0],
      [null,1.0],['E5',1.0],['D5',1.0],
      ['C5',1.5],['B4',0.5],['G4',1.0],
      ['A4',3.0],
      [null,1.0],['E5',1.0],['D5',1.0],
      ['C5',1.5],['B4',0.5],['A4',1.0],
      ['G4',3.0],
      ['B4',1.5],['A4',0.5],['G4',1.0],
      ['F#4',3.0],
      ['G4',1.5],['A4',0.5],['B4',1.0],
      ['G4',3.0],
    ],
    bass: [
      ['G2',3.0],['D3',3.0],['G2',3.0],['D3',3.0],
      ['G2',3.0],['D3',3.0],['G2',3.0],['D3',3.0],
      ['G2',3.0],['D3',3.0],['G2',3.0],['D3',3.0],
      ['G2',3.0],['D3',3.0],
    ],
  },

  // ─── 22. Clair de Lune — Debussy ────────────────────────────
  {
    title: 'Clair de Lune — Debussy',
    bpm: 54,
    melody: [
      ['Ab4',2.0],['Gb4',1.0],['Eb4',1.0],
      ['Db4',2.0],['Eb4',1.0],['Gb4',1.0],
      ['Ab4',2.0],['Gb4',1.0],['Eb4',1.0],
      ['Db4',4.0],
      ['Db5',2.0],['C5',1.0],['Bb4',1.0],
      ['Ab4',2.0],['Gb4',1.0],['Eb4',1.0],
      ['Db4',2.0],['Eb4',1.0],['Gb4',1.0],
      ['Ab4',4.0],
      ['Eb5',2.0],['Db5',1.0],['Bb4',1.0],
      ['Ab4',2.0],['Gb4',1.0],['Eb4',1.0],
      ['Ab4',2.0],['Bb4',1.0],['Db5',1.0],
      ['Ab4',4.0],
    ],
    bass: [
      ['Db2',4.0],['Ab2',4.0],['Db2',4.0],['Db2',4.0],
      ['Gb2',4.0],['Db2',4.0],['Ab2',4.0],['Db2',4.0],
      ['Eb2',4.0],['Db2',4.0],['Ab2',4.0],['Db2',4.0],
    ],
  },

  // ─── 23. Spring (Four Seasons) — Vivaldi ────────────────────
  {
    title: 'Spring — Vivaldi',
    bpm: 120,
    melody: [
      ['E5',0.5],['E5',0.5],['E5',0.5],['F#5',0.5],
      ['E5',1.0],['C#5',0.5],['B4',0.5],
      ['A4',1.0],['B4',0.5],['C#5',0.5],
      ['E5',2.0],
      ['B4',0.5],['C#5',0.5],['D#5',0.5],['E5',0.5],
      ['E5',1.0],['D#5',0.5],['E5',0.5],
      ['F#5',1.0],['E5',0.5],['D#5',0.5],
      ['E5',2.0],
      ['E5',0.5],['E5',0.5],['E5',0.5],['F#5',0.5],
      ['E5',1.0],['C#5',0.5],['B4',0.5],
      ['A4',0.5],['B4',0.5],['C#5',0.5],['D#5',0.5],
      ['E5',4.0],
    ],
    bass: [
      ['E2',2.0],['A2',2.0],['E2',2.0],['B2',2.0],
      ['E2',2.0],['A2',2.0],['E2',2.0],['B2',2.0],
      ['E2',2.0],['A2',2.0],['E2',2.0],['E2',4.0],
    ],
  },

  // ─── 24. Winter Presto — Vivaldi ────────────────────────────
  {
    title: 'Winter — Vivaldi',
    bpm: 116,
    melody: [
      ['F4',0.25],['F4',0.25],['F4',0.25],['F4',0.25],['F4',0.25],['F4',0.25],['Eb4',0.25],['Eb4',0.25],
      ['Eb4',0.25],['Eb4',0.25],['Eb4',0.25],['Eb4',0.25],['D4',0.25],['D4',0.25],['D4',0.25],['D4',0.25],
      ['F4',0.5],['Eb4',0.5],['D4',0.5],['C4',0.5],
      ['Bb3',0.5],['C4',0.5],['D4',0.5],['Eb4',0.5],
      ['F4',0.25],['F4',0.25],['F4',0.25],['F4',0.25],['G4',0.5],['F4',0.5],
      ['Eb4',0.25],['Eb4',0.25],['Eb4',0.25],['Eb4',0.25],['F4',0.5],['Eb4',0.5],
      ['D4',0.5],['Eb4',0.5],['F4',0.5],['G4',0.5],
      ['F4',4.0],
    ],
    bass: [
      ['F2',2.0],['C3',2.0],['F2',2.0],['Bb2',2.0],
      ['F2',2.0],['C3',2.0],['F2',2.0],['C3',2.0],
      ['F2',2.0],['Bb2',2.0],['C3',2.0],['F2',4.0],
    ],
  },

  // ─── 25. New World Symphony Largo — Dvořák ──────────────────
  {
    title: 'New World — Dvořák',
    bpm: 52,
    melody: [
      [null,2.0],['Gb4',2.0],
      ['Eb4',2.0],['Gb4',1.0],['Ab4',1.0],
      ['Bb4',4.0],
      ['Ab4',1.5],['Gb4',0.5],['Eb4',2.0],
      ['Gb4',4.0],
      [null,2.0],['Gb4',2.0],
      ['Eb4',1.5],['Db4',0.5],['Bb3',2.0],
      ['Db4',2.0],['Gb4',1.0],['Bb4',1.0],
      ['Ab4',2.0],['Gb4',2.0],
      ['Eb4',4.0],
    ],
    bass: [
      ['Db2',4.0],['Gb2',4.0],['Db2',4.0],['Gb2',4.0],
      ['Db2',4.0],['Gb2',4.0],['Db2',4.0],['Ab2',4.0],
      ['Db2',4.0],['Gb2',4.0],['Db2',4.0],
    ],
  },

  // ─── 26. Hungarian Dance No.5 — Brahms ──────────────────────
  {
    title: 'Hungarian Dance No.5 — Brahms',
    bpm: 116,
    melody: [
      ['G4',0.5],['A4',0.5],['G4',0.5],['F#4',0.5],
      ['G4',1.5],['G4',0.5],['D5',0.5],['C5',0.5],
      ['Bb4',0.5],['D5',0.5],['Bb4',0.5],['A4',0.5],
      ['G4',2.0],
      ['G4',0.5],['A4',0.5],['G4',0.5],['F#4',0.5],
      ['G4',1.5],['G4',0.5],['D5',0.5],['C5',0.5],
      ['Bb4',0.5],['C5',0.5],['D5',0.5],['Eb5',0.5],
      ['G5',2.0],
      ['D5',0.5],['Eb5',0.5],['D5',0.5],['C5',0.5],
      ['D5',1.5],['D5',0.5],['Bb4',0.5],['A4',0.5],
      ['G4',0.5],['A4',0.5],['Bb4',0.5],['C5',0.5],
      ['G4',4.0],
    ],
    bass: [
      ['G2',2.0],['D3',2.0],['G2',2.0],['D3',2.0],
      ['G2',2.0],['D3',2.0],['G2',2.0],['D3',2.0],
      ['G2',2.0],['D3',2.0],['G2',2.0],['D3',2.0],
    ],
  },

  // ─── 27. In the Hall of the Mountain King — Grieg ───────────
  {
    title: 'Hall of the Mountain King — Grieg',
    bpm: 72,
    melody: [
      ['B3',1.0],['C4',1.0],['D4',1.0],['Eb4',1.0],
      ['E4',1.0],['B3',1.0],['D4',1.0],['C4',1.0],
      ['B3',1.0],['Bb3',1.0],['A3',1.0],['Ab3',1.0],
      ['G3',1.0],['F#3',1.0],['G3',1.0],['G3',1.0],
      ['B3',1.0],['C4',1.0],['D4',1.0],['Eb4',1.0],
      ['E4',1.0],['B3',1.0],['D4',1.0],['C4',1.0],
      ['G3',1.0],['Ab3',1.0],['G3',1.0],['E3',1.0],
      ['G3',4.0],
    ],
    bass: [
      ['G2',4.0],['G2',4.0],['G2',4.0],['G2',4.0],
      ['G2',4.0],['G2',4.0],['G2',4.0],['G2',4.0],
    ],
  },

  // ─── 28. Morning Mood — Grieg ───────────────────────────────
  {
    title: 'Morning Mood — Grieg',
    bpm: 56,
    melody: [
      ['E5',0.5],['F#5',0.5],['A5',1.0],['B5',0.5],['A5',0.5],
      ['F#5',0.5],['E5',0.5],['F#5',0.5],['A5',1.5],
      ['E5',0.5],['F#5',0.5],['A5',1.0],['B5',0.5],['A5',0.5],
      ['F#5',1.0],['E5',1.0],['D#5',1.0],[null,1.0],
      ['C#5',0.5],['D#5',0.5],['E5',1.0],['D#5',0.5],['C#5',0.5],
      ['A4',0.5],['C#5',0.5],['E5',0.5],['A5',1.5],
      ['G#5',0.5],['A5',0.5],['B5',0.5],['A5',0.5],['G#5',0.5],['F#5',0.5],
      ['E5',4.0],
    ],
    bass: [
      ['E2',4.0],['A2',4.0],['E2',4.0],['B2',4.0],
      ['A2',4.0],['E2',4.0],['B2',4.0],['E2',4.0],
    ],
  },

  // ─── 29. Hallelujah Chorus — Handel ─────────────────────────
  {
    title: 'Hallelujah — Handel',
    bpm: 80,
    melody: [
      [null,0.5],['D4',0.5],['D4',0.5],['D4',0.5],
      ['G4',1.5],['F#4',0.5],['G4',0.5],['A4',0.5],
      ['D4',0.5],['D4',0.5],['E4',0.5],['F#4',0.5],
      ['G4',2.0],['G4',0.5],['G4',0.5],
      ['G4',0.5],['F#4',0.5],['G4',0.5],['A4',0.5],
      ['G4',1.0],['G4',0.5],['F#4',0.5],['G4',0.5],['A4',0.5],
      ['B4',1.0],['A4',0.5],['B4',0.5],['C5',0.5],['B4',0.5],
      ['A4',2.0],[null,0.5],['D4',0.5],
      ['D5',0.5],['C#5',0.5],['D5',0.5],['A4',0.5],
      ['D5',1.5],['C#5',0.5],['D5',0.5],['E5',0.5],
      ['D5',2.0],['A4',0.5],['A4',0.5],
      ['D5',4.0],
    ],
    bass: [
      ['D3',2.0],['G2',2.0],['D3',2.0],['G2',2.0],
      ['G2',2.0],['D3',2.0],['A2',2.0],['D3',2.0],
      ['D3',2.0],['A2',2.0],['D3',2.0],['D3',4.0],
    ],
  },

  // ─── 30. Ave Maria — Schubert ───────────────────────────────
  {
    title: 'Ave Maria — Schubert',
    bpm: 60,
    melody: [
      [null,3.0],
      ['F4',2.0],['G4',1.0],
      ['Ab4',2.0],['G4',0.5],['F4',0.5],
      ['Bb4',3.0],
      ['Ab4',1.5],['G4',0.5],['Ab4',1.0],
      ['C5',3.0],
      ['Bb4',2.0],['Ab4',1.0],
      ['G4',3.0],
      ['Ab4',2.0],['Bb4',1.0],
      ['C5',2.0],['Db5',0.5],['C5',0.5],
      ['Bb4',2.0],['G4',1.0],
      ['F4',3.0],
    ],
    bass: [
      ['F2',3.0],['Bb2',3.0],['F2',3.0],['Bb2',3.0],
      ['Eb2',3.0],['F2',3.0],['Bb2',3.0],['F2',3.0],
      ['Bb2',3.0],['Eb2',3.0],['F2',3.0],['Bb2',3.0],
    ],
  },

  // ─── 31. The Swan — Saint-Saëns ─────────────────────────────
  {
    title: 'The Swan — Saint-Saëns',
    bpm: 56,
    melody: [
      [null,2.0],['G4',2.0],
      ['A4',1.5],['B4',0.5],['C5',2.0],
      ['B4',1.5],['A4',0.5],['G4',2.0],
      ['E4',4.0],
      [null,2.0],['G4',2.0],
      ['A4',1.5],['B4',0.5],['D5',2.0],
      ['C5',1.5],['B4',0.5],['A4',1.0],['G4',1.0],
      ['G4',4.0],
      ['G5',1.5],['F#5',0.5],['E5',1.0],['D5',1.0],
      ['C5',1.5],['B4',0.5],['A4',2.0],
      ['G4',2.0],['A4',1.0],['B4',1.0],
      ['G4',4.0],
    ],
    bass: [
      ['G2',4.0],['C3',4.0],['G2',4.0],['E2',4.0],
      ['G2',4.0],['C3',4.0],['D3',4.0],['G2',4.0],
      ['G2',4.0],['C3',4.0],['D3',4.0],['G2',4.0],
    ],
  },

  // ─── 32. Blue Danube Waltz — Strauss ────────────────────────
  {
    title: 'Blue Danube — Strauss',
    bpm: 60,
    melody: [
      [null,3.0],
      ['A4',0.5],['A4',0.5],['A4',0.5],
      ['A4',1.0],['G4',0.5],['A4',0.5],
      ['B4',1.0],['A4',0.5],['G4',0.5],
      ['A4',3.0],
      ['A4',0.5],['A4',0.5],['A4',0.5],
      ['A4',1.0],['G4',0.5],['A4',0.5],
      ['B4',1.0],['A4',0.5],['G4',0.5],
      ['A4',3.0],
      ['D5',0.5],['D5',0.5],['D5',0.5],
      ['D5',1.0],['C5',0.5],['D5',0.5],
      ['E5',1.0],['D5',0.5],['C5',0.5],
      ['D5',3.0],
      ['A4',1.5],['B4',0.5],['C5',1.0],
      ['A4',1.5],['G4',0.5],['F#4',1.0],
      ['G4',1.5],['A4',0.5],['D5',1.0],
      ['D5',3.0],
    ],
    bass: [
      ['D2',3.0],['D2',3.0],['A2',3.0],['D2',3.0],
      ['D2',3.0],['A2',3.0],['D2',3.0],['D2',3.0],
      ['G2',3.0],['D2',3.0],['A2',3.0],['D2',3.0],
      ['D2',3.0],['A2',3.0],['D2',3.0],['D2',3.0],
    ],
  },
]

class AudioEngine {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private activeNodes: AudioNode[] = []
  private loopTimeout: ReturnType<typeof setTimeout> | null = null
  private _muted = false
  private _volume = 0.22
  private initialized = false
  private bgmPlaying = false
  private playlistOrder: number[] = []
  private playlistIndex = 0

  private getCtx(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext()
      this.masterGain = this.ctx.createGain()
      this.masterGain.gain.value = this._muted ? 0 : this._volume
      this.masterGain.connect(this.ctx.destination)
      this.initialized = true
    }
    return this.ctx
  }

  private getMaster(): GainNode {
    this.getCtx()
    return this.masterGain!
  }

  private shufflePlaylist() {
    this.playlistOrder = Array.from({ length: THEMES.length }, (_, i) => i)
    for (let i = this.playlistOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.playlistOrder[i], this.playlistOrder[j]] = [this.playlistOrder[j], this.playlistOrder[i]]
    }
    this.playlistIndex = 0
  }

  startBgm() {
    if (this.bgmPlaying) return
    this.bgmPlaying = true
    const ctx = this.getCtx()
    if (ctx.state === 'suspended') ctx.resume()
    this.shufflePlaylist()
    this.playNextTheme()
  }

  private playNextTheme() {
    if (!this.bgmPlaying) return
    if (this._muted) {
      this.loopTimeout = setTimeout(() => this.playNextTheme(), 5000)
      return
    }
    const theme = THEMES[this.playlistOrder[this.playlistIndex]]
    this.playlistIndex++
    if (this.playlistIndex >= THEMES.length) this.shufflePlaylist()
    const durationMs = this.scheduleTheme(theme)
    this.loopTimeout = setTimeout(() => this.playNextTheme(), durationMs - 80)
  }

  private scheduleTheme(theme: Theme): number {
    const ctx = this.getCtx()
    if (ctx.state === 'suspended') ctx.resume()
    const master = this.getMaster()
    const BEAT = 60 / theme.bpm
    const startTime = ctx.currentTime + 0.05

    // Clear old nodes
    for (const node of this.activeNodes) {
      try { (node as OscillatorNode).stop?.() } catch { /* already stopped */ }
    }
    this.activeNodes = []

    // Melody — triangle wave, soft attack/release
    let t = startTime
    for (const [note, dur] of theme.melody) {
      const noteLen = dur * BEAT
      if (note && NOTE[note]) {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.value = NOTE[note]
        const attack = Math.min(0.02, noteLen * 0.1)
        const release = Math.min(0.06, noteLen * 0.2)
        gain.gain.setValueAtTime(0, t)
        gain.gain.linearRampToValueAtTime(0.12, t + attack)
        gain.gain.setValueAtTime(0.12, t + noteLen - release)
        gain.gain.linearRampToValueAtTime(0, t + noteLen)
        osc.connect(gain)
        gain.connect(master)
        osc.start(t)
        osc.stop(t + noteLen)
        this.activeNodes.push(osc)
      }
      t += noteLen
    }
    const melodyDuration = t - startTime

    // Bass — sine wave, gentle
    let bt = startTime
    for (const [note, dur] of theme.bass) {
      const noteLen = dur * BEAT
      if (note && NOTE[note]) {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.value = NOTE[note]
        gain.gain.setValueAtTime(0.055, bt)
        gain.gain.setValueAtTime(0.055, bt + noteLen * 0.8)
        gain.gain.linearRampToValueAtTime(0, bt + noteLen)
        osc.connect(gain)
        gain.connect(master)
        osc.start(bt)
        osc.stop(bt + noteLen)
        this.activeNodes.push(osc)
      }
      bt += noteLen
    }
    const bassDuration = bt - startTime

    return Math.max(melodyDuration, bassDuration) * 1000
  }

  stopBgm() {
    this.bgmPlaying = false
    if (this.loopTimeout) clearTimeout(this.loopTimeout)
    this.loopTimeout = null
    for (const node of this.activeNodes) {
      try { (node as OscillatorNode).stop() } catch { /* already stopped */ }
    }
    this.activeNodes = []
  }

  playEffect(type: SfxType) {
    const ctx = this.getCtx()
    if (ctx.state === 'suspended') ctx.resume()
    const master = this.getMaster()
    const t = ctx.currentTime

    switch (type) {
      case 'correct': {
        const freqs = [440, 554, 659, 880]
        freqs.forEach((f, i) => {
          const osc = ctx.createOscillator()
          const g = ctx.createGain()
          osc.type = 'triangle'
          osc.frequency.value = f
          g.gain.setValueAtTime(0, t + i * 0.08)
          g.gain.linearRampToValueAtTime(0.14, t + i * 0.08 + 0.01)
          g.gain.linearRampToValueAtTime(0, t + i * 0.08 + 0.18)
          osc.connect(g); g.connect(master)
          osc.start(t + i * 0.08); osc.stop(t + i * 0.08 + 0.18)
        })
        break
      }
      case 'wrong': {
        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        osc.type = 'square'
        osc.frequency.setValueAtTime(220, t)
        osc.frequency.linearRampToValueAtTime(110, t + 0.3)
        g.gain.setValueAtTime(0.18, t)
        g.gain.linearRampToValueAtTime(0, t + 0.3)
        osc.connect(g); g.connect(master)
        osc.start(t); osc.stop(t + 0.3)
        break
      }
      case 'levelComplete': {
        const melody = [523, 659, 784, 1047]
        melody.forEach((f, i) => {
          const osc = ctx.createOscillator()
          const g = ctx.createGain()
          osc.type = 'triangle'
          osc.frequency.value = f
          g.gain.setValueAtTime(0.18, t + i * 0.14)
          g.gain.linearRampToValueAtTime(0, t + i * 0.14 + 0.22)
          osc.connect(g); g.connect(master)
          osc.start(t + i * 0.14); osc.stop(t + i * 0.14 + 0.22)
        })
        break
      }
      case 'click': {
        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        osc.type = 'square'
        osc.frequency.value = 880
        g.gain.setValueAtTime(0.07, t)
        g.gain.linearRampToValueAtTime(0, t + 0.04)
        osc.connect(g); g.connect(master)
        osc.start(t); osc.stop(t + 0.04)
        break
      }
      case 'sceneEnter': {
        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(440, t)
        osc.frequency.linearRampToValueAtTime(880, t + 0.12)
        g.gain.setValueAtTime(0.08, t)
        g.gain.linearRampToValueAtTime(0, t + 0.12)
        osc.connect(g); g.connect(master)
        osc.start(t); osc.stop(t + 0.12)
        break
      }
      case 'hover': {
        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.value = 1200
        g.gain.setValueAtTime(0, t)
        g.gain.linearRampToValueAtTime(0.05, t + 0.005)
        g.gain.linearRampToValueAtTime(0, t + 0.04)
        osc.connect(g); g.connect(master)
        osc.start(t); osc.stop(t + 0.04)
        break
      }
      case 'heartLoss': {
        // Descending dramatic "life lost" jingle
        const notes = [440, 392, 349, 294, 261]
        notes.forEach((f, i) => {
          const osc = ctx.createOscillator()
          const g = ctx.createGain()
          osc.type = 'square'
          osc.frequency.value = f
          g.gain.setValueAtTime(0.15, t + i * 0.1)
          g.gain.linearRampToValueAtTime(0, t + i * 0.1 + 0.12)
          osc.connect(g); g.connect(master)
          osc.start(t + i * 0.1); osc.stop(t + i * 0.1 + 0.12)
        })
        break
      }
    }
  }

  setVolume(v: number) {
    this._volume = v
    if (this.masterGain) this.masterGain.gain.value = this._muted ? 0 : v
  }

  mute() {
    this._muted = true
    if (this.masterGain) this.masterGain.gain.value = 0
  }

  unmute() {
    this._muted = false
    if (this.masterGain) this.masterGain.gain.value = this._volume
    if (!this.bgmPlaying) this.startBgm()
  }

  get muted() { return this._muted }
  get isInitialized() { return this.initialized }
}

export const audioEngine = new AudioEngine()
