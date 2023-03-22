import db from "@/config/database";
import unprocessableEntityError from "@/errors/unprocessableEntityError";
import { LettersEntity, ResponseEntity } from "@/protocols";

async function validate(body: LettersEntity): Promise<ResponseEntity> {
	const lettersArrayLength = body.letters.length;

	body.letters.forEach((element) => {
		console.log(element.length, lettersArrayLength);
		if (element.length !== lettersArrayLength) {
			throw unprocessableEntityError();
		}
	});

	const hasHorizontalSequence: boolean = horizontalValidation(body.letters);
	const hasVerticalSequence: boolean = verticalValidation(body.letters);
	const hasDiagonalSequence: boolean = diagonalValidation(body.letters);

	const stringifiedLettersArray: string = JSON.stringify(body);
	const hasSequence = await db
		.collection("sequences")
		.findOne({ sequence_list: stringifiedLettersArray });

	if (hasHorizontalSequence || hasVerticalSequence || hasDiagonalSequence) {
		if (!hasSequence) {
			await db.collection("sequences").insertOne({
				sequence_list: stringifiedLettersArray,
				is_valid: true,
			});
		}
		return {
			is_valid: true,
		};
	}

  if (!hasSequence) {
    await db.collection("sequences").insertOne({
      sequence_list: stringifiedLettersArray,
      is_valid: false,
    });
  }
	return {
		is_valid: false,
	};
}

function horizontalValidation(arr: string[]): boolean {
	let candidate = "";

	for (let i = 0; i < arr.length; i++) {
		const currentElement = arr[i];
		for (let j = 0; j < currentElement.length; j++) {
			let count = 1;
			const remainingLetters = currentElement.length - j - 1;
			if (remainingLetters < 3) break;
			candidate = currentElement[j];
			for (let k = j + 1; k <= currentElement.length; k++) {
				if (count === 4) return true;
				if (currentElement[k] !== candidate) break;
				count++;
			}
		}
	}

	return false;
}

function verticalValidation(arr: string[]): boolean {
	const elementLength = arr[0].length;

	for (let i = 0; i < elementLength; i++) {
		for (let j = 0; j < arr.length; j++) {
			let count = 1;
			const candidate = arr[j][i];
			for (let k = j + 1; k < arr.length; k++) {
				const currentElement = arr[k][i];
				if (currentElement !== candidate) break;
				count++;
				if (count === 4) return true;
			}
		}
	}

	return false;
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
