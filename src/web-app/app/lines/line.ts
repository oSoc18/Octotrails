export const Modes: Object = {
  M: 'Metro',
  T: 'Tram',
  B: 'Bus'
};

export class Line {
  stops?: any;
  id: number;
  number: string;
  mode: string;
  color: string;
  text_color: string;
  destination: {
    fr: string;
    nl: string;
  };

  get backColor(): string {
    return '#' + this.color;
  }

  get textColor(): string {
    return '#' + this.text_color;
  }
}
