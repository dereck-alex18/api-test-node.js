import { sendDeleteRequest, sendPostRequest } from "./APIClient.js";
import { userEndpoint, postsEndpoint } from "./endpoints.js";
import { usersData, postsData } from "./test-data.js";

const generateUsers = async () => {
    return sendPostRequest(userEndpoint, usersData[2]);
};

const destroyUsers = async (id) => {
    return sendDeleteRequest(userEndpoint, id);
}

const generatePosts = async (userId) => {
    return sendPostRequest(`${userEndpoint}/${userId}/${postsEndpoint}`, postsData[0]);
}

const destroyPosts = async (postId) => {
    return sendDeleteRequest(`${postsEndpoint}/${postId}`);
}

export {
    generateUsers,
    destroyUsers,
    generatePosts,
    destroyPosts,
};