export class Transport {
  line_id: number;
  type: string;
  direction: {
    fr: string;
    nl: string;
  };
  route_color: string;
  route_text_color: string;

  /**
   * Init a Transport from a raw JSON object, with all field matching
   * @param fields All raw field of a Transport
   */
  public constructor(fields?: {}) {
    if (fields) Object.assign(this, fields);
  }

  get number(): number {
    return this.line_id;
  }

  get backColor(): string {
    return '#' + this.route_color;
  }

  get textColor(): string {
    return '#' + this.route_text_color;
  }

  directionByLang(lang: string = 'fr'): string {
    return this.direction[lang];
  }
}

const images_stops_id: string[] = ['1348', '1349', '1350', '1351', '1356'];
export class Stop {
  id: string;
  alpha: {
    fr: string;
    nl: string;
  };
  descr: {
    fr: string;
    nl: string;
  };
  longitude: number;
  latitude: number;
  address: {
    fr: string;
    nl: string;
  };
  type: number;
  transport: Transport[];

  public get images(): string[] {
    if (images_stops_id.includes(this.id)) {
      return ['1', '2', '3'].map(mb => `/assets/img/${this.id}-${mb}.jpg`);
    }
    return [];
  }

  /**
   * Init a Stop from a raw JSON object, with all field matching
   * @param fields All raw field of a Stop
   */
  public constructor(fields?: { transport? }) {
    if (fields) {
      Object.assign(this, fields);
      if (fields.transport) {
        this.transport = fields.transport.map(tr => new Transport(tr));
      }
    }
  }

  alphaByLang(lang: string = 'fr'): string {
    return this.alpha[lang];
  }

  descrByLang(lang: string = 'fr'): string {
    return this.descr[lang];
  }

  addressByLang(lang: string = 'fr'): string {
    return this.address[lang];
  }
}
