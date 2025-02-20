export interface StrumPatternDefiniton extends StrumPattern {
  options: Partial<StrumPatternOptions>;
}
export interface FullStrumPatternDefiniton extends StrumPattern {
  options: StrumPatternOptions;
}

export type NoteLength =
  "1/4 triplet" | "1/4" | "1/8 triplet" | "1/8" | "1/16 triplet" | "1/16";
export interface StrumPattern {
  noteLength: NoteLength;
  strums: Strum[];
}
export interface StrumPatternOptions {
  arrowColor: string;
  headerFontSize: number;
  headerHeight: number;
  strumGap: number;
  strumHeight: number;
  strumWidth: number;
  taktColor: string;
  taktFontSize: number;
  taktHeight: number;
  taktLineHeight: number;
  taktLineWidth: number;
  textColor: string;
}

export interface Strum {
  direction?: "down" | "up";
  heading?: string;
  variant?: StrumText | "accent" | "arpeggio" | "muted" | "normal" | "pause" | "rest";
}

type StrumText = LowerCase | Numbers | SpecialCharacters | UpperCase;

type SpecialCharacters =
  '"' | "_" | "-" | "," | ";" | ":" | "!" | "?" | "." | "'" | "(" | ")" | "[" | "]" | "{" | "}" | "§" | "*" | "/" | "\\" | "&" | "#" | "%" | "^" | "°" | "+" | "<" | "=" | ">" | "|" | "~" | "$";
type Numbers = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type LowerCase =
  "a" | "ä" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "ö" | "p" | "q" | "r" | "s" | "t" | "u" | "ü" | "v" | "w" | "x" | "y" | "z";

type UpperCase =
  "A" | "Ä" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "Ö" | "P" | "Q" | "R" | "S" | "T" | "U" | "Ü" | "V" | "W" | "X" | "Y" | "Z";
