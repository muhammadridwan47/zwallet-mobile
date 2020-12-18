import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URI } from '../utils';
const addPhoneNumber = (data) =>
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
const changePin = (data) =>
{
     const promise = new Promise((resolve, reject) => {
            AsyncStorage.getItem('token').then(token =>{
                const headers = { headers: {'Authorization':token}}
                axios.patch(`${URI}/user/change_pin`,data,headers)
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

const deletePhoneNumber = (data) =>
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
const rename = (data) =>
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

const changePassword = (data) =>
{
     const promise = new Promise((resolve, reject) => {
            AsyncStorage.getItem('token').then(token =>{
                const headers = { headers: {'Authorization':token}}
                axios.patch(`${URI}/user/change_password`,data,headers)
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

const UploadImage = (data) =>
{
     const promise = new Promise((resolve, reject) => {
        AsyncStorage.getItem('token').then(token =>{
            const header = { headers: {
                'Authorization': `${token}`,
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json'
            }}
            axios.patch(`${URI}/user/patch_user`,data, header)
            .then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
     });
     return promise;
}

export {
    addPhoneNumber,
    changePin,
    deletePhoneNumber,
    changePassword,
    UploadImage,
    rename
}