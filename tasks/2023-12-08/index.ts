export interface Letter {
	content: string;
	country: "pl" | "de" | "us";
	priority: "high" | "medium" | "low";
}

interface Strategy {
	sortLetters: (letters: Letter[]) => Letter[];
}

type SortStrategy = PriorityStrategy | LengthStrategy | CountryStrategy;

export class LetterSorter {
	private strategy: SortStrategy;

	constructor(strategy: SortStrategy) {
		this.strategy = strategy;
	}
	sortLetters = (letters: Letter[]) => {
		return this.strategy.sortLetters(letters);
	};
}

export class PriorityStrategy implements Strategy {
	sortLetters = (letters: Letter[]) => {
		const countryOrder = ["high", "medium", "low"];
		return letters.sort((a, b) => {
			const indexA = countryOrder.indexOf(a.priority);
			const indexB = countryOrder.indexOf(b.priority);

			return indexA - indexB;
		});
	};
}

export class LengthStrategy implements Strategy {
	sortLetters = (letters: Letter[]) => {
		return letters.sort((a, b) => a.content.length - b.content.length);
	};
}

export class CountryStrategy implements Strategy {
	sortLetters = (letters: Letter[]) => {
		const countryOrder = ["pl", "de", "us"];
		return letters.sort((a, b) => {
			const indexA = countryOrder.indexOf(a.country);
			const indexB = countryOrder.indexOf(b.country);

			return indexA - indexB;
		});
	};
}
