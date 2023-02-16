import { RowDataPacket } from "mysql2";
import { DB } from "../../core/database";

export class Post {
  public static tableName = "posts";
  public id?: number;
  public body: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor({
    id,
    body,
    createdAt,
    updatedAt,
  }: {
    id?: number;
    body: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.body = body;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.id = id;
  }

  public save = async () => {
    const sql = `INSERT INTO ${Post.tableName}(body) values (?)`;
    //@ts-ignore
    const [result] = await DB.query(sql, [this.body]);
    return Post.findById(result.insertId);
  };
  public static findById = async (id: number) => {
    const data = await DB.query(`SELECT * FROM ${this.tableName} where id =?`, [
      id,
    ]);
    //@ts-ignore
    const [post] = data;
    return post as Post;
  };
  public static findAll = async () => {
    const data = await DB.query(`SELECT * FROM ${this.tableName} `);
    //@ts-ignore
    const [posts] = data;
    return posts as Post[] | undefined;
  };
}
