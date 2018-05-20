export class Hero {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  getStyle(): number {
    const midChar = this.name.length / 2;
    const midCharCode: number = this.name.charCodeAt(midChar);
    return midCharCode % 5;
  }
}
