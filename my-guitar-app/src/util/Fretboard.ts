
import { Note, Interval } from "@tonaljs/tonal"; // Assuming standard Tonal import

/**
 * Generates a 2D array representing the guitar fretboard.
 * @param {string[]} tuning - Array of notes from lowest pitch to highest (e.g., Standard: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'])
 * @param {number} fretCount - Total number of frets to generate (usually 22 or 24)
 * @returns {Array<Array<Object>>} 2D array: fretboard[stringIndex][fret]
 */

export type FretNode = {
  stringIndex: number;
  fret: number;
  note: string;
  pitchClass: string;
  octave: number | undefined;
  midi: number | null;
}

export function generateFretboard(tuning = ["E2", "A2", "D3", "G3", "B3", "E4"], fretCount = 24) {
  return tuning.map((openNote, stringIndex) => {
    const stringData = [];

    for (let fret = 0; fret <= fretCount; fret++) {
      // Calculate the interval based on the fret number (1 fret = 1 semitone)
      const interval = Interval.fromSemitones(fret);

      // Calculate the exact note at this fret
      const calculatedNoteName = Note.transpose(openNote, interval);

      // Extract all the useful metadata from Tonal
      const noteData = Note.get(calculatedNoteName);

      stringData.push({
        stringIndex: stringIndex, // 0 = lowest pitch string
        fret: fret,
        note: noteData.name,      // e.g., "F#2"
        pitchClass: noteData.pc,  // e.g., "F#"
        octave: noteData.oct,     // e.g., 2
        midi: noteData.midi       // Absolute pitch number (crucial for later)
      });
    }

    return stringData;
  });
}



