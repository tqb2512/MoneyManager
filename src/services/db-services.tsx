import { enablePromise, SQLiteDatabase, openDatabase } from 'react-native-sqlite-storage';
import { Transaction } from '../models/transaction';
import { Category } from '../models/category';
import { Account } from '../models/account';
import { DayBox } from '../models/dayBox';
import { PieData } from '../models/pieData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Currency } from '../models/currency';

enablePromise(true);

export const getDBConnection = async (): Promise<SQLiteDatabase> => {
    return openDatabase({ name: 'money-manager.db', location: 'default' });
}

export const createTables = async (db: SQLiteDatabase): Promise<void> => {
    await db.executeSql('CREATE TABLE IF NOT EXISTS categories ' +
        '(id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'name TEXT, ' +
        'color TEXT)');

    await db.executeSql('CREATE TABLE IF NOT EXISTS accounts ' +
        '(id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'name TEXT, ' +
        'balance INTEGER)');

    await db.executeSql('CREATE TABLE IF NOT EXISTS transactions ' +
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
        { id: 1, name: "Cash", balance: 0 },
        { id: 2, name: "Bank", balance: 0 },
        { id: 3, name: "Bank 1", balance: 0 },
        { id: 4, name: "Bank 2", balance: 0 },
        { id: 5, name: "Bank 3", balance: 0 },
        { id: 6, name: "Bank 4", balance: 0 },
        { id: 7, name: "Bank 5", balance: 0 },
    ]

    const categories: Category[] = [
        { id: 1, name: "Food", color: "#FF9B9B", icon: "" },
        { id: 2, name: "Transport", color: "#FFD6A5", icon: "" },
        { id: 3, name: "Play", color: "#FFFEC4", icon: "" },
        { id: 4, name: "Watch", color: "#CBFFA9", icon: "" },
        { id: 5, name: "Study", color: "#C4DFDF", icon: "" },
        { id: 6, name: "Entertainment", color: "#BA90C6", icon: "" },
        { id: 7, name: "Salary", color: "#867070", icon: "" },
    ]

    const transactions: Transaction[] = [

    ]

    for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        await db.executeSql('INSERT INTO accounts (id, name, balance) VALUES (?, ?, ?)', [account.id, account.name, account.balance]);
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

export const insertTransactions = async (db: SQLiteDatabase, transactions: Transaction[]): Promise<void> => {
    for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];
        await insertTransaction(db, transaction);
    }
}

export const updateAccountBalanceFormTransactions = async (db: SQLiteDatabase, account: Account): Promise<void> => {
    const [resultIncome] = await db.executeSql('SELECT SUM(amount) AS total FROM transactions WHERE accountId = ? AND type = ?', [account.id, 'income']);
    const [resultExpense] = await db.executeSql('SELECT SUM(amount) AS total FROM transactions WHERE accountId = ? AND type = ?', [account.id, 'expense']);
    const total = (resultIncome.rows.raw()[0].total || 0) - (resultExpense.rows.raw()[0].total || 0);
    console.log(total);
    await db.executeSql('UPDATE accounts SET balance = ? WHERE id = ?', [total, account.id]);
}

export const updateTransaction = async (db: SQLiteDatabase, transaction: Transaction, oldTransaction: Transaction): Promise<void> => {
    await db.executeSql('UPDATE transactions SET amount = ?, day = ?, month = ?, year = ?, note = ?, type = ?, categoryId = ?, accountId = ? WHERE id = ?', [transaction.amount, transaction.day, transaction.month, transaction.year, transaction.note, transaction.type, transaction.category.id, transaction.account.id, transaction.id]);
    if (transaction.account.id !== oldTransaction.account.id) {
        await updateAccountBalanceFormTransactions(db, transaction.account);
        await updateAccountBalanceFormTransactions(db, oldTransaction.account);
    } else {
        await updateAccountBalanceFormTransactions(db, transaction.account);
    }
}

export const deleteTransaction = async (db: SQLiteDatabase, transaction: Transaction): Promise<void> => {
    await db.executeSql('DELETE FROM transactions WHERE id = ?', [transaction.id]);
}

