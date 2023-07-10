interface item {
    id: string;
    description: string;
    date: number[];
    type: string;
    amount: number;
}

export default class ListItem implements item {
    constructor(
        private _id: string = "",
        private _description: string = "",
        private _date: number[] = [],
        private _type: string = "expenses",
        private _amount: number = 0
    ) {}

    // getter and setter for id
    get id(): string {
        return this._id;
    }
    set id(id: string) {
        this._id = id;
    }

    // getter and setter for description
    get description(): string {
        return this._description;
    }
    set description(description: string) {
        this._description = description;
    }

    // getter and setter for date
    get date(): number[] {
        return this._date;
    }
    set date(date: number[]) {
        this._date = date;
    }

    // getter and setter for type
    get type(): string {
        return this._type;
    }
    set type(type: string) {
        this._type = type;
    }

    // getter and setter for amount
    get amount(): number {
        return this._amount;
    }
    set amount(amount: number) {
        this._amount = amount;
    }
}
