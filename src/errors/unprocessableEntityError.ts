import { ErrorEntity } from '@/protocols';

export default function unprocessableEntityError(): ErrorEntity {
  return {
    name: 'UnprocessableEntityError',
    message: 'A lista fornecida não é compatível com uma matriz quadrada (NxN). Favor refaça a operação',
  };
}
