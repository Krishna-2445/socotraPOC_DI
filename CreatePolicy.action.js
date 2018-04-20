import axios from 'axios';
import { mockConfigJson } from '../../../../__mocks__/configMock';

export const CREATEPOLICY = {
  POST: 'CREATEPOLICY_POST',
  SUCCESS: 'CREATEPOLICY_SUCCESS',
  ERROR: 'CREATEPOLICY_ERROR',
};

export const createPolicy = () => ({
  type: CREATEPOLICY.POST,
});

export const successCreatePolicy = createPolicy => ({
  type: CREATEPOLICY.SUCCESS,
  config,
});

export const errorCreatePolicy = json => ({
  type: CREATEPOLICY.ERROR,
  errData: json,
});

export const postCreatePolicy = (createPolicy) => (
  (dispatch) => {
    dispatch(createPolicy());

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      const createPolicyObj = [];
      console.log('using mock config');
      mockConfigJson.forEach((el) => {
        if (el.name !== 'global') {
          createPolicyObj.push(el);
        }
      });
      return dispatch(successCreatePolicy(createPolicyObj));
    }

    return axios({
      url: '/mob_socotra_poc/policy/',
      method: 'post',
      data: createPolicy,
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    })
      .then((response) => {
        const createPolicyResponse = [];
        console.log(response);
        response.data.forEach((el) => {
          if (el.name !== 'global') {
            createPolicyResponse.push(el);
          }
        });
        dispatch(successCreatePolicy(createPolicyResponse));
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          dispatch(errorCreatePolicy(error.response.data));
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          dispatch(errorCreatePolicy({ errorMessage: 'bad request' }));
        } else {
          // Something happened in setting up the request that triggered an Error
          dispatch(errorCreatePolicy(error));
        }
      });
  }
);
