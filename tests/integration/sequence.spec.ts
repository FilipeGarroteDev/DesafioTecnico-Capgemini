import app from '@/app';
import supertest from 'supertest';
import { cleanDb} from '../utils';

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('POST /sequences', () => {
  
});
