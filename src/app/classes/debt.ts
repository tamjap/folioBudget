export class Debt {
    id: number;
    userID: number;
    description: string;
    amount: number;
    dueDay: number[];
    balance: number;
    interest: number;
    extraPayment: number;
    paidOff: boolean;
}