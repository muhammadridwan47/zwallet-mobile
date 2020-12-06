import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URI } from '../utils';
const resetPassword = (data) =>
{
     const promise = new Promise((resolve, reject) => {
            AsyncStorage.getItem('token').then(token =>{
                const headers = { headers: {'Authorization':token}}
                axios.patch(`${URI}/auth/reset_password`,data,headers)
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
const createPin = (data) =>
{
     const promise = new Promise((resolve, reject) => {
                axios.patch(`${URI}/auth/create_pin`,data)
                .then((res)=>{
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err);
                })
     });
     return promise;
}

export{
    resetPassword,
    createPin
}
