type LetterValue = number;
type Letter = { [key: string]: LetterValue };
type Tracker = (name: string | symbol, value: number) => void;

type TriggerTrackerProps = {
	target: Letter;
	prop: string | symbol;
	newValue: number;
	tracker: Tracker;
};

const isInputCorrect = (prop: unknown, newValue: unknown) => {
	return typeof prop === "string" && typeof newValue === "number";
};

const triggerTracker = ({
	newValue,
	prop,
	target,
	tracker,
}: TriggerTrackerProps) => {
	if (target[String(prop)] !== newValue) {
		tracker(prop, newValue);
	}
};

export function createTrackedLetter(letter: Letter, tracker: Tracker): Letter {
	const changeTracker: ProxyHandler<Letter> = {
		set(target, prop, newValue) {
			if (isInputCorrect(prop, newValue)) {
				triggerTracker({ target, prop, newValue, tracker });
			}
			return true;
		},
	};
	const letterProxy = new Proxy<Letter>(letter, changeTracker);

	return letterProxy;
}
