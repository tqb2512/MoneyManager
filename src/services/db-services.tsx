import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

import { Transaction } from '../models/transaction';

enablePromise(true);

const tableName = 'transactions';

export const getDBConnection = async (): Promise<SQLiteDatabase> => {
    return openDatabase({ name: 'money-manager.db', location: 'default' });
}

export const createTable = async (db: SQLiteDatabase): Promise<void> => {
    await db.executeSql(`CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT,
        category TEXT,
        account TEXT,
        amount REAL,
        note TEXT,
        date INTEGER,
        month INTEGER,
        year INTEGER,
        img_url TEXT
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
        transaction.month,
        transaction.year,
        transaction.img_url
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
            date: row.date,
            month: row.month,
            year: row.year,
            img_url: row.img_url
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
            date: row.date,
            month: row.month,
            year: row.year,
            img_url: row.img_url
        });
    }
    return transactions;
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