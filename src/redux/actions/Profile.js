import axios from 'axios'
import qs from 'qs'

const DeletePhoneRequest = ()=> {
    return{
        type: 'DELETE_PHONE_REQUEST'
    }
}

const DeletePhoneSuccess = (data)=> {
    return{
        type: 'DELETE_PHONE_SUCCESS',
        payload: data
    }
}
const DeletePhoneError = (error)=> {
    return{
        type: 'DELETE_PHONE_ERROR',
        payload: error
    }
}

// Add Phone Number 
const AddPhoneRequest = ()=> {
    return{
        type: 'ADD_PHONE_REQUEST'
    }
}

const AddPhoneSuccess = (data)=> {
    return{
        type: 'ADD_PHONE_SUCCESS',
        payload: data
    }
}
const AddPhoneError = (error)=> {
    return{
        type: 'ADD_PHONE_ERROR',
        payload: error
    }
}

//  Change Password
const ChangePasswordRequest = ()=> {
    return{
        type: 'CHANGE_PASSWORD_REQUEST'
    }
}

const ChangePasswordSuccess = (data)=> {
    return{
        type: 'CHANGE_PASSWORD_SUCCESS',
        payload: data
    }
}
const ChangePasswordError = (error)=> {
    return{
        type: 'CHANGE_PASSWORD_ERROR',
        payload: error
    }
}

//  Change pin
const ChangePinRequest = ()=> {
    return{
        type: 'ADD_CHANGE_PIN_REQUEST'
    }
}

const ChangePinSuccess = (data)=> {
    return{
        type: 'ADD_CHANGE_PIN_SUCCESS',
        payload: data
    }
}
const ChangePinError = (error)=> {
    return{
        type: 'ADD_CHANGE_PIN_ERROR',
        payload: error
    }
}



export const DeletePhoneNumber = (id) => {
    return (dispatch) =>{
        dispatch(DeletePhoneRequest())

        // console.log('isi dari get user: ',fields.token.accessToken)
        let data = {
            phone : '-'
        }
        data = qs.stringify(data);
        const token = JSON.parse(localStorage.getItem("token"));
        const headers = { headers: {'Authorization': `Bearer ${token.accessToken}`}}  
        axios.patch(`${process.env.REACT_APP_API}/profile/${id}`,data,headers)
        .then((res)=> {
            const data = res.data
            dispatch(DeletePhoneSuccess(data))
        }).catch((err)=> {
            const message = err.message
            dispatch(DeletePhoneError(message))
        })
    }
}

export const AddPhoneNumberAction = (id,number) => {
    return (dispatch) =>{
        dispatch(AddPhoneRequest())
        // console.log('ini dari add phone: ',id,number)
        // console.log('isi dari get user: ',fields.token.accessToken)
        let value = '+62';
        let data = {
            phone : value + number
        }
        const token = JSON.parse(localStorage.getItem("token"));
        const headers = { headers: {'Authorization': `Bearer ${token.accessToken}`}}  
        data = qs.stringify(data);
        axios.patch(`${process.env.REACT_APP_API}/profile/${id}`,data,headers)
        .then((res)=> {
            const data = res.data
            dispatch(AddPhoneSuccess(data))
        }).catch((err)=> {
            const message = err.message
            dispatch(AddPhoneError(message))
        })
    }
}

export const ChangePasswordAction = (id,newPassword) => {
    return (dispatch) =>{
        dispatch(ChangePasswordRequest())
        // console.log('ini dari add changepassword: ',id,newPassword)
        // console.log('isi dari get user: ',fields.token.accessToken)
        let data = {
            password : newPassword
        }
        data = qs.stringify(data);
        const token = JSON.parse(localStorage.getItem("token"));
        const headers = { headers: {'Authorization': `Bearer ${token.accessToken}`}}  
        axios.patch(`${process.env.REACT_APP_API}/profile/${id}`,data,headers)
        .then((res)=> {
            const data = res.data
            dispatch(ChangePasswordSuccess(data))
        }).catch((err)=> {
            const message = err.message
            dispatch(ChangePasswordError(message))
        })
    }
}

export const ChangePinAction = (id,pin) => {
    return (dispatch) =>{
        dispatch(ChangePinRequest())
        console.log('ini dari  change pin: ',id,pin)
        // console.log('isi dari get user: ',fields.token.accessToken)
        let data = qs.stringify(pin);
        const token = JSON.parse(localStorage.getItem("token"));
        const headers = { headers: {'Authorization': `Bearer ${token.accessToken}`}}  
        axios.patch(`${process.env.REACT_APP_API}/profile/${id}`,data,headers)
        .then((res)=> {
            const data = res.data
            dispatch(ChangePinSuccess(data))
        }).catch((err)=> {
            const message = err.message
            dispatch(ChangePinError(message))
        })
    }
}
