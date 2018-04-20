import { PRODUCER } from './GetProducerInfo.action';

const initialState = {
  isLoading: false,
  config: [],
  error: false,
  errorData: [],
};

const producerInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCER.GET:
      return Object.assign({}, state, {
        isLoading: true,
        error: false,
      });
    case PRODUCER.SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        config: action.config,
        error: false,
      });
    case PRODUCER.ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        errorData: action.errData,
        error: true,
      });
    default:
      return state;
  }
};

export default producerInfoReducer;
