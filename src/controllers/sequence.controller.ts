import { LettersEntity } from "@/protocols";
import sequenceService from "@/services/sequence.service";
import { Request, Response } from "express";
import httpStatus from "http-status";


export default function sequenceController(req: Request, res: Response){
  const lettersArray: LettersEntity = req.body;

  try {
    const isValid = sequenceService.validate(lettersArray);
    return res.status(httpStatus.OK).send(isValid);
  } catch (error) {
    if(error.name === "UnprocessableEntityError"){
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message)
    }
  }


}