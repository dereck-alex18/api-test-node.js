import superTest from 'supertest';
import { expect } from 'chai';
import { describe } from 'mocha';
import { usersData }   from '../../src/utils/test-data.js';
import { userEndpoint } from '../../src/utils/endpoints.js';
import { STATUS_CODE } from '../../config/apiConfig.js';
import { sendDeleteRequest, sendGetRequest, sendPostRequest, sendPutRequest } from '../../src/utils/APIClient.js';
import { destroyUsers, generateUsers } from '../../src/utils/dataGenerator.js';



// before(async () => {
//   const res = await generateUsers();
//   defaultUserId = res.body.id;
// });

describe('Users tests', () => {
  let userId;
  let defaultUserId;
  
  before(async () => {
    const res = await generateUsers();
    defaultUserId = res.body.id;
  });

  describe('POST /users', () => {
    it('Should create a new user', async () => {
      
      const res = await sendPostRequest(userEndpoint, usersData[0]);
      userId = res.body.id;
  
      expect(res.statusCode).to.equal(STATUS_CODE.CREATED);
      expect(res.body).to.deep.include(usersData[0]);
  
     });
  
    it('Should not create an user if the email is already taken', async () => {
      const res = await sendPostRequest(userEndpoint, usersData[0]);
      const expectedResponse = 
      [
        {
          field: 'email',
          message: 'has already been taken'
        }
      ];
  
      expect(res.statusCode).to.equal(STATUS_CODE.UNPROCESSABLE);
      expect(res.body).to.deep.equal(expectedResponse);
    });
  
    it('Should not create an user if the email has an invalid format', async () => {
      const res = await sendPostRequest(userEndpoint, usersData[1]);
      const expectedResponse = 
      [
        {
          field: 'email',
          message: 'is invalid'
        }
      ];
  
      expect(res.statusCode).to.equal(STATUS_CODE.UNPROCESSABLE);
      expect(res.body).to.deep.equal(expectedResponse);
    });
  });

  describe('GET /users', () => {
      it('Should get all the users', async () => {
         const res = await sendGetRequest(userEndpoint);
       
         expect(res.statusCode).to.equal(STATUS_CODE.OK);
         expect(res.body).to.not.be.empty;
      });
  
      it('Should get one user by id', async () => {
        const res = await sendGetRequest(userEndpoint, defaultUserId);
  
        expect(res.statusCode).to.equal(STATUS_CODE.OK);
        expect(res.body).to.not.be.empty;
        expect(res.body.id).to.equal(defaultUserId);
        expect(res.body.name).to.equal('John');
      
    });
  
     it('Should get user by query param', async () => {
        const queryParams = { gender: 'male', status: 'active' }
        const res = await sendGetRequest(userEndpoint, null, queryParams);
  
        res.body.forEach(element => {
          expect(element.gender).to.equal('male');
          expect(element.status).to.equal('active');
        });
     });
  });
  
  describe('PUT /users/:id', () => {
  
    it('Should update user data', async () => {
      const dataToBeChanged = { status: 'inactive' };
      const expectedResponse = {
        name: 'John',
        email: 'johndoe@test.com',
        gender:'male',
        status: 'inactive',
      };
      const res = await sendPutRequest(userEndpoint, defaultUserId, dataToBeChanged);
  
      expect(res.statusCode).to.equal(STATUS_CODE.OK);
      expect(res.body).to.deep.include(expectedResponse);
    });
  
    it('Should not update user email when passing an invalid email address', async () => {
      const dataToBeChanged = { email: 'invalidemail@' };
      const expectedResponse = 
      [
        {
          field: 'email',
          message: 'is invalid'
        }
      ];
      const res = await sendPutRequest(userEndpoint, defaultUserId, dataToBeChanged);
  
      expect(res.statusCode).to.equal(STATUS_CODE.UNPROCESSABLE);
      expect(res.body).to.deep.equal(expectedResponse);
    });
    
  });
  
  describe('DELETE /users/:id',  () => {
  
    it('Should delete an user', async () => {
      const res = await sendDeleteRequest(userEndpoint, userId);
  
      expect(res.statusCode).to.equal(STATUS_CODE.NO_CONTENT);
      expect(res.body).to.be.empty;
  
    });
  });

  after(async () => {
    await destroyUsers(defaultUserId);
  });

});
