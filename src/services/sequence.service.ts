import unprocessableEntityError from "@/errors/unprocessableEntityError";
import { LettersEntity } from "@/protocols";

export default function sequenceService(body: LettersEntity){
  const lettersArrayLength = body.letters.length;

  body.letters.forEach(element => {
    if(element.length !== lettersArrayLength){
      throw unprocessableEntityError();
    }
  });


}

function horizontalValidation(arr: string[]): boolean{
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

  return false
}