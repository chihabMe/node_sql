import { DB } from "../../core/database";

export class Post {
  public static tableName = "posts";
  public id: number = 0;
  public title: string = "";
  public body: string = "";
  public created: Date = new Date();
  public updated: Date = new Date();

  constructor({
    id,
    title,
    body,
    created,
    updated,
  }: {
    id: number;
    title: string;
    body: string;
    created: Date;
    updated: Date;
  }) {
    this.title = title;
    this.body = body;
  }

  public static findById = async (id: number) => {
    const data = DB.query(
      `SELECT * FROM ${this.tableName} where id =?`,
      [id],
      (err, result, fields) => {
        if (err) console.log(err);
        return result;
      }
    );
    console.log(data);
    return new Post({
      body: "body",
      created: new Date(),
      id: 1,
      title: "title",
      updated: new Date(),
    });
  };
}
