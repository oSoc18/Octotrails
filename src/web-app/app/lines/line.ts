

export const Modes:Object = {
  "M" : "Metro",
  "T" : "Tram",
  "B" : "Bus"
};


export class Line {
    id: number;
    number : string;
    mode : string;
    color: string;
    text_color:string;
    destination: {
      fr : string;
      nl: string;
    };
    
    get backColor() {
      return '#'+this.color;
    }
    
    get textColor() {
      return '#'+this.text_color;
    }
}
