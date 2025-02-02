import { getContext, setContext } from 'svelte';

export type Info = {
	activeStep: number;
	personalInfo: {
		data: {
			name: string;
			email: string;
			phone: string;
		};
		valid: boolean;
	};
	selectPlan: { data: SelectPlan; valid: boolean },
	addOns: AddOns[]
};

export type SelectPlan = {
	img?: any;
	name: string;
	price: {
		mountly: string;
		yearly: string;
	};
	isMonthly?: boolean;
};

export type AddOns = {
	name: string,
	text: string,
	price: {
		mountly: string,
		yearly: string
	}
}

let infoDataKey = Symbol('infoData');

export function setInfoContext(infoData: Info) {
	setContext(infoDataKey, infoData);
}

export function getInfoContext(): Info {
	return getContext(infoDataKey);
}

// type Banana = { banana: string };
// type NumOfClick = { num: number };

// let bananaKey = Symbol('banana');
// let numKey = Symbol('numOfClick');

// export function setBananaContext(banana: Banana) {
// 	setContext(bananaKey, banana);
// }

// export function getBananaContext(): Banana {
// 	return getContext(bananaKey);
// }

// export function setNumOfClickContext(num: NumOfClick) {
// 	setContext(numKey, num);
// }

// export function getNumOfClickContext(): NumOfClick {
// 	return getContext(numKey);
// }
