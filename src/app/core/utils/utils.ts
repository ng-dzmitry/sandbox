import { CSS_COLOR_NAMES } from "../constants/colors";

const PRECISION = 18;

export function getRandomFloat(min: number, max: number) {
  const val = (Math.random() * (max - min) + min).toPrecision(PRECISION);
  return parseFloat(val);
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomColorName() {
  const colors = Object.entries(CSS_COLOR_NAMES);
  const color = colors[getRandomInt(0, colors.length - 1)];
  return color[0] as keyof typeof CSS_COLOR_NAMES;
}