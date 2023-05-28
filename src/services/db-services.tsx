import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

import { Transaction } from '../models/transaction';
import { Category } from '../models/category';
import { Account } from '../models/account';

enablePromise(true);

const tableName = 'transactions';

export const getDBConnection = async (): Promise<SQLiteDatabase> => {
    return openDatabase({ name: 'money-manager.db', location: 'default' });
}

export const createTable = async (db: SQLiteDatabase): Promise<void> => {
    await db.executeSql(`CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT,
        category_id INTEGER,
        account_id INTEGER,
        amount INTEGER,
        note TEXT,
        date INTEGER,
    )`);

    await db.executeSql(`CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        balance INTEGER,
        type TEXT,
        note TEXT
    )`);

    await db.executeSql(`CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        image TEXT
    )`);
}

export const insertTransaction = async (db: SQLiteDatabase, transaction: Transaction): Promise<void> => {
    await db.executeSql(`INSERT INTO ${tableName} (type, category, account, amount, note, date, month, year, img_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
        transaction.type,
        transaction.category,
        transaction.account,
        transaction.amount,
        transaction.note,
        transaction.date,
    ]);
}

export const getTransactions = async (db: SQLiteDatabase): Promise<Transaction[]> => {
    const [results] = await db.executeSql(`SELECT * FROM ${tableName}`);
    const transactions: Transaction[] = [];
    for (let i = 0; i < results.rows.length; i++) {
        const row = results.rows.item(i);
        transactions.push({
            id: row.id,
            type: row.type,
            category: row.category,
            account: row.account,
            amount: row.amount,
            note: row.note,
            date: row.date
        });
    }
    return transactions;
}

export const getTransactionsByDate = async (db: SQLiteDatabase, date: number, month: number, year: number): Promise<Transaction[]> => {
    const [results] = await db.executeSql(`SELECT * FROM ${tableName} WHERE date = ? AND month = ? AND year = ?`, [date, month, year]);
    const transactions: Transaction[] = [];
    for (let i = 0; i < results.rows.length; i++) {
        const row = results.rows.item(i);
        transactions.push({
            id: row.id,
            type: row.type,
            category: row.category,
            account: row.account,
            amount: row.amount,
            note: row.note,
            date: row.date
        });
    }
    return transactions;
}

export const getCategoryById = async (db: SQLiteDatabase, id: number): Promise<Category> => {
    const [results] = await db.executeSql(`SELECT * FROM categories WHERE id = ?`, [id]);
    const row = results.rows.item(0);
    return {
        id: row.id,
        name: row.name,
        image: row.image
    };
}

export const getAllDatesList = async (db: SQLiteDatabase): Promise<number[]> => {
    const [results] = await db.executeSql(`SELECT DISTINCT date FROM ${tableName}`);
    const dates: number[] = [];
    for (let i = 0; i < results.rows.length; i++) {
        const row = results.rows.item(i);
        dates.push(row.date);
    }
    return dates;
}

