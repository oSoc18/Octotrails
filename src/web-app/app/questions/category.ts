export class Category {
    id: string;
    num: string;
    parent_num?: string;
  
    /**
     * Init a Category from a raw JSON object, with all field matching
     * @param fields All raw field of a Transport
     */
    public constructor(fields?: {}) {
      if (fields) Object.assign(this, fields);
    }
  }
  