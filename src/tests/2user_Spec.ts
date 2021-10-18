import { User,userStore } from "../models/user";


const store = new userStore()


describe('User model',()=>{
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
      });
    
      it('should have a show method', () => {
        expect(store.show).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(store.create).toBeDefined();
      });
    
      it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
      });
    
      it('create method should add a user', async () => {
        const result = await store.create({
          first_name: 'Paul',
          last_name: "McCartney",
          username: 'macca',
          password: 'letitbe'
        });
       const hashed_pass = result.password;

       const created:User = {
         id:1,
        first_name: 'Paul',
        last_name: "McCartney",
        username: 'macca',
        password: hashed_pass
       }
        expect(result).toEqual(created);
      });
      it('index method should return a list of users', async () => {
        const result = await store.index();
        const hashed_pass=result[0].password;
        expect(result).toEqual([{
          id: 1,
          first_name: 'Paul',
          last_name: "McCartney",
          username: 'macca',
          password: hashed_pass
        }]);
      });
    
      it('show method should return the correct user', async () => {
        const result = await store.show("1");
        const hashed_pass=result.password;
        expect(result).toEqual({
          id: 1,
          first_name: 'Paul',
          last_name: "McCartney",
          username: 'macca',
          password: hashed_pass
        });
      });
    
      /* it('delete method should remove the user', async () => {
        store.delete("1");
        const result = await store.index()
    
        expect(result).toEqual([]);
      }); */
})