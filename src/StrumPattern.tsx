import React from "react";

import type {
  FullStrumPatternDefiniton,
  NoteLength,
  Strum,
  StrumPatternDefiniton,
  StrumPatternOptions,
} from "./types";

interface Props extends Partial<StrumPatternDefiniton> {
  height?: number | string | null;
  svgRef?: React.RefObject<SVGSVGElement | null>;
  width?: number | string | null;
}

export const defaultStrumOptions: StrumPatternOptions = {
  arrowColor: "#000000",
  headerFontSize: 0.8,
  headerHeight: 30,
  strumGap: 30,
  strumHeight: 80,

  strumWidth: 20,
  taktColor: "#555555",
  taktFontSize: 0.8,
  taktHeight: 30,
  taktLineHeight: 8,
  taktLineWidth: 2,
  textColor: "#555555",
};

const FIX_FACTOR = 0.8;

const StrumPatternSvg: React.FC<Props> = ({
  strums = [],
  options = {},
  noteLength = "1/4",
  svgRef,
  width,
  height,
}) => {
  const _options = { ...defaultStrumOptions, ...options };
  const chars = createTaktChars(strums.length, noteLength);
  const calcHeight =
    _options.strumHeight + _options.headerHeight + 2 * _options.taktHeight;
  const calcWidth =
    (_options.strumWidth + _options.strumGap) * strums.length -
    _options.strumGap;
  return (
    <svg
      height={height ?? calcHeight}
      ref={svgRef}
      viewBox={`0 0 ${calcWidth} ${calcHeight}`}
      width={width ?? calcWidth}
    >
      {strums.map((s, i) => (
        <StrumHeader
          fill={_options.textColor}
          fontSize={_options.headerFontSize}
          height={_options.headerHeight}
          key={"head" + i}
          width={_options.strumWidth}
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
            fill={_options.arrowColor}
            height={_options.strumHeight}
            width={_options.strumWidth}
          />
        </g>
      ))}

      {chars.map((s, i) => (
        <StrumHeader
          fill={_options.taktColor}
          fontSize={_options.taktFontSize}
          height={_options.taktHeight}
          key={"head" + i}
          width={_options.strumWidth}
          x={
            (_options.strumWidth + _options.strumGap) * i +
            _options.strumWidth / 2
          }
          y={_options.headerHeight + _options.strumHeight * FIX_FACTOR}
        >
          {s}
        </StrumHeader>
      ))}
      <NoteGroups noteLength={noteLength} options={_options} strums={strums} />
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
            fill={options.taktColor}
            horizontalStrokes={horizontalStrokes}
            key={"g" + i}
            quantity={3}
            subtitle={"3"}
            taktLineHeight={options.taktLineHeight}
            taktLineWidth={options.taktLineWidth}
            width={3 * (options.strumWidth + options.strumGap)}
            x={
              3 * (options.strumWidth + options.strumGap) * i +
              options.strumWidth / 2
            }
            y={y}
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
          fill={options.taktColor}
          horizontalStrokes={horizontalStrokes}
          key={"g" + i}
          quantity={2}
          taktLineHeight={options.taktLineHeight}
          taktLineWidth={options.taktLineWidth}
          width={2 * (options.strumWidth + options.strumGap)}
          x={
            2 * (options.strumWidth + options.strumGap) * i +
            options.strumWidth / 2
          }
          y={y}
        />
      ))}
    </>
  );
};

interface NoteGroupProps {
  fill: string;
  horizontalStrokes: number;
  quantity: number;
  subtitle?: string;
  taktLineHeight: number;
  taktLineWidth: number;
  width: number;
  x: number;
  y: number;
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
}) => (
  <g transform={`translate(${x},${y})`}>
    {new Array(quantity).fill(0).map((_, i) => (
      <rect
        fill={fill}
        height={taktLineHeight}
        key={"r" + i}
        width={taktLineWidth}
        x={(width * i) / quantity - taktLineWidth / 2}
      />
    ))}
    {new Array(horizontalStrokes).fill(0).map((_, i) => (
      <rect
        fill={fill}
        height={taktLineWidth / horizontalStrokes}
        key={"r" + i}
        width={(width * (quantity - 1)) / quantity + taktLineWidth}
        x={-taktLineWidth / 2}
        y={taktLineHeight - i * taktLineWidth}
      />
    ))}
    {subtitle ? (
      <text
        fill={fill}
        fontFamily="sans-serif"
        fontSize={14}
        textAnchor="middle"
        x={(width * (quantity - 1)) / quantity / 2}
        y={taktLineHeight + 16}
      >
        {subtitle}
      </text>
    ) : null}
  </g>
);

