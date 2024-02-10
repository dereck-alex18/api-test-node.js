import dotenv from "dotenv";

dotenv.config();

const baseURL = 'https://gorest.co.in/public/v2';
const TOKEN = process.env.AUTH_TOKEN;
const STATUS_CODE = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE: 422,
};

export {
    baseURL,
    TOKEN,
    STATUS_CODE,
}