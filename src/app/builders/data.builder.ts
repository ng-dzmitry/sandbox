import { ChildData } from "../core/models/child-data.model";
import { getRandomColorName, getRandomFloat, getRandomInt } from "src/app/core/utils/utils";
import { ChildDataBuilder } from "./child-data.builder";
import { Data } from "../core/models/data.model";
import { CSS_COLOR_NAMES } from "../core/constants/colors";
import { v4 as uuidv4 } from 'uuid';

export class DataBuilder {
  public id: string;
  public int: number;
  public float: number;
  public color: keyof typeof CSS_COLOR_NAMES;
  public child: ChildData;

  constructor() {
    this.id = uuidv4();
    this.int = getRandomInt(0, 1000);
    this.float = getRandomFloat(0.5, 99.5);
    this.color = getRandomColorName();
    this.child = new ChildDataBuilder().build();
  }

  build() {
    return new Data(this.id, this.int, this.float, this.color, this.child);
  }

  setId(id: string) {
    this.id = id;
    return this;
  }

  setInt(int: number) {
    this.int = int;
    return this;
  }

  setFloat(float: number) {
    this.float = float;
    return this;
  }

  setColor(color: keyof typeof CSS_COLOR_NAMES) {
    this.color = color;
    return this;
  }

  setChildColor(color: keyof typeof CSS_COLOR_NAMES) {
    this.child.color = color;
    return this;
  }

  setChildId(id: string) {
    this.child.id = id;
    return this;
  }
}