export const getTransactions = async (db: SQLiteDatabase): Promise<Transaction[]> => {
    const [result] = await db.executeSql('SELECT * FROM transactions inner join accounts on transactions.accountId = accounts.id inner join categories on transactions.categoryId = categories.id');
    const transactions: Transaction[] = [];
    for (let i = 0; i < result.rows.length; i++) {
        const row = result.rows.item(i);
        const account: Account = {
            id: row.accountId,
            name: row.name,
            balance: row.balance,
        };
        const category: Category = {
            id: row.categoryId,
            name: row.name,
            color: row.color,
            icon: row.icon,
        };
        transactions.push({
            id: row.id,
            amount: row.amount,
            day: row.day,
            month: row.month,
            year: row.year,
            note: row.note,
            type: row.type,
            account,
            category,
        });
    }
    return transactions;
}

export const insertAccount = async (db: SQLiteDatabase, account: Account): Promise<void> => {
    await db.executeSql('INSERT INTO accounts (name, balance) VALUES (?, ?)', [account.name, account.balance]);
}

export const insertAccounts = async (db: SQLiteDatabase, accounts: Account[]): Promise<void> => {
    for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        await db.executeSql('INSERT INTO accounts (name, balance) VALUES (?, ?)', [account.name, account.balance]);
    }
}

export const updateAccountBalance = async (db: SQLiteDatabase, account: Account): Promise<void> => {
    await db.executeSql('UPDATE accounts SET balance = ? WHERE id = ?', [account.balance, account.id]);
}

export const updateAccount = async (db: SQLiteDatabase, account: Account): Promise<void> => {
    await db.executeSql('UPDATE accounts SET name = ?, balance = ? WHERE id = ?', [account.name, account.balance, account.id]);
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
    const [result] = await db.executeSql('SELECT transactions.id as t_id , transactions.amount as t_amount, transactions.day as t_day, transactions.month as t_month, transactions.year as t_year, transactions.note as t_note, transactions.type as t_type, transactions.categoryId as t_categoryId, transactions.accountId as t_accountId, categories.id as c_id, categories.name as c_name, categories.color as c_color, accounts.id as a_id, accounts.name as a_name, accounts.balance as a_balance FROM transactions INNER JOIN categories ON transactions.categoryId = categories.id INNER JOIN accounts ON transactions.accountId = accounts.id WHERE transactions.day = ? AND transactions.month = ? AND transactions.year = ?', [day, month, year]);
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
            },
        }
        transactions.push(transaction);
    }
    return transactions;
}

export const getTransactionsFromDayWithAccount = async (db: SQLiteDatabase, day: number, month: number, year: number, account: Account): Promise<Transaction[]> => {
    const [result] = await db.executeSql('SELECT transactions.id as t_id , transactions.amount as t_amount, transactions.day as t_day, transactions.month as t_month, transactions.year as t_year, transactions.note as t_note, transactions.type as t_type, transactions.categoryId as t_categoryId, transactions.accountId as t_accountId, categories.id as c_id, categories.name as c_name, categories.color as c_color, accounts.id as a_id, accounts.name as a_name, accounts.balance as a_balance FROM transactions INNER JOIN categories ON transactions.categoryId = categories.id INNER JOIN accounts ON transactions.accountId = accounts.id WHERE transactions.day = ? AND transactions.month = ? AND transactions.year = ? AND transactions.accountId = ?', [day, month, year, account.id]);
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


export const getDayBoxFromDate = async (db: SQLiteDatabase, date: Date): Promise<DayBox> => {
    let dateModel: DayBox = {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        totalIncome: 0,
        totalExpense: 0,
        transactions: [],
    }
    const transactions = await getTransactionsFromDay(db, date.getDate(), date.getMonth() + 1, date.getFullYear());
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
    dateModel.totalIncome = totalIncome;
    dateModel.totalExpense = totalExpense;
    dateModel.transactions = transactions;
    return dateModel;
}

export const getDayBoxByAccount = async (db: SQLiteDatabase, account: Account): Promise<DayBox[]> => {
    const [result] = await db.executeSql('SELECT DISTINCT day, month, year FROM transactions WHERE accountId = ? ORDER BY day DESC', [account.id]);
    let days: Date[] = [];
    for (let i = 0; i < result.rows.length; i++) {
        const row = result.rows.item(i);
        const date = new Date(row.year, row.month, row.day);
        days.push(date);
    }
    let dateModels: DayBox[] = [];
    for (let i = 0; i < days.length; i++) {
        const day = days[i];
        const transactions = await getTransactionsFromDayWithAccount(db, day.getDate(), day.getMonth(), day.getFullYear(), account);
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
            day: day.getDate(),
            month: day.getMonth(),
            year: day.getFullYear(),
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
        }
        accounts.push(account);
    }
    return accounts;
}

