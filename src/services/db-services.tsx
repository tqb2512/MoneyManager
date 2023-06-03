import { enablePromise, SQLiteDatabase, openDatabase } from 'react-native-sqlite-storage';
import { Transaction } from '../models/transaction';
import { Category } from '../models/category';
import { Account } from '../models/account';
import { DayBox } from '../models/dayBox';

enablePromise(true);

export const getDBConnection = async (): Promise<SQLiteDatabase> => {
    return openDatabase({ name: 'money-manager.db', location: 'default' });
}

export const createTables = async (db: SQLiteDatabase): Promise<void> => {
    await db.executeSql('CREATE TABLE IF NOT EXISTS categories '+
    '(id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
    'name TEXT, ' +
    'color TEXT)');

    await db.executeSql('CREATE TABLE IF NOT EXISTS accounts '+
    '(id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
    'name TEXT, ' +
    'balance INTEGER, ' +
    'account_group TEXT)');

    await db.executeSql('CREATE TABLE IF NOT EXISTS transactions '+
    '(id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
    'amount INTEGER, ' +
    'day INTEGER, ' +
    'month INTEGER, ' +
    'year INTEGER, ' +
    'note TEXT, ' +
    'type TEXT, ' +
    'categoryId INTEGER, ' +
    'accountId INTEGER, ' +
    'FOREIGN KEY(categoryId) REFERENCES categories(id), ' +
    'FOREIGN KEY(accountId) REFERENCES accounts(id))');
    console.log('Tables created');
}

export const dropTables = async (db: SQLiteDatabase): Promise<void> => {
    await db.executeSql('DROP TABLE IF EXISTS transactions');
    await db.executeSql('DROP TABLE IF EXISTS accounts');
    await db.executeSql('DROP TABLE IF EXISTS categories');
    console.log('Tables dropped');
}

export const importTestData = async (db: SQLiteDatabase): Promise<void> => {
    const accounts: Account[] = [
        { id: 1, name: "Cash", balance: 0, group: "Cash" },
        { id: 2, name: "Bank", balance: 0, group: "Bank" },
    ]

    const categories: Category[] = [
        { id: 1, name: "Food", color: "#FF0000", icon: "" },
        { id: 2, name: "Transport", color: "#00FF00", icon: "" },
    ]

    const transactions: Transaction[] = [
        { id: 1, amount: 100, day: 1, month: 1, year: 2020, note: "Food", type: "Expense", category: categories[0], account: accounts[0] },
        { id: 2, amount: 200, day: 1, month: 1, year: 2020, note: "Transport", type: "Expense", category: categories[1], account: accounts[0] },
        { id: 3, amount: 300, day: 1, month: 1, year: 2020, note: "Food", type: "Expense", category: categories[0], account: accounts[1] },
    ]

    for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        await db.executeSql('INSERT INTO accounts (id, name, balance, account_group) VALUES (?, ?, ?, ?)', [account.id, account.name, account.balance, account.group]);
    }

    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        await db.executeSql('INSERT INTO categories (id, name, color) VALUES (?, ?, ?)', [category.id, category.name, category.color]);
    }

    for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];
        await db.executeSql('INSERT INTO transactions (id, amount, day, month, year, note, type, categoryId, accountId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [transaction.id, transaction.amount, transaction.day, transaction.month, transaction.year, transaction.note, transaction.type, transaction.category.id, transaction.account.id]);
    }
    console.log('Test data imported');
}

export const consoleLogDB = async (db: SQLiteDatabase): Promise<void> => {
    const [accounts, categories, transactions] = await Promise.all([
        db.executeSql('SELECT * FROM accounts'),
        db.executeSql('SELECT * FROM categories'),
        db.executeSql('SELECT * FROM transactions'),
    ]);

    console.log(accounts[0].rows.raw());
    console.log(categories[0].rows.raw());
    console.log(transactions[0].rows.raw());
}

