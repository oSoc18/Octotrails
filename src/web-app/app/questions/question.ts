export class Question {
  id: string;
  num: string;
  content: string;
  type: string;
  hint?: string;
  choices?: any[];
  categorie_id?: string;

  /**
   * Init a Transport from a raw JSON object, with all field matching
   * @param fields All raw field of a Transport
   */
  public constructor(fields?: {}) {
    if (fields) Object.assign(this, fields);
  }
}
