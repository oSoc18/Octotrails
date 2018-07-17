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
  "type": number;
  "transport": [
    {
      line_id: number;
      type: string;
      direction: {
        fr: string;
        nl: string;
      };
      route_color: string;
      route_text_color: string;
    }
  ];
}