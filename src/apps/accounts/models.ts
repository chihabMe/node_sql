import bcrypt from "bcrypt";
import { BasicModel, DB } from "../../core/database";

export class User extends BasicModel {
  public static tableName = "users";
  public username: string;
  public email: string;
  public password?: string;
  public id?: number;
  public created_at?: Date;
  public updated_at?: Date;

  constructor({
    username,
    email,
    password,
    created_at,
    updated_at,
    id,
  }: {
    username: string;
    email: string;
    password?: string;
    created_at?: string;
    updated_at?: string;
    id?: number;
  }) {
    super();
    this.username = username;
    this.email = email;
    this.password = password;
    this.created_at = new Date(created_at ?? "");
    this.updated_at = new Date(updated_at ?? "");
    this.id = id;
  }

  public async save() {
    if (!this.password)
      throw new Error(
        "please provide a password by using user.setPassword(pass)"
      );
    const fields = ["username", "email", "password"];
    const values = [this.username, this.email, this.password];
    return (await super.save(User.tableName, fields, values)) as User;
  }
  public static async findByX(x: string, xValue: string) {
    const user_data = await super.findByX(x, xValue, User.tableName);
    if (!user_data) return null;
    const user = new User({
      email: user_data.email,
      username: user_data.username,
      created_at: user_data.created_at,
      updated_at: user_data.updated_at,
      id: user_data.id,
      password: user_data.password,
    });
    return user;
  }

  public setPassword(password: string) {
    const hash = bcrypt.hashSync(password, 10);
    this.password = hash;
  }
  public comparePassword(password: string) {
    return bcrypt.compareSync(password, this.password ?? "");
  }
}
