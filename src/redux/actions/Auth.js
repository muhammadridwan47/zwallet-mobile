import AsyncStorage from '@react-native-async-storage/async-storage'
import Axios from 'axios'
import { URI } from '../../utils'


const AuthLoginRequest = ()=> {
    return{
        type: 'LOGIN_REQUEST'
    }
}

const AuthLoginSuccess = (data)=> {
    return{
        type: 'LOGIN_SUCCESS',
        payload: data
    }
}
const AuthLoginError = (error)=> {
    return{
        type: 'LOGIN_ERROR',
        payload: error
    }
}

const AuthRegisterRequest = ()=> {
    return{
        type: 'REGISTER_REQUEST'
    }
}

const AuthRegisterSuccess = (data)=> {
    return{
        type: 'REGISTER_SUCCESS',
        payload: data
    }
}
const AuthRegisterError = (error)=> {
    return{
        type: 'REGISTER_ERROR',
        payload: error
    }
}



export const AuthLogin = (fields) => {
    console.log('isi dari redux login dispatch ',fields)
    return (dispatch) =>{
        dispatch(AuthLoginRequest())
        return Axios({
            method: 'POST',
            data: fields,
            url: `${URI}/auth/login`
        }).then((res)=> {
            console.log('berhasil redux login dispatch',res.data)
            const data = res.data
            AsyncStorage.setItem('token',res.data.token.token)
            dispatch(AuthLoginSuccess(data))

        }).catch((err)=> {
            console.log('gagal redux login dispatch')
            dispatch(AuthLoginError(data))
        })
    }

}


export const SignUpAction = (data) => {
    return (dispatch) =>{
        dispatch(AuthRegisterRequest())
        return Axios({
            method: 'POST',
            data: data,
            url: `${URI}/auth/register`
        }).then((res)=> {
            const data = res.data
                 dispatch(AuthRegisterSuccess(data))
        }).catch((err)=> {
            const message = err.message
            dispatch(AuthRegisterError(message))
            console.log(message)
        })
    }
}


export const AuthLogout = ()=> {
    return{
        type: 'LOGOUT',
    }
}
