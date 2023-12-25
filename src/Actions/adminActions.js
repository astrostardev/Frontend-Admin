import {
    loginRequest,
    loginFail,
    loginSuccess,
    clearError,
    registerSuccess,
    registerFail,
    registerRequest,
    logoutFail,
    logoutSuccess
} from '../Slice/authSlice'
import axios from 'axios'

export const login = (email, password) => async (dispatch) => {

    try {
        dispatch(loginRequest())
       
        const data = await axios.post(`${process.env.REACT_APP_URL}api/v1/admin/login`, {  email, password });
        console.log(data);
        dispatch(loginSuccess(data))
    } catch (error) {
        dispatch(loginFail(error?.response?.data?.message))
    console.log(error.response.data.message);
    }

}

export const clearAuthError = dispatch => {
    dispatch(clearError())
}

export const register = (userData) => async (dispatch) => {

    try {
        dispatch(registerRequest())
        const { data } = await axios.post(`${process.env.REACT_APP_URL}/api/v1/admin/register`, userData);
        dispatch(registerSuccess(data))
    } catch (error) {
        dispatch(registerFail(error.response.data.message))
    }

}


export const logout =  async (dispatch) => {

    try {
        const {data} = await axios.get(`https://shy-gold-sawfish-robe.cyclic.app/api/v1/admin/logout`)
        dispatch(logoutSuccess(data))
    } catch (error) {
        dispatch(logoutFail())
    }

}