export const changeAllTransactionsCurrency = async (db: SQLiteDatabase, oldCurrency: string, newCurrency: string): Promise<void> => {
    fetch("https://raw.githubusercontent.com/fawazahmed0/currency-api/1/latest/currencies/" + oldCurrency.toLowerCase() + "/" + newCurrency.toLowerCase() + ".json")
        .then(response => response.json())
        .then(data => {
            const rate = data[newCurrency.toLowerCase()];
            //round to 2 decimal places
            db.executeSql('UPDATE transactions SET amount = ROUND(amount * ?, 2)', [rate]);

        });
}

export const changeAllAccountsCurrency = async (db: SQLiteDatabase, oldCurrency: string, newCurrency: string): Promise<void> => {
    fetch("https://raw.githubusercontent.com/fawazahmed0/currency-api/1/latest/currencies/" + oldCurrency.toLowerCase() + "/" + newCurrency.toLowerCase() + ".json")
        .then(response => response.json())
        .then(data => {
            const rate = data[newCurrency.toLowerCase()];
            //round to 2 decimal places
            db.executeSql('UPDATE accounts SET balance = ROUND(balance * ?, 2)', [rate]);
        });
}

export const getPieDataByMonth = async (db: SQLiteDatabase, month: number, year: number, type: string): Promise<PieData[]> => {
    const [result] = await db.executeSql('SELECT categoryId, categories.name, categories.color, SUM(amount) as sum FROM transactions inner join categories on transactions.categoryId = categories.id WHERE month = ? AND year = ? AND type = ? GROUP BY categoryId', [month, year, type]);
    let pieData: PieData[] = [];
    for (let i = 0; i < result.rows.length; i++) {
        const row = result.rows.item(i);
        const category: Category = {
            id: row.categoryId,
            name: row.name,
            color: row.color,
            icon: '',
        }
        const pieDataItem: PieData = {
            category: category,
            percentage: 0,
            value: row.sum,
        }
        pieData.push(pieDataItem);
    }
    let total = 0;
    for (let i = 0; i < pieData.length; i++) {
        total += pieData[i].value;
    }
    for (let i = 0; i < pieData.length; i++) {
        pieData[i].percentage = pieData[i].value / total;
    }
    return pieData;
}

export type ChartData = {
    name: string,
    percentage: number,
    value: number,
    color: string,
}

export const getChartDataByMonth = async (db: SQLiteDatabase, month: number, year: number, type: string): Promise<ChartData[]> => {
    let pieData: PieData[] = await getPieDataByMonth(db, month, year, type);
    let chartData: ChartData[] = [];
    for (let i = 0; i < pieData.length; i++) {
        const pieDataItem = pieData[i];
        const chartDataItem: ChartData = {
            name: pieDataItem.category.name,
            percentage: pieDataItem.percentage,
            value: pieDataItem.value,
            color: pieDataItem.category.color,
        }
        chartData.push(chartDataItem);
    }
    return chartData;
}

