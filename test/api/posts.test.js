import superTest from 'supertest';
import { expect } from 'chai';
import { describe } from 'mocha';
import { postsData, usersData }   from '../../src/utils/test-data.js';
import { postsEndpoint, userEndpoint } from '../../src/utils/endpoints.js';
import { STATUS_CODE } from '../../config/apiConfig.js';
import { sendDeleteRequest, sendGetRequest, sendPostRequest, sendPutRequest } from '../../src/utils/APIClient.js';
import { destroyUsers, generateUsers, generatePosts, destroyPosts } from '../../src/utils/dataGenerator.js';

describe('Posts tests', () => {
  let defaultUserId;
  let defaultPostId;
  let postId

  before(async () => {
    const user = await generateUsers();
    defaultUserId = user.body.id;

    const post = await generatePosts(defaultUserId);
    defaultPostId = post.body.id;
  });

  describe('GET /posts', () => {
    it('Should get all posts', async () => {
      const res = await sendGetRequest(postsEndpoint);
  
      expect(res.statusCode).to.equal(STATUS_CODE.OK);
      expect(res.body).to.not.be.empty;
    });

    it('Should get a single post', async () => {
      const res = await sendGetRequest(`${postsEndpoint}/${defaultPostId}`);

      expect(res.statusCode).to.equal(STATUS_CODE.OK);
      expect(res.body).to.deep.include(postsData[0]);
    });
  });

  describe('POST /posts', () => {
    it('Should create a new post', async () => {
      
      const userPostsEndpoint = `${userEndpoint}/${defaultUserId}/${postsEndpoint}`;
      const requestBody = {
        title: 'Vesper reprehenderit aer tenax eaque',
        body: 'blabla',
      }
      const res = await sendPostRequest(userPostsEndpoint, requestBody);
      postId = res.body.id;

      expect(res.statusCode).to.equal(STATUS_CODE.CREATED);
      expect(res.body).to.deep.include(requestBody);
    });  
  });

  describe('PUT /posts', async () => {
    it('Should update a post', async () => {
      const requestBody = {
        title: 'edited title',
        body: 'edited post',
      }
      const res = await sendPutRequest(postsEndpoint, postId, requestBody);

      expect(res.statusCode).to.equal(STATUS_CODE.OK);
      expect(res.body).to.deep.include(requestBody);
    });
  })

  describe('DELETE /posts', async () => {
    it('Should delete a post', async () => {
      const res = await sendDeleteRequest(postsEndpoint, postId);

      expect(res.statusCode).to.equal(STATUS_CODE.NO_CONTENT);
      expect(res.body).to.be.empty;
    });
  });

  after(async () => {
    await destroyUsers(defaultUserId);
    await destroyPosts(defaultPostId);
  });
});

