import React from 'react';
import Svg, { Path, Rect, Circle, SvgProps } from 'react-native-svg';

interface Props extends SvgProps {
  width?: number | string;
  height?: number | string;
}

export default function RelaxListenerIcon({ width = 400, height = 175, ...rest }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 800 350" fill="none" {...rest}>
      {/* Background Fundo Azul */}
      <Rect width="800" height="350" fill="#1C5FB8" />

      {/* Perna Traseira (Coral/Rosa Escuro) */}
      <Path
        d="M33 138.5 C68 120 120 125 150 180 C175 225 190 255 260 255 L160 255 C120 255 90 220 70 190 C50 160 40 145 33 138.5 Z"
        fill="#FF7461"
      />
      {/* Meia Traseira */}
      <Path d="M33 138.5 L60 125 L120 150 L95 163 Z" fill="#F0EFEF" />
      <Path
        d="M58 138 L72 132 M78 147 L92 141"
        stroke="#1C5FB8"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Perna Dianteira (Rosa Claro) */}
      <Path
        d="M205 100 L293 135 C280 180 250 255 210 255 L620 255 L620 172 L260 172 C230 172 215 150 205 100 Z"
        fill="#F7A1C4"
      />
      {/* Meia Dianteira */}
      <Path d="M205 100 L250 120 L293 135 L248 115 Z" fill="#F0EFEF" />
      <Path
        d="M225 108 L240 115 M250 120 L265 127"
        stroke="#1C5FB8"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Linha de Detalhe da Calça */}
      <Path
        d="M260 182 L420 182"
        stroke="#1C5FB8"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Tronco/Camisa Amarela */}
      <Path
        d="M480 172 L580 95 C620 115 650 140 680 170 L620 172 L480 172 Z"
        fill="#FCD250"
      />

      {/* Braço Apoio (Amarelo) */}
      <Path
        d="M555 130 C565 220 570 320 600 320 L650 320 C640 250 600 200 580 160 Z"
        fill="#FCD250"
      />
      {/* Punho Manga Laranja/Coral */}
      <Path
        d="M600 320 L650 320 C640 260 620 250 620 250 L585 270 C590 290 595 305 600 320 Z"
        fill="#FF7461"
      />

      {/* Braço Frontal (Laranja) */}
      <Path
        d="M605 200 C650 180 700 200 720 215 L720 260 L650 260 Z"
        fill="#FF7461"
      />

      {/* Mão e Dedos */}
      <Path
        d="M720 215 C730 200 740 195 745 205 C740 215 730 220 720 225 Z"
        fill="#FF7461"
      />
      <Path
        d="M718 190 C728 185 735 190 740 198 C735 205 725 205 718 200 Z"
        fill="#FF7461"
      />

      {/* Cabeça e Rosto */}
      {/* Cabelo Escuro */}
      <Path
        d="M580 95 C565 110 560 135 560 145 C575 145 580 120 590 100 Z"
        fill="#0D2E5C"
      />
      {/* Rosto / Pescoço */}
      <Path
        d="M580 100 C590 85 610 95 612 110 C615 130 600 140 580 145 Z"
        fill="#FF7461"
      />
      {/* Olho */}
      <Circle cx="600" cy="118" r="3" fill="#0D2E5C" />

      {/* Fone de Ouvido */}
      {/* Haste do Fone */}
      <Path
        d="M590 105 C580 75 605 70 605 90"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Almofada do Fone */}
      <Circle cx="585" cy="125" r="12" fill="#6FD6C1" />

      {/* Dispositivo (MP3 / Celular) */}
      <Rect x="698" y="200" width="22" height="26" rx="3" fill="#FFFFFF" />
      <Circle cx="709" cy="213" r="5" fill="#E2E8F0" />

      {/* Fio do Fone */}
      <Path
        d="M585 137 C585 180 610 180 610 210 C610 240 630 270 645 270 C660 270 670 200 685 190 C690 185 700 190 709 200"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}