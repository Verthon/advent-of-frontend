type State = string;

export class OrderController {
	private machinesList: Machine[];

	constructor() {
		this.machinesList = [];
	}

	private isNonValidState = (state: State) => {
		return state === "unknown";
	};

	private validateState = (state: State) => {
		if (this.isNonValidState(state)) {
			throw new Error("Invalid state provided");
		}
	};

	public registerMachine = (machine: Machine) => {
		this.machinesList.push(machine);
	};

	public setState = (newState: State) => {
		this.validateState(newState);

		this.notify(newState);
	};

	public unregisterMachine = (machine: Machine) => {
		const index = this.machinesList.indexOf(machine);
		if (index === -1) {
			return console.log("Subject: Nonexistent observer.");
		}

		this.machinesList.splice(index, 1);
	};

	public notify = (newState: State) => {
		for (const machine of this.machinesList) {
			machine.update(newState);
		}
	};
}
export class Machine {
	public state: State | null;
	private ordersList: string[];
	private currentOrderId: number;

	constructor() {
		this.state = null;
		this.ordersList = [];
		this.currentOrderId = 0;
	}

	private formatOrderListItem = () => {
		return `Order #${this.currentOrderId} - ${this.state}`;
	};

	private addToOrdersList = () => {
		const formattedOrder = this.formatOrderListItem();

		this.ordersList.push(formattedOrder);
	};

	public performAudit = () => {
		return this.ordersList;
	};

	public update = (newState: State) => {
		this.currentOrderId++;
		this.state = newState;
		this.addToOrdersList();
	};
}
