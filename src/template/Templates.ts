import FullList from "../model/FullList";

interface template {
    ul: HTMLUListElement;
    budget: HTMLSpanElement;
    clear(): void;
    render(fullList: FullList): void;
    updateBudget(fullList: FullList): void;
}

export default class Template implements template {
    ul: HTMLUListElement;
    budget: HTMLSpanElement;

    static instance = new Template();
    private constructor() {
        this.ul = document.getElementById("list-container") as HTMLUListElement;
        this.budget = document.getElementById(
            "budget-value"
        ) as HTMLSpanElement;
    }

    clear() {
        this.ul.innerHTML = "";
    }

    render(fullList: FullList) {
        this.clear();

        fullList.list.forEach((item) => {
            const [date, month, year] = item.date;
            let id = `${date}-${month}-${year}`;
            const li = document.createElement("li");
            let itemType: string = "";
            if (item.type === "income") itemType = "border-r-green-600";
            else itemType = "border-r-red-600";
            li.classList.add(
                `bg-white`,
                `shadow-sm`,
                "border",
                "border-gray-100",
                `px-2`,
                "py-[2px]",
                "w-full",
                "rounded-r-[3px]",
                `${itemType}`,
                "border-r-[6px]",
                "grid",
                "items-center",
                "justify-between",
                "grid-cols-[1fr,_auto]",
                "gap-3"
            );
            li.dataset.type = item.type;
            /*<li
                                class="bg-white shadow-sm border border-gray-100 px-2 py-[2px] w-full rounded-r-[3px] border-r-red-600 border-r-[6px] grid items-center justify-between grid-cols-[1fr,_auto] gap-3"
                                data-type=${item.type}
                            >
                            */
            li.innerHTML = `
                                <span>${item.description}</span>
                                <div class="">
                                    <span id="amount" class="mr-2 text-gray-500 text-sm">$${item.amount}</span>
                                    <span id=${item.id} class="mr-1 text-gray-400 text-xs"
                                        >${id}</span
                                    >
                                    
                                </div>
            `;
            const button = document.createElement("button");
            button.classList.add(
                "text-xl",
                "font-bold",
                "text-red-500",
                "py-1"
            );
            button.innerHTML = "&times;";
            const liChild = <HTMLDivElement>li.lastElementChild;
            liChild.appendChild(button);
            this.ul.appendChild(li);
            // <button
            //                             class="text-2xl font-bold text-red-500 p-2"
            //                             id="delete-list"
            //                         >
            //                             &times;
            //                         </button>
            // let button = <HTMLButtonElement>(
            //     document.getElementById("delete-list")
            // );
            button.addEventListener("click", () => {
                fullList.removeItem(item.id);
                this.render(fullList);
                this.updateBudget(fullList);
            });
        });
    }
    updateBudget(fullList: FullList): void {
        this.budget.textContent = `$${fullList.getBudget()}`;
    }
}
