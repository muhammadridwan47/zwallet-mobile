import { combineReducers } from 'redux'
import Auth,{SignUp} from './Auth'
import Users from './Users'
import Loading from './Loading'
import Transfer from './Transfer'
import {TransferById,TransferSend} from './Transfer'
import TopUp from './TopUp'
import {DeletePhone,AddPhone,changePassword,changePin} from './Profile'


const reducers = combineReducers({
    Auth,
    Users,
    Transfer,
    TransferById,
    TransferSend,
    TopUp,
    DeletePhone,
    AddPhone,
    changePassword,
    changePin,
    SignUp,
    Loading
})

export default reducers