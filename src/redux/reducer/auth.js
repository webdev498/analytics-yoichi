import {USER_DETAILS_LOADING, USER_DETAILS_LOADED, USER_DETAILS_ERROR} from 'Constants';

const initialState = {
  isLoading: true,
  isError: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case USER_DETAILS_LOADING: {
      return {
        isLoading: true,
        isError: false
      }
    }
    case USER_DETAILS_LOADED: {
      const {application, roles, user} = action.data.__authDetails;
      return {
        application,
        roles,
        user,
        isLoading: false,
        isError: false
      };
    }
    case USER_DETAILS_ERROR: {
      return {
        isLoading: false,
        isError: true,
        errorData: action.errorData
      }
    }
    default:
      return state;
  }
}