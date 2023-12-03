type Gift = {
	childId: number;
	name: string;
};

export class GiftRegistry {
	private giftsList: Gift[];

	constructor() {
		this.giftsList = [];
	}

	private doesGiftAlreadyExist = (childId: number, name: string) => {
		return this.giftsList.some(
			(gift) => gift.childId === childId && gift.name === name
		);
	};

	public addGift = (childId: number, name: string) => {
		this.giftsList.push({ childId, name });
	};

	public getGiftsForChild = (childId: number) => {
		return this.giftsList
			.filter((gift) => {
				return childId === gift.childId;
			})
			.map((gift) => gift.name);
	};

	public removeGift = (childId: number, name: string) => {
		const exists = this.doesGiftAlreadyExist(childId, name);
		if (!exists) throw new Error("Gift not found");

		const newList = this.giftsList.filter(
			(gift) => gift.childId !== childId || gift.name !== name
		);

		this.giftsList = newList;
	};
}
