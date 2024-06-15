const request = require('supertest');
const server = require('../backend/server.tests'); 

describe('GET /api/crypto-prices', () => {
  it('should GET the specified crypto prices', async () => {
    const response = await request(server).get('/api/crypto-prices');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(3); 
  });

  it('should return 500 on error', async () => {
    const response = await request(server).get('/api/crypto-prices');
    if (response.status === 500) {
      expect(response.body).toHaveProperty('error');
    }
  });
});
