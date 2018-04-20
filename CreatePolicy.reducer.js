import { CREATEPOLICY } from './CreatePolicy.action';

const initialState = {
  isLoading: false,
  config: [],
  error: false,
  errorData: [],
};

const policyReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATEPOLICY.POST:
      return Object.assign({}, state, {
        isLoading: true,
        error: false,
      });
    case CREATEPOLICY.SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        config: action.config,
        error: false,
      });
    case CREATEPOLICY.ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        errorData: action.errData,
        error: true,
      });
    default:
      return state;
  }
};

export default policyReducer;
