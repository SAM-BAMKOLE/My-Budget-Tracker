import FullList from "../model/FullList";
import ListItem from "../model/ListItem";
import Template from "./Templates";

export const formControl = (fullList: FullList, template: Template) => {
    // const weekdays = ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"];
    const income = <HTMLInputElement>document.getElementById("income");
    // const expense = <HTMLInputElement>document.getElementById("expense");
    const description = document.getElementById(
        "description"
    ) as HTMLInputElement;
    const amount = document.getElementById("amount") as HTMLInputElement;
    let type: string;
    if (income.checked) type = "income";
    else type = "expense";

    const itemId = fullList.list.length
        ? Number(fullList.list[fullList.list.length - 1].id) + 1
        : 1;

    let getDate: Date = new Date();
    // let indexDay: number = getDate.getDay();
    // let day: string = weekdays[indexDay + 1];
    let date: number = getDate.getDate();
    let month: number = getDate.getMonth() + 1;
    let year: number = getDate.getFullYear();

    const newItem = new ListItem(
        itemId.toString(),
        description.value,
        [date, month, year],
        type,
        Number(amount.value)
    );

    fullList.addItem(newItem);

    template.render(fullList);

    description.value = "";
    amount.value = "";
};
