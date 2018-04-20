import axios from 'axios';
import { mockProducerInfoJson } from '../../../../__mocks__/configMock';

export const CONFIG = {
  GET: 'PRODUCER_GET',
  SUCCESS: 'PRODUCER_SUCCESS',
  ERROR: 'PRODUCER_ERROR',
};

export const getProducerInfo = () => ({
  type: PRODUCER.GET,
});

export const successProducerInfo = producerInfo => ({
  type: PRODUCER.SUCCESS,
  producerInfo,
});

export const errorProducerInfo = json => ({
  type: PRODUCER.ERROR,
  errData: json,
});

export const fetchProducerInfo = () => (
  (dispatch) => {
    dispatch(getProducerInfo());

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      const producerInfoObj = [];
      console.log('using mock producerInfo');
      mockConfigJson.forEach((el) => {
        if (el.name !== 'global') {
          producerInfoObj.push(el);
        }
      });
      return dispatch(successProducerInfo(producerInfoObj));
    }

    return axios({
      url: '/mob_socotra_poc/producer/{producerNumber}',
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    })
      .then((response) => {
        const producerInfoObj = [];
        console.log(response);
        response.data.forEach((el) => {
          if (el.name !== 'global') {
            producerInfoObj.push(el);
          }
        });
        dispatch(successProducerInfo(producerInfoObj));
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          dispatch(errorProducerInfo(error.response.data));
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          dispatch(errorProducerInfo({ errorMessage: 'bad request' }));
        } else {
          // Something happened in setting up the request that triggered an Error
          dispatch(errorProducerInfo(error));
        }
      });
  }
);
