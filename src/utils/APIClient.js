import superTest from 'supertest';
import { TOKEN, baseURL } from '../../config/apiConfig.js';

const request = superTest(baseURL);

const sendGetRequest = async(endpoint, id, query) => {
    const requestUrl = id ? `${endpoint}/${id}` : endpoint;
    try{
        if(query){
            return await request.get(requestUrl).set('Authorization', TOKEN).query(query);
        }
        return await request.get(requestUrl).set('Authorization', TOKEN);
    } catch(err) {
        throw err;
    }
    
};

const sendPostRequest = async(endpoint, requestBody) => {
    try{
        return await request.post(endpoint).set('Authorization', TOKEN).send(requestBody);
    } catch(err) {
        throw err;
    }
    
};

const sendPutRequest = async(endpoint, id, requestBody) => {
    const requestUrl = `${endpoint}/${id}`;
    try{
        return await request.put(requestUrl).set('Authorization', TOKEN).send(requestBody);
    } catch(err){
        throw err;
    }
};

const sendDeleteRequest = async(endpoint, id) => {
    const requestUrl = `${endpoint}/${id}`;
    try{
        return await request.delete(requestUrl).set('Authorization', TOKEN)
    } catch(err){
        throw err;
    }
    
}

export {
    sendGetRequest,
    sendPostRequest,
    sendPutRequest,
    sendDeleteRequest,
};