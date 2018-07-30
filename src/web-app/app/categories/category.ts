export class Category {
  id: string;
  num: string;
  name: string;
  parent_num: string;
  parent: Category;

  /**
   * Init a Category from a raw JSON object, with all field matching
   * @param fields All raw field of a Category
   */
  public constructor(fields?: { parent: null }) {
    if (fields) Object.assign(this, fields);
    if (fields.parent) {
      this.parent = new Category(fields.parent);
    }
  }
}
