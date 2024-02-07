import { Model, ModelObject, QueryContext } from "objection";
import bcrypt from "bcrypt";

export class User extends Model {
  id!: number;
  email!: string;
  name!: string;
  username!: string;
  password!: string;
  image!: string;

  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "name", "username", "password" ],
      properties: {
        id: { type: "integer" },
        email: { type: "string", format: "email" },
        name: { type: "string" },
        username: { type: "string" },
        password: { type: "string" },
        image: { type: "string" },
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
