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

interface StatsEntity {
	count_valid: number;
	count_invalid: number;
	ratio: number;
}

export { LettersEntity, ErrorEntity, ResponseEntity, StatsEntity };
