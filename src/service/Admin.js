import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URI } from '../utils';
const UserAll = () =>
{

     const promise = new Promise((resolve, reject) => {
            AsyncStorage.getItem('token').then(token =>{
                const headers = { headers: {'Authorization':token }}
                axios.get(`${URI}/user/all`,headers)
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
    UserAll
}