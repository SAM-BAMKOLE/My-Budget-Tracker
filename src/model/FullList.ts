import ListItem from "./ListItem";

interface layout {
    list: ListItem[];
    save(): void;
    clearList(): void;
    load(): void;
    addItem(item: ListItem): void;
    removeItem(id: string): void;
    getAllIncome(): number;
    getAllExpense(): number;
    getBudget(): number;
}

export default class FullList implements layout {
    static instance = new FullList();
    private constructor(private _list: ListItem[] = []) {}

    get list(): ListItem[] {
        return this._list;
    }
    load(): void {
        const storedList: string | null = localStorage.getItem("budgets");
        if (typeof storedList !== "string") return;

        const parsedList: {
            _id: string;
            _description: string;
            _date: number[];
            _type: string;
            _amount: number;
        }[] = JSON.parse(storedList);

        parsedList.forEach((itemObj) => {
            const newListItem = new ListItem(
                itemObj._id,
                itemObj._description,
                itemObj._date,
                itemObj._type,
                itemObj._amount
            );
            FullList.instance.addItem(newListItem);
        });
    }
    save() {
        localStorage.setItem("budgets", JSON.stringify(this._list));
    }
    clearList() {
        this._list = [];
        this.save();
    }
    addItem(item: ListItem): void {
        this._list.push(item);
        this.save();
    }
    removeItem(id: string): void {
        this._list = this._list.filter((item) => item.id !== id);
        this.save();
    }
    getAllIncome(): number {
        let allInc = this._list.filter((val) => val.type === "income");
        let list = allInc.reduce((acc, val): number => acc + val.amount, 0);
        return list;
    }
    getAllExpense(): number {
        let allExp = this._list.filter((val) => val.type === "expense");
        let list = allExp.reduce((acc, val): number => acc + val.amount, 0);
        return list;
    }
    getBudget(): number {
        return this.getAllIncome() - this.getAllExpense();
    }
}
