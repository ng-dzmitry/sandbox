import { ChildData } from "./child-data.model";

export class Data {
  constructor(
    public id: string,
    public int: number,
    public float: number,
    public color: string,
    public child: ChildData) {
  }
}