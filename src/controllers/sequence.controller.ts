import { Request, Response } from "express";

interface LettersEntity {
  letters: string[];
}

export default function sequenceController(req: Request, res: Response){
  const lettersArray: LettersEntity = req.body;
  const lettersArrayLength = lettersArray.letters.length;

  lettersArray.letters.forEach(element => {
    if(element.length !== lettersArrayLength){
      throw new Error("deu ruim");
    }
  });

  
}