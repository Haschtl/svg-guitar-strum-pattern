import { ChangeEvent, useCallback, useRef, useState } from "react";
import "./App.css";
// import StrumPatternSvg from "./StrumPattern";
// import library from "./strumPatternLib";
import TextStrumPattern from "./TextStrumPattern";
import { NoteLength } from "./types.ts";
import { saveSvg } from "./helper.ts";

function App() {
  const ref = useRef<SVGSVGElement>(null);
  const [value, setValue] = useState("dudumM r");
  const [noteLength, setNoteLength] = useState<NoteLength>("1/8");
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);
  const selectNoteLength = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setNoteLength(e.target.value as NoteLength);
  }, []);
  const download = useCallback(() => {
    if (ref.current) saveSvg(ref.current, `${value}-${noteLength}.svg`);
  }, [noteLength, value]);
  return (
    <>
      {/* <StrumPatternSvg {...library["test-1/8"]} />
      <StrumPatternSvg {...library["test-1/16t"]} /> */}
      <div>
        <TextStrumPattern svgRef={ref} text={value} noteLength={noteLength} />
      </div>
      <input value={value} onChange={onChange}></input>
      <select onChange={selectNoteLength} value={noteLength}>
        <option value="1/4">1/4</option>
        <option value="1/8">1/8</option>
        <option value="1/4 triplet">1/4 triplet</option>
        <option value="1/8 triplet">1/8 triplet</option>
        <option value="1/16">1/16</option>
        <option value="1/16 triplet">1/16 triplet</option>
      </select>
      <button onClick={download}>Download</button>
      <ul>
        <li>d: Down-stroke</li>
        <li>u: Up-stroke</li>
        <li>m: Muted down-stroke</li>
        <li>M: Muted up-stroke</li>
        <li> : Pause</li>
        <li>r: Rest</li>
        <li>Any other character is just inserted</li>
      </ul>
    </>
  );
}

export default App;
