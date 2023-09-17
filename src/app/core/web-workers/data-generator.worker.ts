/// <reference lib="webworker" />

import { generateData } from "../utils/data.utils";

addEventListener('message', ({ data }: { data: number }) => {
  const dataArray = generateData(data);
  postMessage(dataArray);
})