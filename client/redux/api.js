import { publicRequest } from '../requestMethods';
import { registerSuccess } from './userSlice';
import { registerFailure } from './userSlice';
import { registerStart } from './userSlice';
import { loginStart, loginSuccess, loginFailure } from './userSlice';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/login', {
      user_email: user.username || user.email,
      user_password: user.password,
    });
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post('/auth/register', {
      user_fullname: user.username,
      user_email: user.email,
      user_password: user.password,
      user_phNo: user.phone || '0000000000',
      shopName: user.username + " Store",
      theme: 'modern',
    });
    dispatch(registerSuccess(res.data));
  } catch (error) {
    dispatch(registerFailure());
  }
};
