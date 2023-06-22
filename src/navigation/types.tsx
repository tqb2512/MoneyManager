import { NavigatorScreenParams } from "@react-navigation/native";
import { CompositeScreenProps } from "@react-navigation/core";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Transaction } from "../models/transaction";
import { Account } from "../models/account";

export type RootStackParamList = {
    bottom_bar: NavigatorScreenParams<BottomTabParamList>;
    home_top_bar: NavigatorScreenParams<HomeTopBarParamList>;
    transaction_detail: { transaction: Transaction };
    add_transaction: undefined;
    add_account: undefined;
    income_stats: undefined;
    expenses_stats: undefined;
    account_detail: { account: Account };
    edit_account: { account: Account };
    change_currency: undefined;
    settings: undefined;
}

export type BottomTabParamList = {
    bottom_bar_home: undefined;
    bottom_bar_accounts: undefined;
    bottom_bar_addTransaction: undefined;
    bottom_bar_stats: undefined;
    bottom_bat_settings: undefined;
}

export type HomeTopBarParamList = {
    home_top_bar_daily: undefined;
    home_top_bar_celandar: undefined;
}

export type StatsTopBarParamList = {
    stats_top_bar_income: undefined;
    stats_top_bar_expense: undefined;
}

export type DailyScreenProp = NativeStackScreenProps<
    HomeTopBarParamList,
    'home_top_bar_daily'
>;

export type CelandarScreenProp = NativeStackScreenProps<
    HomeTopBarParamList,
    'home_top_bar_celandar'
>;

export type TransactionDetailProp = NativeStackScreenProps<
    RootStackParamList,
    'transaction_detail'
>;

export type AccountDetailProp = NativeStackScreenProps<
    RootStackParamList,
    'account_detail'
>;

export type EditAccountProp = NativeStackScreenProps<
    RootStackParamList,
    'edit_account'
>;

export type SettingsScreenProp = NativeStackScreenProps<
    RootStackParamList,
    'settings'
>;

export type ChangeCurrencyProp = NativeStackScreenProps<
    RootStackParamList,
    'change_currency'
>;

export type AddTransactionProp = NativeStackScreenProps<
    RootStackParamList,
    'add_transaction'
>;

export type AddAccountProp = NativeStackScreenProps<
    RootStackParamList,
    'add_account'
>;

export type IncomeStatsProp = NativeStackScreenProps<
    StatsTopBarParamList,
    'stats_top_bar_income'
>;

export type ExpenseStatsProp = NativeStackScreenProps<
    StatsTopBarParamList,
    'stats_top_bar_expense'
>;

export type AccountsScreenProp = CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, 'bottom_bar_accounts'>,
    NativeStackScreenProps<RootStackParamList>
>;


export type HomeScreenProp = CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, 'bottom_bar_home'>,
    NativeStackScreenProps<RootStackParamList>
>;

export type StatsScreenProp = CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, 'bottom_bar_stats'>,
    NativeStackScreenProps<RootStackParamList>
>;

