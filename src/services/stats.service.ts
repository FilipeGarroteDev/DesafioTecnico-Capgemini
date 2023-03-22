import { StatsEntity } from "@/protocols";
import statsRepository from "@/repositories/stats.repository";

async function getAll(): Promise<StatsEntity> {
	const validSequences = (await statsRepository.searchValidSequences()).length;
	const invalidSequences = (await statsRepository.searchInvalidSequences())
		.length;
	const sequencesTotal = validSequences + invalidSequences;
	const ratio = +(validSequences / sequencesTotal).toFixed(2);

	return {
		count_valid: validSequences,
		count_invalid: invalidSequences,
		ratio,
	};
}

const statsService = {
	getAll,
};

export default statsService;
