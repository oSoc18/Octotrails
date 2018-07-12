export class Stop {
  "id": string;
  "alpha_fr": string;
  "alpha_nl": string;
  "descr_fr": string;
  "descr_nl": string;
  "coord_x": string;
  "coord_y": string;
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