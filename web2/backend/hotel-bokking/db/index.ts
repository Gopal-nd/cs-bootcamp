import { Pool } from "pg";
// import { Client } from 'pg'
//
// export const connectDB = async () => {
//
//   const db = await new Client({
//     connectionString: process.env.DATABASE_URL || 'postgresql://root:root@localhost:5432/hotel'
//   }).connect()
//
//   return db
// }
//
// const db = connectDB()

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://root:root@localhost:5432/hotel";

const db = new Pool({
  connectionString,
});

export default db
