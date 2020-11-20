import Axios from 'axios';

import { HTTP_METHODS } from '../globals';

const axios = Axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export const createApiRequest = async (
  url: string,
  method: HTTP_METHODS,
  data: any
) => {
  try {
    const response = await axios({
      url,
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data,
    });
    return response.data;
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
};

export const baseImageUrl =
  'https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/';

export default axios;
