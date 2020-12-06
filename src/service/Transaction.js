import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URI } from '../utils';

const GetDataTransfer = (limit) =>
{
     const promise = new Promise((resolve, reject) => {
            AsyncStorage.getItem('token').then(token =>{
                const headers = { headers: {'Authorization': `${token}`}}
                axios.get(`${URI}/user/all?sortBy=fullName&sortType=ASC&limit=${limit}&page=0`,headers)
                .then(res =>{
                    resolve(res.data.data)
                }).catch(err => {
                //   console.log(err)
                });
             })
            
     });
     return promise;
}

const MaxData = () =>
{
     const promise = new Promise((resolve, reject) => {
            AsyncStorage.getItem('token').then(token =>{
                const headers = { headers: {'Authorization': `${token}`}}
                axios.get(`${URI}/user/all?sortBy=fullName&sortType=ASC&limit=999&page=0`,headers)
                .then(res =>{
                    const result = res.data.data
                    resolve(result.length)
                }).catch(err => {
                //   console.log(err)
                });
             })
            
     });
     return promise;
}

const MoreData = (limit) =>
{
     const promise = new Promise((resolve, reject) => {
            AsyncStorage.getItem('token').then(token =>{
                const headers = { headers: {'Authorization': `${token}`}}
                axios.get(`${URI}/user/all?sortBy=fullName&sortType=ASC&limit=${limit + 4}&page=0`,headers)
                .then(res =>{
                    const result = res.data.data
                    resolve(result)
                }).catch(err => {
                //   console.log(err)
                });
             })
            
     });
     return promise;
}
const SearchReceiver = (query,limit) =>
{
     const promise = new Promise((resolve, reject) => {
            AsyncStorage.getItem('token').then(token =>{
                const headers = { headers: {'Authorization': `${token}`}}
                axios.get(`${URI}/user/all?search=${query}&sortBy=fullName&sortType=ASC&limit=${limit}&page=0`,headers)
                .then(res =>{
                    const result = res.data.data
                    resolve(result)
                }).catch(err => {
                //   console.log(err)
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
                })
                .catch(err => {
                    reject(err);
                })
             })
            
     });
     return promise;
}
const pinConfirmation = (data) =>
{
     const promise = new Promise((resolve, reject) => {
            AsyncStorage.getItem('token').then(token =>{
                const headers = { headers: {'Authorization':token}}
                axios.post(`${URI}/transaction/`,data,headers)
                .then((res)=>{
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err);
                })
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
                })
                .catch(err => {
                    reject(err);
                })
             })
     });
     return promise;
}

export {
    GetDataTransfer,
    MaxData,
    MoreData,
    SearchReceiver,
    TransactionDetail,
    pinConfirmation,
    TransactionAll
}