const StrumArrow: React.FC<
  Omit<Strum, "direction"> &
    Partial<
      React.SVGProps<SVGPathElement & SVGRectElement & SVGTextElement> & {
        headHeight: number;
        height: number;
        strokeWidth: number;
        width: number;
      }
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
    case "arpeggio":
      // eslint-disable-next-line no-case-declarations
      const offsetY = height * headHeight * 0.95;
      // eslint-disable-next-line no-case-declarations
      const numWaves = 6;
      // eslint-disable-next-line no-case-declarations
      const amplitude = 6;
      // eslint-disable-next-line no-case-declarations
      const offsetX = amplitude * 2;
      // eslint-disable-next-line no-case-declarations
      const wavelength = height / numWaves / 2;
      return (
        <>
          <path
            d={`m0,${height * headHeight}l${width / 2},${
              -height * headHeight
            }l${width / 2},${height * headHeight}`}
            // strokeLinecap="null"
            // strokeLinejoin="null"
            //   strokeDasharray="null"
            strokeWidth="0"
            {...pathProps}
          />
          <path
            // d={
            //   `M0 , ${offset}` +
            //   new Array(6)
            //     .fill(0)
            //     .map(
            //       (_, i) =>
            //         `Q${wavelength / 2 + wavelength * i} ${
            //           (i % 2 === 0 ? -amplitude : amplitude) + offset
            //         }, ${wavelength * (i + 1)} ${offset}`
            //     )
            //     .join(", ")
            // }
            d={
              `M${offsetX} , ${offsetY}` +
              new Array(numWaves)
                .fill(0)
                .map(
                  (_, i) =>
                    `Q${(i % 2 === 0 ? -amplitude : amplitude) + offsetX} ${
                      wavelength / 2 + wavelength * i + offsetY
                    } , ${offsetX} ${wavelength * (i + 1) + offsetY}`
                )
                .join(", ")
            }
            // strokeLinecap="null"
            // strokeLinejoin="null"
            //   strokeDasharray="null"
            strokeWidth={width * strokeWidth}
            {...pathProps}
            fill={"transparent"}
            stroke={pathProps.fill}
          />
        </>
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
            height={height * headHeight * 2}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            transform="rotate(45 0 0)"
            width={width * strokeWidth}
            x={width / 2 - (width * strokeWidth) / 2}
            {...pathProps}
          />
          <rect
            height={height * headHeight * 2}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            transform="rotate(-45 0 0)"
            width={width * strokeWidth}
            x={width / 2 - (width * strokeWidth) / 2}
            {...pathProps}
          />
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
            height={height / h_factor}
            width={width / 4}
            x={0 + width / 8}
            y={(height / 4) * (1 - 1 / h_factor)}
            {...pathProps}
          />
          <rect
            height={height / h_factor}
            width={width / 4}
            x={width / 2 + width / 8}
            y={(height / 4) * (1 - 1 / h_factor)}
            {...pathProps}
          />
        </>
      );
    default:
      return (
        <text
          {...pathProps}
          fontFamily="sans-serif"
          fontSize={height / 2}
          fontWeight="bold"
          lengthAdjust="spacingAndGlyphs"
          textAnchor="middle"
          textLength={width}
          width={width}
          x={width / 2}
          y={height / 2}
          //   fontSizeAdjust={}
          //   fontVariant="bold"
          //   x={width / 2}
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
    "fontSize" | "height" | "number" | "width"
  > & {
    fontSize: number;
    height: number;
    width: number;
    y?: number;
  }
> = ({ children, height, width, fontSize, y = 0, ...props }) => {
  if (!children) {
    return null;
  }
  return (
    <text
      fontFamily="sans-serif"
      fontSize={height * fontSize}
      fontWeight="bold"
      height={height}
      textAnchor="middle"
      textLength={width}
      width={height}
      y={y + height * fontSize}
      //   fontSizeAdjust={}
      //   fontVariant="bold"
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
  const triplet = noteLength.includes("triplet");
  return new Array(quantity).fill(0).map((_, i) => {
    if (noteLength.includes("/4")) {
      //   return `${(i % 4) + 1}`;
      if (triplet) {
        if (i % 3 === 0) {
          return `${i / 3 + 1}`;
        } else {
          return "";
        }
      }
      return `${i + 1}`;
    } else if (noteLength.includes("/8")) {
      if (triplet) {
        if (i % 3 === 0) {
          return `${i / 3 + 1}`;
        } else {
          return "";
        }
      }
      const odd = i % 2 === 1;
      if (odd) {
        return "&";
      } else {
        // return `${(Math.round(i / 2) % 4) + 1}`;
        return `${Math.round(i / 2) + 1}`;
      }
    } else {
      if (triplet) {
        if (i % 3 === 0) {
          const v = i / 3 + 1;
          const odd = v % 2 === 1;
          if (!odd) {
            return "&";
          }
          return `${v}`;
        } else {
          return "";
        }
      }
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
