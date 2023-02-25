export const BASE_URL = 'http://localhost:9876';
export const INIT_URL = BASE_URL + '/init';
export const RESET_URL = (userId) => BASE_URL + `/init/user/${userId}`;