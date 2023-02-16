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

const createDatabaseTables = async () => {
  const sql =
    "CREATE TABLE posts    (" +
    "id INT PRIMARY KEY AUTO_INCREMENT," +
    "body TEXT," +
    "created_at DATETIME DEFAULT(now())," +
    "updated_at DATETIME DEFAULT(now()));";
  const result = await DB.query(sql);
  // console.log(result);
};

if (require.main == module) createDatabaseTables();
