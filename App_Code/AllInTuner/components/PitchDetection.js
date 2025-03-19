import {detectPitch} from "pitchy";

export const analyzePitch = async (AudioBuffer, sampleRate) => {
    const [pitch, clarity] = detectPitch(AudioBuffer, sampleRate);

    if (!pitch) return { note: "No Sound was Detected"};

    const referenceFrequency = {
        A4: 440
    };

    let closetNote = null;
    let minDiff = Infinity;

    Object.entries(referenceFrequencies).forEach(([note, freq]) => {
        const diff = Math.abs(freq - pitch);
        if (diff < minDiff) {
          minDiff = diff;
          closestNote = note;
        }
      });
    
      let status = " In Tune";
      if (pitch < referenceFrequencies[closestNote] - 5) status = "⬇ Flat";
      else if (pitch > referenceFrequencies[closestNote] + 5) status = "⬆ Sharp";
    
      return { note: closestNote, status };


}