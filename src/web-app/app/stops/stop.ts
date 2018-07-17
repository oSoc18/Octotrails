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
}
export class Stop {
  "id": string;
  "alpha_fr": string;
  "alpha_nl": string;
  "descr_fr": string;
  "descr_nl": string;
  "longitude": number;
  "latitude": number;
  "address": {

    fr: string;
    nl: string;
  };
  type: number;
  transport: Transport[];

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
}
