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
    return result as BasicModel;
  };
}
