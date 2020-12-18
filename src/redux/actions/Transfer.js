import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URI } from '../../utils';





// get data Transfer 
const TransferRequest = ()=> {
    return{
        type: 'TRANSFER_REQUEST'
    }
}

const TransferSuccess = (data)=> {
    return{
        type: 'TRANSFER_SUCCESS',
        payload: data
    }
}
const TransferError = (error)=> {
    return{
        type: 'TRANSFER_ERROR',
        payload: error
    }
}


// Get data transfer by ID  
const TransferRequestById = ()=> {
    return{
        type: 'TRANSFER_BYID_REQUEST'
    }
}

const TransferSuccessById = (data)=> {
    return{
        type: 'TRANSFER_BYID_SUCCESS',
        payload: data
    }
}
const TransferErrorById = (error)=> {
    return{
        type: 'TRANSFER_BYID_ERROR',
        payload: error
    }
}




// Get data transfer by ID  
const TransferSendRequest = ()=> {
    return{
        type: 'TRANSFER_SEND_REQUEST'
    }
}

const TransferSendSuccess = (data)=> {
    return{
        type: 'TRANSFER_SEND_SUCCESS',
        payload: data
    }
}
const TransferSendError = (error)=> {
    return{
        type: 'TRANSFER_SEND_ERROR',
        payload: error
    }
}

// save data in temporary 
const TransferTemporary = (data)=> {
    return{
        type: 'TRANSFER_TEMPORARY',
        payload: data
    }
}



const GetTransferTemporary = (data) => {
    return (dispatch) =>{
        dispatch(TransferTemporary(data))
    }
}

const GetTransferById = (id) => {
    return (dispatch) =>{
        dispatch({type:'LOADING'})
        dispatch(TransferRequestById())
        AsyncStorage.getItem('token').then(token => {
            const headers = { headers: {'Authorization': `${token}`}}
            return axios.get(`${URI}/user/getuser?id=${id}`,headers)
            .then((res)=> {
                dispatch({type:'LOADING_STOP'})
                const result = res.data.data[0];
                dispatch(TransferSuccessById(result))
            }).catch((err)=> {
                dispatch({type:'LOADING_STOP'})
                const message = err.message
                dispatch(TransferErrorById(message))
            })
        })
    }
}

const GetTransfer = () => {
    return (dispatch) =>{
        dispatch(TransferRequest())
        AsyncStorage.getItem('token').then(token => {
            const headers = { headers: {'Authorization': `${token}`}}
            return axios.get(`${URI}/user/all?sortBy=fullName&sortType=DESC&limit=6&page=0`,headers)
            .then((res)=> {
                const result = res.data.data
                dispatch(TransferSuccess(result))
            }).catch((err)=> {
                const message = err.message
                dispatch(TransferError(message))
            })
        })
    }
}

 const GetTransferSearch = (query) => {
    return (dispatch) =>{
        dispatch(TransferRequest())
        const email = AsyncStorage.getItem("token");
        AsyncStorage.getItem('token').then(token => {
            const headers = { headers: {'Authorization': `${token}`}}
            return axios.get(`${URI}/profile/detail?search=${query.query}`,headers)
            .then((res)=> {
                const result = res.data.data.filter(man => {
                    return man.email !== email
            })

                dispatch(TransferSuccess(result))
            }).catch((err)=> {
                const message = err.message
                dispatch(TransferError(message))
            })
        })
    }
}

 const TransferSend = (form) => {
    return (dispatch) =>{
        dispatch(TransferSendRequest())
        AsyncStorage.getItem('token').then(token => {
            const headers = { headers: {'Authorization': `${token}`}} 
            axios.post(`${process.env.REACT_APP_API}/transfer`,form,headers)
            .then((res)=> {
                dispatch(TransferSendSuccess(res))
            }).catch((err)=> {
                const message = err.message
                dispatch(TransferSendError(message))
            })
        })
    }
}


export{
    GetTransfer,
    GetTransferSearch,
    GetTransferById,
    GetTransferTemporary,
    TransferSend

}