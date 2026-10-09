import * as React from "react";
import Svg, { Path, Ellipse } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  skin?: string;
  hair?: string;
  mask?: string;
};

const SvgAvatarHero = ({
  width = 64,
  height = 64,
  skin = "#b15f2a",
  hair = "#000000",
  mask = "#e96bb8",
}: Props) => (
  <Svg width={width} height={height} viewBox="0 0 340 390" fill="none">
    {/* Cabeça */}
    <Path
      d="M70 80C40 110 28 170 38 225L80 275C95 310 105 340 112 355C150 372 215 372 235 362C270 330 295 300 305 270L300 160C295 110 290 100 285 95C250 40 150 0 70 80Z"
      fill={skin}
      stroke="#000"
      strokeWidth={8}
      strokeLinejoin="round"
    />

    {/* Orelha */}
    <Path
      d="M62 230C40 222 30 240 38 258C45 272 62 272 75 266"
      fill={skin}
      stroke="#000"
      strokeWidth={8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M48 240C54 240 58 244 58 250"
      stroke="#000"
      strokeWidth={5}
      strokeLinecap="round"
    />

    {/* Cabelo */}
    <Path
      d="M62 90C85 30 180 0 250 48C278 66 288 92 290 108C235 90 160 90 120 100C126 120 128 140 130 170L100 215C80 225 55 215 40 218C30 170 40 120 62 90Z"
      fill={hair}
    />

    {/* Máscara */}
    <Path
      d="M130 195C130 170 160 160 195 170C215 175 232 188 245 190C262 170 290 160 315 172C330 185 325 215 305 240C285 262 255 262 235 245C215 232 190 262 160 255C135 248 130 215 130 195Z"
      fill={mask}
      stroke="#000"
      strokeWidth={9}
      strokeLinejoin="round"
    />

    {/* Olhos da máscara */}
    <Path
      d="M168 205C180 200 205 205 212 215C205 225 180 225 168 205Z"
      fill="#fff"
      stroke="#000"
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <Path
      d="M272 208C282 200 300 203 305 210C298 222 280 224 272 208Z"
      fill="#fff"
      stroke="#000"
      strokeWidth={4}
      strokeLinejoin="round"
    />

    {/* Nariz */}
    <Path
      d="M232 250C240 262 255 262 262 250"
      stroke="#000"
      strokeWidth={6}
      strokeLinecap="round"
    />

    {/* Boca */}
    <Path
      d="M185 300C215 308 255 302 288 292"
      stroke="#000"
      strokeWidth={7}
      strokeLinecap="round"
    />
  </Svg>
);

export default SvgAvatarHero;