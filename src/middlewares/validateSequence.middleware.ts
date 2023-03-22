import { LettersEntity } from "@/protocols";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export default function validateSequence(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const lettersArray: LettersEntity = req.body;
	let allOfChars = "";

	for (let i = 0; i < lettersArray.letters.length; i++) {
		allOfChars += lettersArray.letters[i];
	}

	allOfChars.split("").forEach((char) => {
		if (char !== "B" && char !== "D" && char !== "U" && char !== "H") {
			return res
				.status(httpStatus.UNPROCESSABLE_ENTITY)
				.send(
					"Somente são permitidos os caracteres 'B', 'D', 'U', 'H'. Favor refaça a operação"
				);
		}
	});

	next();
}
