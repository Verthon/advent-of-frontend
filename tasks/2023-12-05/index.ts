type Event = (...args: any) => any;

export class ChristmasEmitter {
	private eventList: { eventKey: string; events: Event[] }[];

	constructor() {
		this.eventList = [];
	}

	private getEventsByKey = (eventKey: string) => {
		const events = this.eventList.filter((e) => {
			return e.eventKey === eventKey;
		});

		return events.flatMap((e) => e.events);
	};

	public on = (eventKey: string, callback: Event) => {
		const eventList = this.getEventsByKey(eventKey);
		this.eventList.push({ eventKey, events: [...eventList, callback] });
	};

	public off = (eventKey: string, _callback: Event) => {
		const index = this.eventList.findIndex(
			(event) => event.eventKey === eventKey
		);

		this.eventList.splice(index);
	};

	public emit = (eventKey: string) => {
		const events = this.getEventsByKey(eventKey);
		return events.forEach((cb) => cb());
	};
}
