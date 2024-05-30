import { StrumPattern } from "./types";

const library: Record<string, StrumPattern> = {
  "test-1/8": {
    noteLength: "1/8",
    strums: [
      { direction: "down", heading: "x" },
      { variant: "pause" },
      { direction: "up", heading: "^" },
      { variant: "muted" },
      { variant: "accent" },
      { variant: "rest" },
      { direction: "down" },
      { variant: "x" },
      { variant: "A" },
    ],
  },
  "test-1/16t": {
    noteLength: "1/16 triplet",
    strums: [
      { direction: "down", heading: "x" },
      { variant: "pause" },
      { direction: "up", heading: "^" },
      { variant: "muted" },
      { variant: "accent" },
      { variant: "rest" },
      { direction: "down" },
      { variant: "x" },
      { variant: "A" },
    ],
  },
  "dpdpdpdp-1/4": {
    noteLength: "1/4",
    strums: [
      { direction: "down" },
      { variant: "pause" },
      { direction: "down" },
      { variant: "pause" },
      { direction: "down" },
      { variant: "pause" },
      { direction: "down" },
      { variant: "pause" },
    ],
  },
  "dudududu-1/4": {
    noteLength: "1/4",
    strums: [
      { direction: "down" },
      { direction: "up" },
      { direction: "down" },
      { direction: "up" },
      { direction: "down" },
      { direction: "up" },
      { direction: "down" },
      { direction: "up" },
    ],
  },
  "dpdpdpdu-1/4": {
    noteLength: "1/4",
    strums: [
      { direction: "down" },
      { variant: "pause" },
      { direction: "down" },
      { variant: "pause" },
      { direction: "down" },
      { variant: "pause" },
      { direction: "down" },
      { direction: "up" },
    ],
  },
  "dpdpdudu-1/4": {
    noteLength: "1/4",
    strums: [
      { direction: "down" },
      { variant: "pause" },
      { direction: "down" },
      { variant: "pause" },
      { direction: "down" },
      { direction: "up" },
      { direction: "down" },
      { direction: "up" },
    ],
  },
};

export default library;
