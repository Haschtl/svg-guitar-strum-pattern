import "./App.css";

import React, { type ChangeEvent, useCallback, useRef, useState } from "react";

import { saveSvg } from "./helper.ts";
import StrumPatternSvg, { defaultStrumOptions } from "./StrumPattern.tsx";
import library from "./strumPatternLib.ts";
// import StrumPatternSvg from "./StrumPattern";
// import library from "./strumPatternLib";
import TextStrumPattern, { parseKey } from "./TextStrumPattern";
import type { NoteLength, StrumPattern, StrumPatternOptions } from "./types.ts";

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
  const onPress = useCallback((key: string) => {
    const { strumText, noteLength } = parseKey(key);
    setValue(strumText);
    setNoteLength(noteLength);
  }, []);
  const c = useCallback((key: string, value: any) => {
    setOptions((v) => ({
      ...v,
      [key]: value,
    }));
  }, []);
  return (
    <>
      {/* <StrumPatternSvg {...library["test-1/8"]} />
      <StrumPatternSvg {...library["test-1/16t"]} /> */}
      <div>
        <TextStrumPattern
          noteLength={noteLength}
          options={options}
          svgRef={ref}
          text={value}
        />
      </div>
      <input onChange={onChange} value={value} />
      <select onChange={selectNoteLength} value={noteLength}>
        <option value="1/4">1/4</option>
        <option value="1/8">1/8</option>
        <option value="1/4 triplet">1/4 triplet</option>
        <option value="1/8 triplet">1/8 triplet</option>
        <option value="1/16">1/16</option>
        <option value="1/16 triplet">1/16 triplet</option>
      </select>
      <button onClick={download} type="button">
        Download
      </button>
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
            <StrumButton
              key={key}
              name={key}
              onClick={onPress}
              options={options}
              strumPattern={sp}
            />
          ))}
        </div>
      </div>
      <div>
        {Object.entries(options).map(([key, opt]) => (
          <StrumInput Key={key} key={key} onChange={c} option={opt} />
        ))}
      </div>
    </>
  );
}

const StrumButton: React.FC<{
  name: string;
  onClick?: (name: string) => void;
  options?: Partial<StrumPatternOptions>;
  strumPattern: StrumPattern;
}> = ({ name, onClick, strumPattern, options }) => {
  const _onClick = useCallback(() => {
    onClick?.(name);
  }, [name, onClick]);
  return (
    <button className="strum-lib-entry" onClick={_onClick} type="button">
      <StrumPatternSvg
        height="100%"
        noteLength={strumPattern.noteLength}
        options={options}
        strums={strumPattern.strums}
        width="100%"
      />
    </button>
  );
};
const StrumInput: React.FC<{
  Key: string;
  onChange: (key: string, option: any) => void;
  option: any;
}> = ({ Key, option, onChange }) => {
  const _onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(
        Key,
        e.target.value === "0"
          ? 0
          : isNaN(Number(e.target.value))
          ? e.target.value
          : Number(e.target.value)
      );
    },
    [Key, option, onChange]
  );
  return (
    <div>
      {Key}
      <input onChange={_onChange} value={option} />
    </div>
  );
};

export default App;
