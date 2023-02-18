import bcrypt from "bcrypt";
import { BasicModel, DB } from "../../core/database";

export class User extends BasicModel {
  public static tableName = "users";
  public username: string;
  public email: string;
  public password?: string;
  public id?: number;

  constructor(username: string, email: string) {
    super();
    this.username = username;
    this.email = email;
  }

  save = async (): Promise<User> => {
    const sql = `INSERT INTO ${User.tableName} (username,email,password) values (?,?,?)`;
    //@ts-ignore
    const [result] = await await DB.query(sql, [
      this.username,
      this.email,
      this.password,
    ]);
  };

  setPassword = (password: string) => {
    const hash = bcrypt.hashSync(password, 10);
    this.password = password;
  };
  comparePassword = (password: string) => {
    return bcrypt.compareSync(password, this.password);
  };
}
