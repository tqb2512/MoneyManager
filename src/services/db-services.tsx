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
        date INTEGER
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
    await db.executeSql(`INSERT INTO ${tableName} (type, category, account, amount, note, date) VALUES (?, ?, ?, ?, ?, ?)`, [
        transaction.type,
        transaction.category.id,
        transaction.account.id,
        transaction.amount,
        transaction.note,
        transaction.date
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

export const getTransactionsByMonth = async (db: SQLiteDatabase, month: number, year: number): Promise<Transaction[]> => {
    const [results] = await db.executeSql(`SELECT * FROM ${tableName} WHERE month = ? AND year = ?`, [month, year]);
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

export const insertCategory = async (db: SQLiteDatabase, category: Category): Promise<void> => {
    await db.executeSql(`INSERT INTO categories (name, image) VALUES (?, ?)`, [
        category.name,
        category.image
    ]);
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

export const getAllCategories = async (db: SQLiteDatabase): Promise<Category[]> => {
    const [results] = await db.executeSql(`SELECT * FROM categories`);
    const categories: Category[] = [];
    for (let i = 0; i < results.rows.length; i++) {
        const row = results.rows.item(i);
        categories.push({
            id: row.id,
            name: row.name,
            image: row.image
        });
    }
    return categories;
}

export const insertAccount = async (db: SQLiteDatabase, account: Account): Promise<void> => {
    await db.executeSql(`INSERT INTO accounts (name, balance, type, note) VALUES (?, ?, ?, ?)`, [
        account.name,
        account.balance,
        account.type,
        account.note
    ]);
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

export const importTestData = async (db: SQLiteDatabase): Promise<void> => {
    const categories: Category[] = [
        { id: 1, name: 'Food', image: 'food' },
        { id: 2, name: 'Transport', image: 'transport' },
        { id: 3, name: 'Shopping', image: 'shopping' }
    ];

    const accounts: Account[] = [
        { id: 1, name: 'Cash', balance: 1000000, type: 'cash', note: '' },
        { id: 2, name: 'Bank', balance: 1000000, type: 'bank', note: '' }
    ];

    const transactions: Transaction[] = [
        { id: 1, type: 'expense', category: categories[0], account: accounts[0], amount: 100000, note: '', date: 1 },
        { id: 2, type: 'expense', category: categories[1], account: accounts[0], amount: 200000, note: '', date: 1 },
        { id: 3, type: 'expense', category: categories[2], account: accounts[0], amount: 300000, note: '', date: 1 },
    ];

    for (const category of categories) {
        await insertCategory(db, category);
    }

    for (const account of accounts) {
        await insertAccount(db, account);
    }

    for (const transaction of transactions) {
        await insertTransaction(db, transaction);
    }
}