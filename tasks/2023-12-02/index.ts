type QueueItem<T> = {
	item: T;
	priority: number;
};

export class ChristmasQueue<TItem> {
	private items: QueueItem<TItem>[];

	constructor() {
		this.items = [];
	}

  private getInsertIndex(priority: number): number {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority < priority) {
        return i;
      }
    }
    return this.items.length;
  }

	public isEmpty = () => {
		return this.items.length === 0;
	};

	public enqueue = (item: TItem, priority: number) => {
		const index = this.getInsertIndex(priority);

		this.items.splice(index, 0, { item, priority });
	};

	public dequeue = () => {
		if (this.isEmpty()) throw new Error("There are no letters in the queue!");

		return this.items.shift()?.item;
	};
}
