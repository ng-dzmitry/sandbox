import { DataBuilder } from "src/app/builders/data.builder";

export function generateData(arraySize: number) {
  return new Array(arraySize).fill(null).map(() => new DataBuilder().build());
}