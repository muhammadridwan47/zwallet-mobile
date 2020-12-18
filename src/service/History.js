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
                })
                .catch(err => {
                    reject(err);
                })
             })
            
     });
     return promise;
}

const HistoryByDate = (dateStart,endDate) =>
{
     const promise = new Promise((resolve, reject) => {
            AsyncStorage.getItem('token').then(token =>{
                const headers = { headers: {'Authorization':token,'start':dateStart,'until':endDate }}
                axios.get(`${URI}/transaction/history`,headers)
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
    HistoryHome,
    HistoryByDate
}