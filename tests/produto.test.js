// tests/produto.test.js

const request = require('supertest');
const app = require('../app'); // ajuste o caminho conforme seu app principal

describe('Testa endpoints de produtos', () => {
  it('GET /produtos deve retornar status 200 e um array', async () => {
    const res = await request(app).get('/produtos');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
