import { createPool } from "mysql2";
import Pool from "mysql2/typings/mysql/lib/Pool";
import { createConnection } from "net";
import { getDbConfig } from "./env";

export const DB: Pool = createPool({
  user: getDbConfig().user,
  database: getDbConfig().database,
  password: getDbConfig().password,
  host: getDbConfig().host,
  port: getDbConfig().port,
}).promise();

export class BasicModel {
  public static findById = async (id: number, tableName: string) => {
    const sql = `SELECT * FROM ${tableName} WHERE id =?`;
    console.log(`executing query ${sql}`, id);
    const data = await DB.query(sql, [id]);
    //@ts-ignore
    const result = data[0][0];
    if (!result) throw new Error("not found");
    return result;
  };
  public static updateById = async (
    id: number,
    fields: string[],
    values: string[],
    tableName: string
  ) => {
    if (fields.length != values.length)
      throw new Error("incapable to handle this query ");
    let sql =
      `UPDATE ${tableName} SET ` +
      fields.map((field, idx) =>
        idx === 0 ? (field += "=?") : "," + field + "=?"
      );
    console.log(sql);
    await DB.query(sql, [values]);
    return await this.findById(id, tableName);
  };
  public static deleteById = async (id: number, tableName: string) => {
    const data = await this.findById(id, tableName);
    let sql = `DELETE FROM posts WHERE id = ? `;
    await DB.query(sql, [id]);
    return data;
  };
  public async save(tableName: string, fields: string[], values: string[]) {
    let sql = `INSERT INTO  ${tableName} (` + fields.map((field, idx) => field);
    sql += ") VALUES (";
    sql += fields.map((_, idx) => "?");
    sql += ");";

    console.log("RUN SQL ==  ", sql);
    //@ts-ignore
    const [result] = await DB.query(sql, values);
    return await BasicModel.findById(result.insertId, tableName);
  }

  public static async findAll(
    offset: number,
    limit: number,
    tableName: string
  ) {
    if (!offset) offset = 0;
    if (!limit) limit = 10;
    const sql = `SELECT * FROM ${tableName} LIMIT ${offset},${limit}`;
    console.log(`executing query ${sql}`);
    const data = await DB.query(sql);
    //@ts-ignore
    const result = data[0];
    return result as BasicModel[];
  }
  public static async findByX(x: string, xValue: string, tableName: string) {
    const sql = `SELECT * FROM ${tableName} WHERE ${x} =?`;
    console.log(`executing query ${sql}`, xValue);
    const data = await DB.query(sql, [xValue]);
    //@ts-ignore
    const result = data[0][0];
    return result;
  }
}
