import { Api } from '../../utils/Api';
import * as actionTypes from '../constants/userContants';

export const setUserDetails = () => async (dispatch) => {
  try {
    const { statusCode, data } = await Api.getRequest('/api/user/me');

    if (statusCode === 400 || statusCode === 500) {
      dispatch({
        type: actionTypes.SET_INITIAL_STATE,
      });
      return;
    }

    let user = {};
    try {
      user = JSON.parse(data).user;
    } catch (error) {
      console.error('Error parsing JSON:', error);
      // Handle JSON parsing error, e.g., log it or show a user-friendly message
      return;
    }

    dispatch({
      type: actionTypes.SET_USER,
      payload: {
        isLogin: true,
        details: { ...user },
      },
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    // Handle fetch error, e.g., log it or show a user-friendly message
  }
};

export const setInitialState = () => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_INITIAL_STATE,
  });
};
