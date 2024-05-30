import {
  FullStrumPatternDefiniton,
  NoteLength,
  Strum,
  StrumPatternDefiniton,
  StrumPatternOptions,
} from "./types";

interface Props extends Partial<StrumPatternDefiniton> {
  svgRef?: React.LegacyRef<SVGSVGElement>;
}

const defaultStrumOptions: StrumPatternOptions = {
  arrowColor: "#000000",
  taktColor: "#555555",
  textColor: "#555555",
  taktHeight: 30,
  taktFontSize: 0.8,

  taktLineWidth: 4,
  taktLineHeight: 14,
  strumWidth: 20,
  strumHeight: 80,
  strumGap: 30,
  headerHeight: 30,
  headerFontSize: 0.8,
};

const FIX_FACTOR = 0.8;

const StrumPatternSvg: React.FC<Props> = ({
  strums = [],
  options = {},
  noteLength = "1/4",
  svgRef,
}) => {
  const _options = { ...options, ...defaultStrumOptions };
  const chars = createTaktChars(strums.length, noteLength);
  return (
    <svg
      ref={svgRef}
      width={
        (_options.strumWidth + _options.strumGap) * strums.length -
        _options.strumGap
      }
      height={
        _options.strumHeight + _options.headerHeight + 2 * _options.taktHeight
      }
    >
      {strums.map((s, i) => (
        <StrumHeader
          key={"head" + i}
          height={_options.headerHeight}
          width={_options.strumWidth}
          fill={_options.textColor}
          fontSize={_options.headerFontSize}
          x={
            (_options.strumWidth + _options.strumGap) * i +
            _options.strumWidth / 2
          }
        >
          {s.heading}
        </StrumHeader>
      ))}

      {strums.map((s, i) => (
        <g
          //   x={_options.strumWidth * i}
          key={"strum" + i}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          transform={`translate(${
            (_options.strumWidth + _options.strumGap) * i
          },${_options.headerHeight})${
            s.direction === "down" ? " rotate(180 0 0)" : ""
          }`}
        >
          <StrumArrow
            {...s}
            height={_options.strumHeight}
            width={_options.strumWidth}
            fill={_options.arrowColor}
          />
        </g>
      ))}

      {chars.map((s, i) => (
        <StrumHeader
          key={"head" + i}
          height={_options.taktHeight}
          width={_options.strumWidth}
          fill={_options.taktColor}
          fontSize={_options.taktFontSize}
          y={_options.headerHeight + _options.strumHeight * FIX_FACTOR}
          x={
            (_options.strumWidth + _options.strumGap) * i +
            _options.strumWidth / 2
          }
        >
          {s}
        </StrumHeader>
      ))}
      <NoteGroups strums={strums} options={_options} noteLength={noteLength} />
    </svg>
  );
};

const NoteGroups: React.FC<FullStrumPatternDefiniton> = ({
  noteLength,
  options,
  strums,
}) => {
  const horizontalStrokes = noteLength.includes("/4")
    ? 0
    : noteLength.includes("/8")
    ? 1
    : 2;
  const y =
    options.headerHeight +
    options.strumHeight * FIX_FACTOR +
    options.taktHeight;

  if (noteLength.includes("triplet")) {
    const quantity = Math.floor(strums.length / 3);
    return (
      <>
        {new Array(quantity).fill(0).map((_, i) => (
          <NoteGroup
            key={"g" + i}
            quantity={3}
            taktLineWidth={options.taktLineWidth}
            fill={options.taktColor}
            taktLineHeight={options.taktLineHeight}
            horizontalStrokes={horizontalStrokes}
            width={3 * (options.strumWidth + options.strumGap)}
            y={y}
            x={
              3 * (options.strumWidth + options.strumGap) * i +
              options.strumWidth / 2
            }
            subtitle={"3"}
          />
        ))}
      </>
    );
  }
  const quantity = Math.floor(strums.length / 2);
  return (
    <>
      {new Array(quantity).fill(0).map((_, i) => (
        <NoteGroup
          key={"g" + i}
          quantity={2}
          horizontalStrokes={horizontalStrokes}
          fill={options.taktColor}
          taktLineWidth={options.taktLineWidth}
          taktLineHeight={options.taktLineHeight}
          width={2 * (options.strumWidth + options.strumGap)}
          y={y}
          x={
            2 * (options.strumWidth + options.strumGap) * i +
            options.strumWidth / 2
          }
        />
      ))}
    </>
  );
};

interface NoteGroupProps {
  quantity: number;
  horizontalStrokes: number;
  width: number;
  y: number;
  x: number;
  taktLineWidth: number;
  taktLineHeight: number;
  subtitle?: string;
  fill: string;
}
const NoteGroup: React.FC<NoteGroupProps> = ({
  quantity,
  horizontalStrokes,
  width,
  y,
  x,
  taktLineWidth,
  taktLineHeight,
  subtitle,
  fill,
}) => {
  return (
    <g transform={`translate(${x},${y})`}>
      {new Array(quantity).fill(0).map((_, i) => (
        <rect
          key={"r" + i}
          width={taktLineWidth}
          height={taktLineHeight}
          fill={fill}
          x={(width * i) / quantity - taktLineWidth / 2}
        ></rect>
      ))}
      {new Array(horizontalStrokes).fill(0).map((_, i) => (
        <rect
          key={"r" + i}
          width={(width * (quantity - 1)) / quantity + taktLineWidth}
          height={taktLineWidth / horizontalStrokes}
          fill={fill}
          y={taktLineHeight - i * taktLineWidth}
          x={-taktLineWidth / 2}
        ></rect>
      ))}
      {subtitle ? (
        <text
          x={(width * (quantity - 1)) / quantity / 2}
          y={taktLineHeight + 16}
          fontSize={14}
          textAnchor="middle"
          fontFamily="sans-serif"
        >
          {subtitle}
        </text>
      ) : null}
    </g>
  );
};

