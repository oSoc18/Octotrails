export class History {
  stop_id: String;
  created_at: string;
  inputs: any[];
  previous: string | History;

  /**
   * Init an History from a raw JSON object, with all field matching
   * @param fields All raw field of a History
   */
  public constructor(fields?: {}) {
    if (fields) Object.assign(this, fields);
  }
}
