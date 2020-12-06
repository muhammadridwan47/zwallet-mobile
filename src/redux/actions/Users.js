import Axios from 'axios'
import { URI } from '../../utils'

const UsersRequest = ()=> {
    return{
        type: 'USERS_REQUEST'
    }
}

const UsersSuccess = (data)=> {
    return{
        type: 'USERS_SUCCESS',
        payload: data
    }
}
const UsersError = (error)=> {
    return{
        type: 'USERS_ERROR',
        payload: error
    }
}

export const GetUsers = (fields) => {
    return (dispatch) =>{
        dispatch(UsersRequest())
        const headers = { headers: {'Authorization': fields.token}}
        return Axios.get(`${URI}/user`,headers)
        .then((res)=> {
            const data = res.data.data[0]
            dispatch(UsersSuccess(data))
        }).catch((err)=> {
            const message = err.message
            dispatch(UsersError(message))
        })
    }
}
