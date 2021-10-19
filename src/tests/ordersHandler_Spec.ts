import request from 'supertest';
import dotenv from 'dotenv';
import app from '../server'
dotenv.config()
const {
    POSTGRES_HOST
}= process.env

const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmaXJzdF9uYW1lIjoiR2VvcmdlIiwibGFzdF9uYW1lIjoiSGFycmlzb24iLCJ1c2VybmFtZSI6InNvbWV0aGluZyIsInBhc3N3b3JkX2RpZ2VzdCI6IiQyYiQxMCRaa3VvdDFONVdoTHBQM3BWazdiZVFPaVRoRVl5YmJ3RExvNURHT2RHVUlYU1M3WVlRNGszMiJ9LCJpYXQiOjE2MzQ0NjkzMTV9.4uyRl6JZSoDVRGxyfsX2px_sJiRCPqvM-0m9UzW7ev8'

const server = POSTGRES_HOST;
describe('orders Handler ',()=>{
    it('Test /orders POST route ', async () => {
        const order = {
            "status": "active",
            "user_id":"1",
            
        };
        await request(app).post('/orders')
            .auth(token, { type: 'bearer' })
            .send(order)
            .expect(200)
            .then(async (res) => {
                expect(res.body).toBeTruthy;
                
            })
            .catch(err => console.error(err.message));
    });

    it('Test /orders/id/users GET route ', async () => {
        
        await request(app).get('/orders/1/users')
            .auth(token, { type: 'bearer' })
            .send()
            .expect(200)
            .then(async (res) => {
                expect(res.body).toBeTruthy;
            })
            .catch(err => console.error(err.message)); 
    });
    
  
    


});

