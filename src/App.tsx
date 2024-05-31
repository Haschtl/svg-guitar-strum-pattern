import { ChangeEvent, useCallback, useRef, useState } from "react";
import "./App.css";
// import StrumPatternSvg from "./StrumPattern";
// import library from "./strumPatternLib";
import TextStrumPattern, { parseKey } from "./TextStrumPattern";
import { NoteLength } from "./types.ts";
import { saveSvg } from "./helper.ts";
import library from "./strumPatternLib.ts";
import StrumPatternSvg, { defaultStrumOptions } from "./StrumPattern.tsx";

function App() {
  const [options, setOptions] = useState(defaultStrumOptions);
  const ref = useRef<SVGSVGElement>(null);
  const [value, setValue] = useState("duaAmM r");
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
        <TextStrumPattern
          options={options}
          svgRef={ref}
          text={value}
          noteLength={noteLength}
        />
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
        <li>a: Arpeggio down-stroke</li>
        <li>A: Arpeggio up-stroke</li>
        <li> : Pause</li>
        <li>r: Rest</li>
        <li>Any other character is just inserted</li>
      </ul>
      <div>
        <div>Examples</div>
        <div className="strum-lib">
          {Object.entries(library).map(([key, sp]) => (
            <div
              key={key}
              className="strum-lib-entry"
              onClick={() => {
                const { strumText, noteLength } = parseKey(key);
                setValue(strumText);
                setNoteLength(noteLength);
              }}
            >
              <StrumPatternSvg
                options={options}
                strums={sp.strums}
                width="100%"
                height="100%"
                noteLength={sp.noteLength}
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        {Object.entries(options).map(([key, opt]) => (
          <div key={key}>
            {key}
            <input
              value={opt}
              onChange={(e) =>
                setOptions((v) => ({
                  ...v,
                  [key]:
                    e.target.value === "0"
                      ? 0
                      : isNaN(Number(e.target.value))
                      ? e.target.value
                      : Number(e.target.value),
                }))
              }
            ></input>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
