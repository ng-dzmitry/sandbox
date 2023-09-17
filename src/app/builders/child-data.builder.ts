import { getRandomColorName } from "../core/utils/utils";
import { ChildData } from "../core/models/child-data.model";
import { v4 as uuidv4 } from 'uuid';

export class ChildDataBuilder {
  public id: string;
  public color: string;

  constructor() {
    this.id = uuidv4();
    this.color = getRandomColorName();
  }

  build() {
    return new ChildData(this.id, this.color);
  }

  setId(id: string) {
    this.id = id;
    return this;
  }

  setColor(color: string) {
    this.color = color;
    return this;
  }
}