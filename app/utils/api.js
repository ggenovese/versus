import request from 'axios';

export const rootUrl = 'http://localhost:3000/data';

export const getResource = () => request(rootUrl);
