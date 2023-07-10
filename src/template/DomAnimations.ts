// const form = document.querySelector("#form") as HTMLFormElement;
const formParent = document.querySelector("#form-parent") as HTMLDivElement;

// animation for opening and closing the form
export const changeState = (btn: HTMLButtonElement): void => {
    if (formParent.classList.contains("grid-rows-[0fr]")) {
        formParent.classList.remove("grid-rows-[0fr]");
        formParent.classList.add("grid-rows-[1fr]");
        btn.textContent = "Close form";
    } else {
        formParent.classList.add("grid-rows-[0fr]");
        formParent.classList.remove("grid-rows-[1fr]");
        btn.textContent = "Open form";
    }
};

// set the values of radio input in form
export const setExpenseOrIncome = (
    expense: HTMLInputElement,
    income: HTMLInputElement,
    value: string
): void => {
    if (value == "income") {
        expense.checked = false;
        income.checked = true;
    } else {
        expense.checked = true;
        income.checked = false;
    }
};

export const displayOverlay = (
    btn: HTMLButtonElement,
    dialog: HTMLDialogElement
): void => {
    btn.addEventListener("click", (): void => {
        dialog.classList.remove("opacity-0");
        dialog.classList.remove("scale-[0]");
    });
};

export const closeOverlay = (
    btn: HTMLButtonElement,
    dialog: HTMLDialogElement
): void => {
    btn.addEventListener("click", (): void => {
        dialog.classList.add("opacity-0");
        dialog.classList.add("scale-[0]");
    });
};
