"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = exports.getTableNames = void 0;
// db.ts
const pg_1 = require("pg");
require("../dotenv"); // 这会加载环境变量
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
// console.log("pool", pool);
pool.on("connect", () => {
    console.log("Connected to the database");
});
// pool.query("SELECT NOW()", (err, res) => {
//   if (err) {
//     console.error("Error executing test query", err.stack);
//   } else {
//     console.log("Test query result:", res.rows);
//   }
// });
// Function to get table names
const getTableNames = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE';
    `);
        console.log("Table names:", res.rows);
        return res.rows;
    }
    catch (err) {
        if (err instanceof Error) {
            // Type guard
            console.error("Error fetching table names", err.message);
        }
        else {
            console.error("Unexpected error", err);
        }
    }
});
exports.getTableNames = getTableNames;
const query = (text, params) => pool.query(text, params);
exports.query = query;
