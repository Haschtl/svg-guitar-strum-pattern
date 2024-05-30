import StrumPatternSvg from "./StrumPattern";
import { NoteLength, Strum, StrumPatternOptions } from "./types";

const text2strums = (text: string): Strum[] => {
  return text.split("").map((char) => {
    const strum: Strum = {};
    switch (char) {
      case "u":
        strum.direction = "up";
        break;
      case "d":
        strum.direction = "down";
        break;
      case " ":
        strum.variant = "pause";
        break;
      case "r":
        strum.variant = "rest";
        break;
      case "m":
        strum.variant = "muted";
        strum.direction = "down";
        break;
      case "M":
        strum.variant = "muted";
        strum.direction = "up";
        break;
      case "a":
        strum.variant = "arpeggio";
        strum.direction = "down";
        break;
      case "A":
        strum.variant = "arpeggio";
        strum.direction = "up";
        break;
      default:
        strum.variant = char as "a";
        break;
    }
    return strum;
  });
};
const TextStrumPattern: React.FC<{
  text: string;
  noteLength: NoteLength;
  options?: Partial<StrumPatternOptions>;
  svgRef?: React.LegacyRef<SVGSVGElement>;
}> = ({ text, options, noteLength, svgRef }) => {
  const strums = text2strums(text);
  return (
    <StrumPatternSvg
      svgRef={svgRef}
      strums={strums}
      options={options}
      noteLength={noteLength}
    />
  );
};

export default TextStrumPattern;
