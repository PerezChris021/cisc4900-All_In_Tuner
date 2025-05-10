// components/PitchDetection.js

const A4_FREQUENCY = 440;
const A4_MIDI = 69;

// Sharp and flat note names for enharmonic equivalents
const NOTE_NAMES_SHARP = [
  "C", "C♯", "D", "D♯", "E", "F", "F♯",
  "G", "G♯", "A", "A♯", "B"
];

const NOTE_NAMES_FLAT = [
  "C", "D♭", "D", "E♭", "E", "F", "G♭",
  "G", "A♭", "A", "B♭", "B"
];

// Enharmonic display helper: "A♯ / B♭"
const getEnharmonicName = (index, octave) => {
  const sharp = NOTE_NAMES_SHARP[index];
  const flat = NOTE_NAMES_FLAT[index];
  return sharp === flat ? `${sharp}${octave}` : `${sharp}${octave} / ${flat}${octave}`;
};

/**
 * Get MIDI note number and enharmonic name from frequency
 */
export function getNoteFromFrequency(frequency) {
  const noteNumber = Math.round(12 * Math.log2(frequency / A4_FREQUENCY) + A4_MIDI);
  const index = noteNumber % 12;
  const octave = Math.floor(noteNumber / 12) - 1;
  const noteName = getEnharmonicName(index, octave);
  return { noteNumber, noteName };
}

/**
 * Get frequency from MIDI note number
 */
export function getFrequencyFromNoteNumber(noteNumber) {
  return A4_FREQUENCY * Math.pow(2, (noteNumber - A4_MIDI) / 12);
}

/**
 * Calculate cents off from the target frequency
 */
export function getCentsOff(frequency, targetFrequency) {
  return Math.floor(1200 * Math.log2(frequency / targetFrequency));
}

