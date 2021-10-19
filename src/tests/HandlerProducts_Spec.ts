import request from 'supertest';
import dotenv from 'dotenv';
import app from '../server'
dotenv.config()
const {
    POSTGRES_HOST
}= process.env

const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmaXJzdF9uYW1lIjoiR2VvcmdlIiwibGFzdF9uYW1lIjoiSGFycmlzb24iLCJ1c2VybmFtZSI6InNvbWV0aGluZyIsInBhc3N3b3JkX2RpZ2VzdCI6IiQyYiQxMCRaa3VvdDFONVdoTHBQM3BWazdiZVFPaVRoRVl5YmJ3RExvNURHT2RHVUlYU1M3WVlRNGszMiJ9LCJpYXQiOjE2MzQ0NjkzMTV9.4uyRl6JZSoDVRGxyfsX2px_sJiRCPqvM-0m9UzW7ev8'

const server = POSTGRES_HOST;
describe('Product Handler ',()=>{
    it('Test /products POST route ', async () => {
        const product = {
            "name": "Help!",
            "price": "20",
            "cathegory": "song"
        };
        await request(app).post('/products')
            .auth(token, { type: 'bearer' })
            .send(product)
            .expect(200)
            .then(async (res) => {
                expect(res.body).toBeTruthy;
                
            })
            .catch(err => console.error(err.message));
    });

    it('Test /products GET route ', async () => {
        
        await request(app).get('/products')
            .send()
            .expect(200)
            .then(async (res) => {
                expect(res.body).toBeTruthy;
            })
            .catch(err => console.error(err.message)); 
    });
    
    it('Test /products/id GET route ', async () => {
        
        await request(app).get('/products/1')
            .send()
            .expect(200)
            .then(async (res) => {
                expect(res.body).toBeTruthy;
            })
            .catch(err => console.error(err.message)); 
    });
    it('Test /products/id DELETE route ', async () => {
        
        await request(app).delete('/products/1')
            .auth(token, { type: 'bearer' })
            .send()
            .expect(200)
            .then(async (res) => {
                expect(res.body).toBeTruthy;
            })
            .catch(err => console.error(err.message)); 
    });
    


});

