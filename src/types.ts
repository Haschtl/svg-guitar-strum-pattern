export interface StrumPatternDefiniton extends StrumPattern {
  options: Partial<StrumPatternOptions>;
}
export interface FullStrumPatternDefiniton extends StrumPattern {
  options: StrumPatternOptions;
}

export type NoteLength =
  | "1/4"
  | "1/8"
  | "1/4 triplet"
  | "1/8 triplet"
  | "1/16"
  | "1/16 triplet";
export interface StrumPattern {
  strums: Strum[];
  noteLength: NoteLength;
}
export interface StrumPatternOptions {
  strumWidth: number;
  strumGap: number;
  strumHeight: number;
  textColor: string;
  arrowColor: string;
  headerHeight: number;
  headerFontSize: number;
  taktColor: string;
  taktHeight: number;
  taktFontSize: number;
  taktLineWidth: number;
  taktLineHeight: number;
}

export interface Strum {
  direction?: "up" | "down";
  variant?: "normal" | "muted"|"arpeggio" | "rest" | "accent" | "pause" | StrumText;
  heading?: string;
}

type StrumText = LowerCase | UpperCase | SpecialCharacters | Numbers;

type SpecialCharacters =
  | "!"
  | "§"
  | "$"
  | "%"
  | "&"
  | "/"
  | "("
  | ")"
  | "["
  | "]"
  | "{"
  | "}"
  | "="
  | "?"
  | "\\"
  | '"'
  | "+"
  | "~"
  | "#"
  | "'"
  | ";"
  | ","
  | "."
  | ":"
  | "-"
  | "_"
  | "|"
  | "<"
  | ">"
  | "^"
  | "°"
  | "*";
type Numbers = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type LowerCase =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z"
  | "ä"
  | "ö"
  | "ü";

type UpperCase =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z"
  | "Ä"
  | "Ö"
  | "Ü";
