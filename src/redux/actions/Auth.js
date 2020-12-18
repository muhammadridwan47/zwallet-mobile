import AsyncStorage from '@react-native-async-storage/async-storage'
import Axios from 'axios'
import { URI } from '../../utils'
import messaging from '@react-native-firebase/messaging';
import API from '../../service'

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
    return (dispatch) =>{
        dispatch(AuthLoginRequest())
        dispatch({type:'LOADING'})
        return Axios({
            method: 'POST',
            data: fields,
            url: `${URI}/auth/login`
        }).then((res)=> {
            dispatch({type:'LOADING_STOP'})
            const data = res.data
            AsyncStorage.setItem('token',res.data.token.token)
            messaging().getToken().then(token => {
            if (data.token.fcm == '-') {
                API.FCM({tokenFcm:token})
                dispatch(AuthLoginSuccess(data))
            }else{
                if (token == data.token.fcm) {
                    dispatch(AuthLoginSuccess(data))
                }else{
                    API.FCM({tokenFcm:'-'})
                    dispatch(AuthLoginError('token fcm invalid'))
                }
            }
            })
        })
        .catch((err)=> {
            dispatch({type:'LOADING_STOP'})
            dispatch(AuthLoginError(err))
        })
    }

}


export const SignUpAction = (data) => {
    return (dispatch) =>{
        dispatch({type:'LOADING'})
        dispatch(AuthRegisterRequest())
        return Axios({
            method: 'POST',
            data: data,
            url: `${URI}/auth/register`
        }).then((res)=> {
            dispatch({type:'LOADING_STOP'})
            
            const data = res.data
                 dispatch(AuthRegisterSuccess(data))
        }).catch((err)=> {
            dispatch({type:'LOADING_STOP'})
            const message = err.message
            dispatch(AuthRegisterError(message))
        })
    }
}


export const AuthLogout = ()=> {
    API.FCM({tokenFcm:'-'})
    return{
        type: 'LOGOUT',
    }
}
