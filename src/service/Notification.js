import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URI } from '../utils';
const FireBase = (receive,name,amount) =>
{
     const promise = new Promise((resolve, reject) => {
        const adminKey = 'key=AAAAQyauoIU:APA91bENmxPy-HukgvZJXeKiSGSZTir_eyMAWBw5o5TQXA0YGt7dxqVt3WRBHihJHCJ0P4Wh-hEzbHLzDO5v3Ow15fgQ8C43Ff50jXnTIbXMBTxpxUQKautDui_SsfUxdJpRnw9Tr8yx'
        const URI = 'https://fcm.googleapis.com/fcm/send';
        const headers = { headers: {'Authorization': adminKey,'Content-Type':'application/json'}}    
        const data = 
        {
            "to" : receive,
            "notification" : {
                "title" : "Transaction",
                "body" : `Transfer ${name} with amount ${amount}`,
                "priority" : "high",
            }
        }
        axios.post(`${URI}`,data,headers)
        .then(res => {
        })
        .catch(err => {
        })
     });
     return promise;
}

const FCM = (data) =>
{
     const promise = new Promise((resolve, reject) => {
            AsyncStorage.getItem('token').then(token =>{
                const headers = { headers: {'Authorization':token}}
                axios.patch(`${URI}/user/patch_user`,data,headers)
                .then((result)=>{
                    resolve(result.data);
                })
                .catch(err => {
                    reject(err);
                })
             })
     });
     return promise;
}

export{
    FireBase,
    FCM
}