export const getPieDataByYear = async (db: SQLiteDatabase, year: number, type: string): Promise<PieData[]> => {
    const [result] = await db.executeSql('SELECT categoryId, categories.name, categories.color, SUM(amount) as sum FROM transactions inner join categories on transactions.categoryId = categories.id WHERE year = ? AND type = ? GROUP BY categoryId', [year, type]);
    let pieData: PieData[] = [];
    for (let i = 0; i < result.rows.length; i++) {
        const row = result.rows.item(i);
        const category: Category = {
            id: row.categoryId,
            name: row.name,
            color: row.color,
            icon: '',
        }
        const pieDataItem: PieData = {
            category: category,
            percentage: 0,
            value: row.sum,
        }
        pieData.push(pieDataItem);
    }
    let total = 0;
    for (let i = 0; i < pieData.length; i++) {
        total += pieData[i].value;
    }
    for (let i = 0; i < pieData.length; i++) {
        pieData[i].percentage = pieData[i].value / total;
    }
    return pieData;
}

export const getChartDataByYear = async (db: SQLiteDatabase, year: number, type: string): Promise<ChartData[]> => {
    let pieData: PieData[] = await getPieDataByYear(db, year, type);
    let chartData: ChartData[] = [];
    for (let i = 0; i < pieData.length; i++) {
        const pieDataItem = pieData[i];
        const chartDataItem: ChartData = {
            name: pieDataItem.category.name,
            percentage: pieDataItem.percentage,
            value: pieDataItem.value,
            color: pieDataItem.category.color,
        }
        chartData.push(chartDataItem);
    }
    return chartData;
}

export const getEventsFromMonth = async (db: SQLiteDatabase, month: number, year: number): Promise<Event[]> => {
    let events: Event[] = [];
    let currency: Currency;
    const getCurrencyValue = async () => {
        const value = await AsyncStorage.getItem('currency')
        if (value !== null) {
            currency = JSON.parse(value)
        }
    }
    await getCurrencyValue();

    const [days] = await db.executeSql('SELECT DISTINCT day FROM transactions WHERE month = ? AND year = ?', [month, year]);
    for (let i = 0; i < days.rows.length; i++) {
        const [income] = await db.executeSql('SELECT SUM(amount) as sum FROM transactions WHERE month = ? AND year = ? AND day = ? AND type = ?', [month, year, days.rows.item(i).day, 'income']);
        const [expense] = await db.executeSql('SELECT SUM(amount) as sum FROM transactions WHERE month = ? AND year = ? AND day = ? AND type = ?', [month, year, days.rows.item(i).day, 'expense']);

        if (income.rows.item(0).sum != null) {
            const event: Event = {
                start: new Date(year, month - 1, days.rows.item(i).day),
                end: new Date(year, month - 1, days.rows.item(i).day),
                title: income.rows.item(0).sum + ' ' + currency.symbol,
                color: '#7DCEA0',
            }
            events.push(event);
        }

        if (expense.rows.item(0).sum != null) {
            const event: Event = {
                start: new Date(year, month - 1, days.rows.item(i).day),
                end: new Date(year, month - 1, days.rows.item(i).day),
                title: expense.rows.item(0).sum + ' ' + currency.symbol,
                color: '#F1948A',
            }
            events.push(event);
        }
    }
    return events;
}

export const firstLoad = async (db: SQLiteDatabase) => {

    const categories: Category[] = [
        { id: 1, name: "Food", color: "#FF9B9B", icon: "" },
        { id: 2, name: "Transport", color: "#FFD6A5", icon: "" },
        { id: 3, name: "Play", color: "#FFFEC4", icon: "" },
        { id: 4, name: "Watch", color: "#CBFFA9", icon: "" },
        { id: 5, name: "Study", color: "#C4DFDF", icon: "" },
        { id: 6, name: "Entertainment", color: "#BA90C6", icon: "" },
        { id: 7, name: "Salary", color: "#867070", icon: "" },
    ]

    const [result] = await db.executeSql('SELECT * FROM categories');
    if (result.rows.length === 0) {
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            await db.executeSql('INSERT INTO categories (id, name, color) VALUES (?, ?, ?)', [category.id, category.name, category.color]);
        }
    }
}

export const dropTransactionsAndAccounts = async (db: SQLiteDatabase) => {
    await db.executeSql('DROP TABLE transactions');
    await db.executeSql('DROP TABLE accounts');
}