const StrumArrow: React.FC<
  Omit<Strum, "direction"> &
    Partial<
      {
        height: number;
        width: number;
        strokeWidth: number;
        headHeight: number;
      } & React.SVGProps<SVGPathElement & SVGRectElement & SVGTextElement>
    >
> = ({
  variant = "normal",
//   direction = "up",
  height = 100,
  width = 50,
  strokeWidth = 0.2,
  headHeight = 0.2,
  ...pathProps
}) => {
  switch (variant) {
    case "normal":
      return (
        <path
          d={`m0,${height * headHeight}l${width / 2},${-height * headHeight}l${
            width / 2
          },${height * headHeight}l${(-width * (1 - strokeWidth)) / 2},0l0,${
            height / 2
          }l${-width * strokeWidth},0l0,${-height / 2}l${-width / 4},0z`}
          // strokeLinecap="null"
          // strokeLinejoin="null"
          //   strokeDasharray="null"
          strokeWidth="0"
          {...pathProps}
        />
      );
    case "accent":
      strokeWidth = Math.min(1, strokeWidth * 2);
      return (
        <path
          d={`m0,${height * headHeight}l${width / 2},${-height * headHeight}l${
            width / 2
          },${height * headHeight}l${(-width * (1 - strokeWidth)) / 2},0l0,${
            height / 2
          }l${-width * strokeWidth},0l0,${-height / 2}l${-width / 4},0z`}
          // strokeLinecap="null"
          // strokeLinejoin="null"
          //   strokeDasharray="null"
          strokeWidth="0"
          {...pathProps}
        />
      );
    case "muted":
      return (
        <>
          <path
            d={`m0,${height * headHeight}l${width},0l${
              (-width * (1 - strokeWidth)) / 2
            },0l0,${height / 2}l${-width * strokeWidth},0l0,${-height / 2}l${
              -width / 4
            },0z`}
            //   d="m0,25l25,-25l25,25l-18.75,0l0,50l-12.5,0l0,-50l-12.5,0z"
            strokeWidth="0"
            {...pathProps}
          />
          <rect
            width={width * strokeWidth}
            height={height * headHeight * 2}
            x={width / 2 - (width * strokeWidth) / 2}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            transform="rotate(45 0 0)"
            {...pathProps}
          ></rect>
          <rect
            width={width * strokeWidth}
            height={height * headHeight * 2}
            x={width / 2 - (width * strokeWidth) / 2}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            transform="rotate(-45 0 0)"
            {...pathProps}
          ></rect>
        </>
      );
    case "pause":
      return null;
    case "rest":
      // eslint-disable-next-line no-case-declarations
      const h_factor = 3;
      return (
        <>
          <rect
            y={(height / 4) * (1 - 1 / h_factor)}
            x={0 + width / 8}
            width={width / 4}
            height={height / h_factor}
            {...pathProps}
          ></rect>
          <rect
            y={(height / 4) * (1 - 1 / h_factor)}
            x={width / 2 + width / 8}
            width={width / 4}
            height={height / h_factor}
            {...pathProps}
          ></rect>
        </>
      );
    default:
      return (
        <text
          {...pathProps}
          y={height / 2}
          fontSize={height / 2}
          x={width / 2}
          textAnchor="middle"
          //   fontSizeAdjust={}
          //   fontVariant="bold"
          fontFamily="sans-serif"
          fontWeight="bold"
          //   x={width / 2}
          textLength={width}
          lengthAdjust="spacingAndGlyphs"
          width={width}
          //   height={height}
        >
          {variant}
        </text>
      );
  }
};

const StrumHeader: React.FC<
  Omit<
    React.SVGProps<SVGTextElement>,
    "height" | "width" | "fontSize" | "number"
  > & {
    height: number;
    width: number;
    fontSize: number;
    y?: number;
  }
> = ({ children, height, width, fontSize, y = 0, ...props }) => {
  if (!children) {
    return null;
  }
  return (
    <text
      height={height}
      width={height}
      y={y + height * fontSize}
      fontSize={height * fontSize}
      textLength={width}
      textAnchor="middle"
      //   fontSizeAdjust={}
      //   fontVariant="bold"
      fontFamily="sans-serif"
      fontWeight="bold"
      //   x={width / 2}
      //   lengthAdjust="spacingAndGlyphs"
      //   height={height}
      {...props}
    >
      {children}
    </text>
  );
};

export default StrumPatternSvg;

const createTaktChars = (quantity: number, noteLength: NoteLength) => {
  return new Array(quantity).fill(0).map((_, i) => {
    if (noteLength.includes("/4")) {
      //   return `${(i % 4) + 1}`;
      return `${i + 1}`;
    } else if (noteLength.includes("/8")) {
      const odd = i % 2 === 1;
      if (odd) {
        return "&";
      } else {
        // return `${(Math.round(i / 2) % 4) + 1}`;
        return `${Math.round(i / 2) + 1}`;
      }
    } else {
      const odd = i % 2 === 1;
      const halfOdd = (i / 2) % 2 === 1;
      if (odd) {
        return "";
      } else if (halfOdd) {
        return "&";
      } else {
        // return `${(Math.round(i / 2) % 4) + 1}`;
        return `${Math.round(i / 4) + 1}`;
      }
    }
  });
};
