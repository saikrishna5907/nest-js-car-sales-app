import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('handles a singUp request', () => {
        const emailId = 'test2@test.com'
        return request(app.getHttpServer())
            .post('/auth/signUp')
            .send({ email: emailId, password: 'test' })
            .expect(201)
            .then((response) => {
                const { id, email } = response.body
                expect(id).toBeDefined();
                expect(email).toEqual(emailId)
            })
    });

    // it('signup as a new user then get the currently logged in user', async () => {
    //     const emailId = 'test3@test.com'

    //     const res = await request(app.getHttpServer())
    //         .post('/auth/signUp')
    //         .send({ email: emailId, password: 'test' })
    //         .expect(201)
    //     const cookie = res.get('Set-Cookie')

    //     const { body } = await request(app.getHttpServer())
    //         .get('/auth/getCurrentUser')
    //         .set('Cookie', cookie)
    //         .expect(200);

    //     expect(body.email).toEqual(emailId)
    // })
});
