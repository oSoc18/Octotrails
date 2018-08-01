import { Question } from '../categories/question';

export class History {
  id: String;
  stop_id: String;
  created_at: string;
  inputs: Question[];
  previous: string | History;

  /**
   * Init an History from a raw JSON object, with all field matching
   * @param fields All raw field of a History
   */
  public constructor(fields?: { inputs?: any[] }) {
    if (fields) Object.assign(this, fields);
    if (fields.inputs) {
      this.inputs = fields.inputs.map(inp => new Question(inp));
    }
  }
}
