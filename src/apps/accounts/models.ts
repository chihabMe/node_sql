
import bcrypt from "bcrypt"
import { DB } from "../../core/database";

export class User{
    public static tableName="users"
    public this.username:string;
    public this.email:string;
    public this.password?:string;
    public this.id?:number;

    construction({username,email}:{username:string,email:string}){
        this.username=username;
        this.email=email
    }

    const save= async():Promise<User>=>{
        const sql = `INSERT INTO ${User.tableName} (username,email,password) values (?,?,?)`
        //@ts-ignore
        const [result] = await await DB.query(sql,[this.username,this.email,this.password])
    }
    

    const setPassword = (password:string)=>{
        const hash = bcrypt.hashSync(password,10)
        this.password=password
    }
    const comparePassword = (password:string)=>{
        return bcrypt.compareSync(password,this.password) 

    }


}