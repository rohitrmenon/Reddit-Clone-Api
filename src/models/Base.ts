import { Model, snakeCaseMappers, AjvValidator } from "objection";
import addFormats from "ajv-formats";

export class Base extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static createValidator() {
    return new AjvValidator({
      onCreateAjv: (ajv) => {
        addFormats.default(ajv);
      },
      options: {
        allErrors: true,
        validateSchema: true,
        ownProperties: true,
      },
    });
  }
}

export default Base;
