import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URI } from '../utils';
const HistoryHome = () =>
{
     const promise = new Promise((resolve, reject) => {
            AsyncStorage.getItem('token').then(token =>{
                const headers = { headers: {'Authorization':token }}
                axios.get(`${URI}/transaction/history`,headers)
                .then((result)=>{
                    resolve(result.data.data);
                    // console.log('dari : ',result.data)
                },(err) => {
                    reject(err);
                });
             })
            
     });
     return promise;
}
const TransactionDetail = () =>
{
     const promise = new Promise((resolve, reject) => {
            AsyncStorage.getItem('token').then(token =>{
                const headers = { headers: {'Authorization':token }}
                axios.get(`${URI}/transaction/detail`,headers)
                .then((result)=>{
                    resolve(result.data.data);
                    // console.log('dari transaction detail: ',result.data)
                },(err) => {
                    reject(err);
                });
             })
            
     });
     return promise;
}
const UploadImage = (data) =>
{
     const promise = new Promise((resolve, reject) => {
            AsyncStorage.getItem('token').then(token =>{
                const headers = { headers: {'Authorization':token }}
                axios.patch(`${URI}/user/patch_user`,data,headers)
                .then((result)=>{
                    resolve(result.data);
                },(err) => {
                    reject(err);
                });
             })
     });
     return promise;
}

const UserAll = () =>
{

     const promise = new Promise((resolve, reject) => {
            AsyncStorage.getItem('token').then(token =>{
                const headers = { headers: {'Authorization':token }}
                axios.get(`${URI}/user/all`,headers)
                .then((result)=>{
                    resolve(result.data);
                },(err) => {
                    reject(err);
                });
             })
     });
     return promise;
}
const TransactionAll = () =>
{

     const promise = new Promise((resolve, reject) => {
            AsyncStorage.getItem('token').then(token =>{
                const headers = { headers: {'Authorization':token }}
                axios.get(`${URI}/transaction/all`,headers)
                .then((result)=>{
                    resolve(result.data);
                },(err) => {
                    reject(err);
                });
             })
     });
     return promise;
}

const HistoryByDate = (dateStart,endDate) =>
{
     const promise = new Promise((resolve, reject) => {
            AsyncStorage.getItem('token').then(token =>{
                const headers = { headers: {'Authorization':token,'start':dateStart,'until':endDate }}
                console.log(headers)
                axios.get(`${URI}/transaction/history`,headers)
                .then((result)=>{
                    // console.log('di terima')
                    resolve(result.data);
                },(err) => {
                    // console.log('di tolak')
                    reject(err);
                });
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
                    // console.log('di terima')
                    resolve(result.data);
                },(err) => {
                    // console.log('di tolak')
                    reject(err);
                });
             })
     });
     return promise;
}

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
            // console.log('hasil dari firebase: ',res.data)
        })
        .catch(err => {
            // console.log('Gagal dari firebase: ',err)
        })
     });
     return promise;
}

const API ={
    HistoryHome,
    TransactionDetail,
    UploadImage,
    UserAll,
    TransactionAll,
    HistoryByDate,
    FireBase,
    FCM
}

export default API;