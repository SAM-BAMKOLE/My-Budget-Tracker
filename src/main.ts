import "./index.css";
import {
    changeState,
    setExpenseOrIncome,
    displayOverlay,
    closeOverlay,
} from "./template/DomAnimations";
// import ListItem from "./model/ListItem";
import FullList from "./model/FullList";
import Template from "./template/Templates";
import { formControl } from "./template/FormControl";

const initApp = (): void => {
    const toggleButton = document.getElementById(
        "form-toggle"
    ) as HTMLButtonElement;
    const expense = document.getElementById("expense") as HTMLInputElement;
    const income = document.getElementById("income") as HTMLInputElement;
    const showFormBtn = document.getElementById(
        "show-dialog"
    ) as HTMLButtonElement;
    const closeDialog = document.getElementById(
        "close-dialog"
    ) as HTMLButtonElement;
    const dialogContainer = document.querySelector(
        "#dialog-container"
    ) as HTMLDialogElement;
    const dialogOverlay = document.querySelector(
        "#dialog-overlay"
    ) as HTMLDivElement;

    // const expenseLabel = document.getElementById(
    //     "expense-label"
    // ) as HTMLLabelElement;
    // const incomeLabel = document.getElementById(
    //     "income-label"
    // ) as HTMLLabelElement;
    /*
    const expenseParent = <HTMLDivElement>(
        document.getElementById("expense-parent")
    );
    const incomeParent = <HTMLLabelElement>(
        document.getElementById("income-parent")
    );
*/
    displayOverlay(showFormBtn, dialogContainer);
    closeOverlay(closeDialog, dialogContainer);
    dialogOverlay.addEventListener("click", (): void => {
        closeOverlay(closeDialog, dialogContainer);
    });
    // let radioValue: string;

    toggleButton.addEventListener("click", () => {
        changeState(toggleButton);
    });

    expense.addEventListener("click", (): void => {
        setExpenseOrIncome(expense, income, "expense");
        // radioValue = "expense";
    });
    income.addEventListener("click", () => {
        setExpenseOrIncome(expense, income, "income");
        // radioValue = "income";
    });

    const template = Template.instance;
    const fullList = FullList.instance;

    // get form data
    const form = document.getElementById("form") as HTMLFormElement;
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        formControl(fullList, template);
        template.updateBudget(fullList);
    });

    // event to clear all budget
    const clearBtn = document.getElementById(
        "delete-all-items"
    ) as HTMLButtonElement;
    clearBtn.addEventListener("click", () => {
        fullList.clearList();
        template.clear();
        dialogContainer.classList.add("opacity-0");
        dialogContainer.classList.add("scale-[0]");
        template.updateBudget(fullList);
    });
    // const clearItems
    fullList.load();
    template.render(fullList);
    template.updateBudget(fullList);
};

document.addEventListener("DOMContentLoaded", initApp);
