import unprocessableEntityError from "@/errors/unprocessableEntityError";
import { LettersEntity, ResponseEntity } from "@/protocols";
import sequenceRepository from "@/repositories/sequence.repository";

async function validate(body: LettersEntity): Promise<ResponseEntity> {
	const lettersArrayLength = body.letters.length;

	body.letters.forEach((element) => {
		if (element.length !== lettersArrayLength) {
			throw unprocessableEntityError();
		}
	});

	const hasHorizontalSequence: boolean = horizontalValidation(body.letters);
	const hasVerticalSequence: boolean = verticalValidation(body.letters);
	const hasDiagonalSequence: boolean = diagonalValidation(body.letters);

	const stringifiedLettersArray: string = JSON.stringify(body);
	const hasSequence = await sequenceRepository.searchSequence(
		stringifiedLettersArray
	);

	if (hasHorizontalSequence || hasVerticalSequence || hasDiagonalSequence) {
		if (!hasSequence) {
			await sequenceRepository.insertNewSequence(stringifiedLettersArray, true);
		}
		return {
			is_valid: true,
		};
	}

	if (!hasSequence) {
		await sequenceRepository.insertNewSequence(stringifiedLettersArray, false);
	}
	return {
		is_valid: false,
	};
}


function horizontalValidation(arr: string[]): boolean {
	let auxString = "";

	for (let i = 0; i < arr.length; i++) {
		auxString += `${arr[i]}+`;
	}

	for (let i = 0; i < auxString.length; i++) {
		const lastChar = i + 4;
		const currentSubstring = auxString.substring(i, lastChar);
		if(lastChar === auxString.length) return false;
		if (
			currentSubstring === "BBBB" ||
			currentSubstring === "DDDD" ||
			currentSubstring === "UUUU" ||
			currentSubstring === "HHHH"
		) {
			return true;
		}
	}

	return false;
}

function transposeMatrix(arr: string[]): string[]{
	let transposedMatrix = [];


	for (let i =0; i<arr[0].length; i++){
		let newElement = "";
		for (let j=0; j<arr.length; j++){
			newElement += arr[j][i];
		}
		transposedMatrix.push(newElement)
	}

	return transposedMatrix;
}

function verticalValidation(arr: string[]): boolean {
	const transposedMatrix = transposeMatrix(arr);
	return horizontalValidation(transposedMatrix);
}

function diagonalValidation(arr: string[]): boolean {
	const elementLength = arr[0].length;

	for (let i = 0; i < elementLength; i++) {
		for (let j = 0; j < arr.length; j++) {
			let count = 1;
			let increment = 1;
			const candidate = arr[j][i];
			for (let k = j + 1; k < arr.length; k++) {
				const nextElement = arr[k][i + increment];
				const previousElement = i === 0 ? false : arr[k][i - increment];
				if (nextElement !== candidate && previousElement !== candidate) break;
				count++;
				increment++;
				if (count === 4) return true;
			}
		}
	}

	return false;
}

const sequenceService = {
	validate,
};

export default sequenceService;