export const insertTransaction = async (db: SQLiteDatabase, transaction: Transaction): Promise<void> => {
    await db.executeSql('INSERT INTO transactions (amount, day, month, year, note, type, categoryId, accountId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [transaction.amount, transaction.day, transaction.month, transaction.year, transaction.note, transaction.type, transaction.category.id, transaction.account.id]);
}

export const updateTransaction = async (db: SQLiteDatabase, transaction: Transaction): Promise<void> => {
    await db.executeSql('UPDATE transactions SET amount = ?, day = ?, month = ?, year = ?, note = ?, type = ?, categoryId = ?, accountId = ? WHERE id = ?', [transaction.amount, transaction.day, transaction.month, transaction.year, transaction.note, transaction.type, transaction.category.id, transaction.account.id, transaction.id]);
}

export const deleteTransaction = async (db: SQLiteDatabase, transaction: Transaction): Promise<void> => {
    await db.executeSql('DELETE FROM transactions WHERE id = ?', [transaction.id]);
}

export const insertAccount = async (db: SQLiteDatabase, account: Account): Promise<void> => {
    await db.executeSql('INSERT INTO accounts (name, balance, account_group) VALUES (?, ?, ?)', [account.name, account.balance, account.group]);
}

export const updateAccount = async (db: SQLiteDatabase, account: Account): Promise<void> => {
    await db.executeSql('UPDATE accounts SET name = ?, balance = ?, account_group = ? WHERE id = ?', [account.name, account.balance, account.group, account.id]);
}

export const deleteAccount = async (db: SQLiteDatabase, account: Account): Promise<void> => {
    await db.executeSql('DELETE FROM accounts WHERE id = ?', [account.id]);
}

export const insertCategory = async (db: SQLiteDatabase, category: Category): Promise<void> => {
    await db.executeSql('INSERT INTO categories (name, color) VALUES (?, ?)', [category.name, category.color]);
}

export const updateCategory = async (db: SQLiteDatabase, category: Category): Promise<void> => {
    await db.executeSql('UPDATE categories SET name = ?, color = ? WHERE id = ?', [category.name, category.color, category.id]);
}

export const deleteCategory = async (db: SQLiteDatabase, category: Category): Promise<void> => {
    await db.executeSql('DELETE FROM categories WHERE id = ?', [category.id]);
}

export const getTransactionsFromDay = async (db: SQLiteDatabase, day: number, month: number, year: number): Promise<Transaction[]> => {
    const [result] = await db.executeSql('SELECT transactions.id as t_id , transactions.amount as t_amount, transactions.day as t_day, transactions.month as t_month, transactions.year as t_year, transactions.note as t_note, transactions.type as t_type, transactions.categoryId as t_categoryId, transactions.accountId as t_accountId, categories.id as c_id, categories.name as c_name, categories.color as c_color, accounts.id as a_id, accounts.name as a_name, accounts.balance as a_balance, accounts.account_group as a_account_group FROM transactions INNER JOIN categories ON transactions.categoryId = categories.id INNER JOIN accounts ON transactions.accountId = accounts.id WHERE transactions.day = ? AND transactions.month = ? AND transactions.year = ?', [day, month, year]);
    let transactions: Transaction[] = [];
    for (let i = 0; i < result.rows.length; i++) {
        const row = result.rows.item(i);
        const transaction: Transaction = {
            id: row.t_id,
            amount: row.t_amount,
            day: row.t_day,
            month: row.t_month,
            year: row.t_year,
            note: row.t_note,
            type: row.t_type,
            category: {
                id: row.c_id,
                name: row.c_name,
                color: row.c_color,
                icon: "",
            },
            account: {
                id: row.a_id,
                name: row.a_name,
                balance: row.a_balance,
                group: row.a_account_group,
            },
        }
        transactions.push(transaction);
    }
    return transactions;
}

export const getDistinctDays = async (db: SQLiteDatabase, month: number, year: number): Promise<number[]> => {
    const [result] = await db.executeSql('SELECT DISTINCT day FROM transactions WHERE month = ? AND year = ? ORDER BY day DESC', [month, year]);
    let days: number[] = [];
    for (let i = 0; i < result.rows.length; i++) {
        const row = result.rows.item(i);
        days.push(row.day);
    }
    return days;
}

export const getDayBoxFromMonthYear = async (db: SQLiteDatabase, month: number, year: number): Promise<DayBox[]> => {
    const days = await getDistinctDays(db, month, year);
    let dateModels: DayBox[] = [];
    for (let i = 0; i < days.length; i++) {
        const day = days[i];
        const transactions = await getTransactionsFromDay(db, day, month, year);
        let totalIncome = 0;
        let totalExpense = 0;
        for (let j = 0; j < transactions.length; j++) {
            const transaction = transactions[j];
            if (transaction.type === 'income') {
                totalIncome += transaction.amount;
            } else {
                totalExpense += transaction.amount;
            }
        }
        const dateModel: DayBox = {
            day: day,
            month: month,
            year: year,
            totalIncome: totalIncome,
            totalExpense: totalExpense,
            transactions: transactions,
        }
        dateModels.push(dateModel);
    }
    return dateModels;
}

export const getCategories = async (db: SQLiteDatabase): Promise<Category[]> => {
    const [result] = await db.executeSql('SELECT * FROM categories');
    let categories: Category[] = [];
    for (let i = 0; i < result.rows.length; i++) {
        const row = result.rows.item(i);
        const category: Category = {
            id: row.id,
            name: row.name,
            color: row.color,
            icon: row.icon,
        }
        categories.push(category);
    }
    return categories;
}

export const getAccounts = async (db: SQLiteDatabase): Promise<Account[]> => {
    const [result] = await db.executeSql('SELECT * FROM accounts');
    let accounts: Account[] = [];
    for (let i = 0; i < result.rows.length; i++) {
        const row = result.rows.item(i);
        const account: Account = {
            id: row.id,
            name: row.name,
            balance: row.balance,
            group: row.account_group,
        }
        accounts.push(account);
    }
    return accounts;
}
