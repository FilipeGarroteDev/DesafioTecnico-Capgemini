interface LettersEntity {
	letters: string[];
}

interface ErrorEntity {
	name: string;
	message: string;
}

interface ResponseEntity {
	is_valid: boolean;
}

export { LettersEntity, ErrorEntity, ResponseEntity };
