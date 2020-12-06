import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URI } from '../../utils';
const TopUpRequest = ()=> {
    return{
        type: 'TOPUP_REQUEST'
    }
}

const TopUpSuccess = (data)=> {
    return{
        type: 'TOPUP_SUCCESS',
        payload: data
    }
}
const TopUpError = (error)=> {
    return{
        type: 'TOPUP_ERROR',
        payload: error
    }
}



export const GetTopUp = () => {
    return (dispatch) =>{
        dispatch(TopUpRequest())
        dispatch({type:'LOADING'})
        AsyncStorage.getItem('token').then(token => {
            const headers = { headers: {'Authorization': token}} 
            return  axios.get(`${URI}/topup/all`,headers)
            .then((res)=> {
                dispatch({type:'LOADING_STOP'})
                const data = res.data.data
                dispatch(TopUpSuccess(data))
            }).catch((err)=> {
                dispatch({type:'LOADING_STOP'})
                const message = err.message
                dispatch(TopUpError(message))
            })
        })
    }

}
