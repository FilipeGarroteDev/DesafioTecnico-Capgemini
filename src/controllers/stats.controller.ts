import { LettersEntity, StatsEntity } from "@/protocols";
import statsService from "@/services/stats.service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export default async function statsController(req: Request, res: Response) {
	try {
		const stats: StatsEntity = await statsService.getAll();
		return res.status(httpStatus.OK).send(stats);
	} catch (error) {
		return res.status(httpStatus.INTERNAL_SERVER_ERROR);
	}
}
