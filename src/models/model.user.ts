import { Model, ModelObject, QueryContext } from "objection";
import bcrypt from "bcrypt";

export class User extends Model {
  id!: number;
  email!: string;
  name!: string;
  status!: string;
  password!: string;

  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "name", "status", "password"],
      properties: {
        id: { type: "integer" },
        email: { type: "string", format: "email" },
        name: { type: "string" },
        status: { type: "string" },
        password: { type: "string" },
      },
    };
  }

  async $beforeInsert(context: QueryContext) {
    await super.$beforeInsert(context);
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }
}

export type UserSchema = ModelObject<User>;
