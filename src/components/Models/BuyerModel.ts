import { IBuyer, TPayment } from '../../types';

export class BuyerModel {
    protected payment: TPayment | null = null;
    protected address: string = '';
    protected phone: string = '';
    protected email: string = '';

    setBuyer(data: Partial<IBuyer>): void {
        Object.assign(this, data);
    }
    getBuyer(): {
        payment: TPayment | null;
        address: string;
        phone: string;
        email: string;
    } {
        return {
            payment: this.payment,
            address: this.address,
            phone: this.phone,
            email: this.email
        };
    }
    clear(): void {
        this.payment = null;
        this.address = '';
        this.phone = '';
        this.email = '';
    }
    validate(): Partial<Record<keyof IBuyer, string>> {
        const errors: Partial<Record<keyof IBuyer, string>> = {};
        if (!this.payment) {
            errors.payment = 'Не выбран вид оплаты';
        }
        if (!this.address) {
            errors.address = 'Укажите адрес';
        }
        if (!this.phone) {
            errors.phone = 'Укажите телефон';
        }
        if (!this.email) {
            errors.email = 'Укажите email';
        }
        return errors;
    }
}