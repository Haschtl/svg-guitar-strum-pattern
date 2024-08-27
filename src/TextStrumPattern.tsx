import { memo } from "react";
import StrumPatternSvg from "./StrumPattern";
import { NoteLength, Strum, StrumPatternOptions } from "./types";

export const parseKey = (
  text: string
): { strums: Strum[]; strumText: string; noteLength: NoteLength } => {
  const split = text.split("-");
  if (split.length !== 2) {
    return { noteLength: "1/4", strumText: "", strums: [] };
  }
  const strums = text2strums(split[0]);
  const noteLength = split[1].replace("t", " triplet") as NoteLength;
  return { strums, strumText: split[0], noteLength };
};

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
  width?: string | number | null;
  height?: string | number | null;
}> = ({ text, options, noteLength, svgRef, ...props }) => {
  const strums = text2strums(text);
  return (
    <StrumPatternSvg
      svgRef={svgRef}
      strums={strums}
      options={options}
      noteLength={noteLength}
      {...props}
    />
  );
};

const TextStrumPatternMemo = memo(TextStrumPattern);
export default TextStrumPatternMemo;
