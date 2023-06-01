import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

import { Transaction } from '../models/transaction';
import { Category } from '../models/category';
import { Account } from '../models/account';

enablePromise(true);

export type PieData = {
    name: string,
    percentage: number,
    value: number,
    color: string,
}

const tableName = 'transactions';

export const getDBConnection = async (): Promise<SQLiteDatabase> => {
    return openDatabase({ name: 'money-manager.db', location: 'default' });
}

export const createTable = async (db: SQLiteDatabase): Promise<void> => {
    await db.executeSql(`CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT,
        category INTEGER,
        account INTEGER,
        amount INTEGER,
        note TEXT,
        day INTEGER,
        month INTEGER,
        year INTEGER,
        time INTEGER
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
        image TEXT,
        color TEXT
    )`);
}

export const insertTransaction = async (db: SQLiteDatabase, transaction: Transaction): Promise<void> => {
    await db.executeSql(`INSERT INTO ${tableName} (type, category, account, amount, note, day, month, year, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
        transaction.type,
        transaction.category,
        transaction.account,
        transaction.amount,
        transaction.note,
        transaction.day,
        transaction.month,
        transaction.year,
        transaction.time
    ]);
    console.log('inserted');
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
            day: row.day,
            month: row.month,
            year: row.year,
            time: row.time
        });
    }
    return transactions;
}

export const getTransactionsByDate = async (db: SQLiteDatabase, date: number, month: number, year: number): Promise<Transaction[]> => {
    const [results] = await db.executeSql(`SELECT * FROM ${tableName} WHERE day = ? AND month = ? AND year = ?`, [date, month, year]);
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
            day: row.day,
            month: row.month,
            year: row.year,
            time: row.time
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
            day: row.day,
            month: row.month,
            year: row.year,
            time: row.time
        });
    }
    return transactions;
}

export const getTransactionsFromLastMonth = async (db: SQLiteDatabase): Promise<Transaction[]> => {
    const [results] = await db.executeSql(`SELECT * FROM ${tableName} WHERE month = ? AND year = ?`, [new Date().getMonth() + 1, new Date().getFullYear()]);
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
            day: row.day,
            month: row.month,
            year: row.year,
            time: row.time
        });
    }
    return transactions;
}

export const getTransactionsFromLastYear = async (db: SQLiteDatabase): Promise<Transaction[]> => {
    const [results] = await db.executeSql(`SELECT * FROM ${tableName} WHERE year = ?`, [new Date().getFullYear()]);
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
            day: row.day,
            month: row.month,
            year: row.year,
            time: row.time
        });
    }
    return transactions;
}


export const insertCategory = async (db: SQLiteDatabase, category: Category): Promise<void> => {
    await db.executeSql(`INSERT INTO categories (name, image, color) VALUES (?, ?, ?)`, [
        category.name,
        category.image,
        category.color
    ]);
}

export const getCategoryById = async (db: SQLiteDatabase, id: number): Promise<Category> => {
    const [results] = await db.executeSql(`SELECT * FROM categories WHERE id = ?`, [id]);
    const row = results.rows.item(0);
    return {
        id: row.id,
        name: row.name,
        image: row.image,
        color: row.color
    };
}

export const getCategoryByName = async (db: SQLiteDatabase, name: string): Promise<Category> => {
    const [results] = await db.executeSql(`SELECT * FROM categories WHERE name = ?`, [name]);
    const row = results.rows.item(0);
    return {
        id: row.id,
        name: row.name,
        image: row.image,
        color: row.color
    };
}

export const getExistedCategoryByDate = async (db: SQLiteDatabase, fromMonth: number, fromYear: number, toMonth: number, toYear: number): Promise<Category[]> => {
    const [results] = await db.executeSql(`SELECT DISTINCT category FROM ${tableName} WHERE (month >= ? AND year = ?) AND (month <= ? AND year = ?)`, [fromMonth, fromYear, toMonth, toYear]);
    const categories: Category[] = [];
    for (let i = 0; i < results.rows.length; i++) {
        const row = results.rows.item(i);
        categories.push(await getCategoryById(db, row.category));
    }
    return categories;
}

export const getExistedCategoryByTransactionList = async (db: SQLiteDatabase, transactions: Transaction[]): Promise<Category[]> => {
    const categories: Category[] = [];
    for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];
        const category = await getCategoryById(db, transaction.category);
        if (!categories.find(c => c.id === category.id)) {
            categories.push(category);
        }
    }
    return categories;
}

export const getAllCategories = async (db: SQLiteDatabase): Promise<Category[]> => {
    const [results] = await db.executeSql(`SELECT * FROM categories`);
    const categories: Category[] = [];
    for (let i = 0; i < results.rows.length; i++) {
        const row = results.rows.item(i);
        categories.push({
            id: row.id,
            name: row.name,
            image: row.image,
            color: row.color
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

export const getAllAccounts = async (db: SQLiteDatabase): Promise<Account[]> => {
    const [results] = await db.executeSql(`SELECT * FROM accounts`);
    const accounts: Account[] = [];
    for (let i = 0; i < results.rows.length; i++) {
        const row = results.rows.item(i);
        accounts.push({
            id: row.id,
            name: row.name,
            balance: row.balance,
            type: row.type,
            note: row.note
        });
    }
    return accounts;
}

export const getAccountByType = async (db: SQLiteDatabase, type: String): Promise<Account[]> => {
    const [results] = await db.executeSql(`SELECT * FROM accounts WHERE type = ?`, [type]);
    const accounts: Account[] = [];
    for (let i = 0; i < results.rows.length; i++) {
        const row = results.rows.item(i);
        accounts.push({
            id: row.id,
            name: row.name,
            balance: row.balance,
            type: row.type,
            note: row.note
        });
    }
    return accounts;
}

export const getExistedAccountType = async (db: SQLiteDatabase): Promise<string[]> => {
    const [results] = await db.executeSql(`SELECT DISTINCT type FROM accounts`);
    const accounts: string[] = [];
    for (let i = 0; i < results.rows.length; i++) {
        const row = results.rows.item(i);
        accounts.push(row.type);
    }
    return accounts;
}

export const getAllDatesList = async (db: SQLiteDatabase): Promise<number[]> => {
    const [results] = await db.executeSql(`SELECT DISTINCT day FROM ${tableName}`);
    const dates: number[] = [];
    for (let i = 0; i < results.rows.length; i++) {
        const row = results.rows.item(i);
        dates.push(row.day);
    }
    return dates;

}

export const getAllDatesListByMonth = async (db: SQLiteDatabase, month: number, year: number): Promise<Date[]> => {
    const [results] = await db.executeSql(`SELECT DISTINCT day FROM ${tableName} WHERE month = ? AND year = ? ORDER BY day DESC`, [month, year]);
    const dates: Date[] = [];
    for (let i = 0; i < results.rows.length; i++) {
        const row = results.rows.item(i);
        dates.push(new Date(year, month, row.day));
    }
    return dates;
}


export const importTestData = async (db: SQLiteDatabase): Promise<void> => {
    const categories: Category[] = [
        { id: 1, name: 'Food', image: 'https://cdn-icons-png.flaticon.com/512/2922/2922506.png', color: '#FF0000' },
        { id: 2, name: 'Transport', image: 'https://cdn-icons-png.flaticon.com/512/2922/2922506.png', color: '#00FF00' },
        { id: 3, name: 'Shopping', image: 'https://cdn-icons-png.flaticon.com/512/2922/2922506.png', color: '#0000FF' }
    ];

    const accounts: Account[] = [
        { id: 1, name: 'Tiền mặt', balance: 75, type: 'Cash', note: '' },
        { id: 2, name: 'MBBank', balance: 10000, type: 'Bank', note: '' }
    ];

    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    const transactions: Transaction[] = [

        { id: 1, type: 'expense', category: 1, account: 1, amount: 100000, note: 'Mua thịt', day: day, month: month, year: year, time: date.getTime() },
        { id: 2, type: 'expense', category: 2, account: 1, amount: 200000, note: 'Mua xăng', day: day, month: month, year: year, time: date.getTime() },
        { id: 3, type: 'expense', category: 3, account: 1, amount: 300000, note: 'Mua quần áo', day: day, month: month, year: year, time: date.getTime() },
    ];

    for (const category of categories) {
        await insertCategory(db, category);
    }

    for (const account of accounts) {
        await insertAccount(db, account);
    }

    /*for (const transaction of transactions) {
        await insertTransaction(db, transaction);
    }*/
}

export const getPieData = async (db: SQLiteDatabase, time: string, type: string): Promise<PieData[]> => {
    var transactionsList: Transaction[] = [];
    var categoriesList: Category[] = [];

    switch (time) {
        case "Monthly":
            transactionsList = await getTransactionsFromLastMonth(db);
            categoriesList = await getExistedCategoryByTransactionList(db, transactionsList);
            break;
        case "Yearly":
            transactionsList = await getTransactionsFromLastYear(db);
            categoriesList = await getExistedCategoryByTransactionList(db, transactionsList);
            break;
    }

    const pieData: PieData[] = [];
    var total = 0;
    categoriesList.forEach((category) => {
        var sum = 0;
        transactionsList.forEach((transaction) => {
            if (transaction.category == category.id && transaction.type == type) {
                sum += transaction.amount;
            }
        });
        total += sum;
        if (sum > 0)
            pieData.push({
                name: category.name,
                percentage: 0,
                value: sum,
                color: category.color,
            });
    });
    pieData.forEach((data) => {
        data.percentage = data.value / total;
    });
    return pieData;
}

export const clearDatabase = async (db: SQLiteDatabase): Promise<void> => {
    await db.executeSql(`DELETE FROM ${tableName}`);
    await db.executeSql(`DELETE FROM categories`);
    await db.executeSql(`DELETE FROM accounts`);
}

export const dropDatabaseAndRecreate = async (db: SQLiteDatabase): Promise<void> => {
    await db.executeSql(`DROP TABLE IF EXISTS ${tableName}`);
    await db.executeSql(`DROP TABLE IF EXISTS categories`);
    await db.executeSql(`DROP TABLE IF EXISTS accounts`);
}

export const logAllToConsole = async (db: SQLiteDatabase): Promise<void> => {

    const [results] = await db.executeSql(`SELECT * FROM ${tableName}`);
    console.log(`Transactions: ${results.rows.length}`);
    for (let i = 0; i < results.rows.length; i++) {
        const row = results.rows.item(i);
        console.log(`Transaction ${i + 1}: ${JSON.stringify(row)}`);
    }

    const [results2] = await db.executeSql(`SELECT * FROM categories`);
    console.log(`Categories: ${results2.rows.length}`);
    for (let i = 0; i < results2.rows.length; i++) {
        const row = results2.rows.item(i);
        console.log(`Category ${i + 1}: ${JSON.stringify(row)}`);
    }

    const [results3] = await db.executeSql(`SELECT * FROM accounts`);
    console.log(`Accounts: ${results3.rows.length}`);
    for (let i = 0; i < results3.rows.length; i++) {
        const row = results3.rows.item(i);
        console.log(`Account ${i + 1}: ${JSON.stringify(row)}`);
    }
}