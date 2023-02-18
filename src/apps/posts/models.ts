import { RowDataPacket } from "mysql2";
import { BasicModel, DB } from "../../core/database";

export class Post extends BasicModel {
  public static tableName = "posts";
  public id?: number;
  public body: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public user_id: number;

  constructor({
    id,
    body,
    createdAt,
    updatedAt,
    user_id,
  }: {
    id?: number;
    body: string;
    user_id: number;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    super();
    this.body = body;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.id = id;
    this.user_id = user_id;
  }

  public async save() {
    const fields = ["body", "user_id"];
    const values = [this.body, this.user_id.toString()];
    return super.save(Post.tableName, fields, values) as Promise<Post>;
  }
  public static findById = async (id: number) => {
    return (await super.findById(id, this.tableName)) as Post;
  };
  public static findAll = async () => {
    const data = await DB.query(`SELECT * FROM ${this.tableName} `);
    //@ts-ignore
    const [posts] = data;
    return posts as Post[] | undefined;
  };
  public static updateById = async (
    id: number,
    fields: string[],
    values: string[]
  ) => {
    return (await super.updateById(id, fields, values, this.tableName)) as Post;
  };
  public static deleteById = async (id: number) =>
    (await super.deleteById(id, this.tableName)) as Post;
}
