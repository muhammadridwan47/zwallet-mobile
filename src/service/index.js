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
                    console.log('dari transaction detail: ',result.data)
                },(err) => {
                    reject(err);
                });
             })
            
     });
     return promise;
}
const UploadImage = (data) =>
{
    // console.log('dari servies:',data)

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


const API ={
    HistoryHome,
    TransactionDetail,
    UploadImage,
    UserAll,
    TransactionAll
}

export default API;