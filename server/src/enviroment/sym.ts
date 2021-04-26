export class Sym {
  public type: EnumType | undefined;
  public value: any;
  public breturn: boolean;

  constructor(type?: EnumType, value?: any) {
    if (type != undefined && value != undefined) {
      this.type = type;
      this.value = value;
    }
    this.breturn = false;
  }

  toString(): string {
    if (this.value != null || this.value != undefined) {
      return JSON.stringify(this.value);
    }
    if (this.value == null) return 'null';
    return 'undefined';
  }
}
export enum EnumType {
  int,
  double,
  boolean,
  string,
  char,
  funcion,
  void,
  error,
}
