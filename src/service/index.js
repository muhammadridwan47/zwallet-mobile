import {GetDataTransfer,MaxData,MoreData,SearchReceiver,TransactionDetail,pinConfirmation,TransactionAll,Midtrans} from './Transaction'
import {addPhoneNumber,changePin,deletePhoneNumber,changePassword,UploadImage,rename} from './Profile'
import {UserAll} from './Admin'
import {HistoryHome,HistoryByDate} from './History'
import {FCM,FireBase} from './Notification'
import {resetPassword,createPin} from './Auth'

const API ={
    HistoryHome,
    TransactionDetail,
    UploadImage,
    UserAll,
    TransactionAll,
    HistoryByDate,
    FireBase,
    FCM,
    addPhoneNumber,
    deletePhoneNumber,
    changePassword,
    changePin,
    resetPassword,
    pinConfirmation,
    createPin,
    GetDataTransfer,
    MaxData,
    MoreData,
    SearchReceiver,
    Midtrans,
    rename
}

export default API;