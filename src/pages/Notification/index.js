import React,{useState} from 'react'
import { View, Text, StyleSheet, ScrollView} from 'react-native'
import { useEffect } from 'react/cjs/react.development';
import { GoBack } from '../../components';
import {NotificationCard } from '../../elements';
import API from '../../service';
import { Gap } from '../../utils';


export default function Notification({navigation,route}) {
    const {id} = route.params;
    const [transaction,setTransaction] = useState([])
    useEffect(() => {
        API.HistoryHome().then(res => {
            setTransaction(res.data)
        })
        console.log(transaction)
        console.log('dari params: ',id)
    },[])
    
    return (
    <>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.wrapper}>
                <Gap height={20}/>
                <GoBack page="Notification" onPress={()=> navigation.goBack()}/>
                <Gap height={40}/>
                <Text style={styles.title}>Today</Text>
                <Gap height={53}/>
                {
                    transaction.map((result,index) => {
                        return(
                            <View key={index}>
                                <NotificationCard status={result.status} amountTransfer={result.amountTransfer} receiveBy={result.receiveBy} receiver={result.receiver} id={id} />
                                <Gap height={20}/>
                           </View>
                        )
                       
                    })
                }
            
                <Gap height={40}/>
            </View>
            <View style={styles.wrapper}>
                 <Text style={styles.title}>This Week</Text>
                 <Gap height={25}/>
                 {
                    transaction.map((result,index) => {
                        return(
                            <View key={index}>
                                <NotificationCard status={result.status} amountTransfer={result.amountTransfer} receiveBy={result.receiveBy} receiver={result.receiver} id={id} />
                                <Gap height={20}/>
                           </View>
                        )
                       
                    })
                }
                <Gap height={25}/>
            </View>

        </ScrollView>
    </>
    )
}
const styles = StyleSheet.create({
    container: {
      flex:1,
    //   paddingHorizontal:16,
      backgroundColor:'rgb(250,252,255)'
    },
    wrapper: {
      paddingHorizontal:16,
      backgroundColor:'rgb(250,252,255)'
    },
    title:{
        lineHeight:27,
        fontSize:16,
        color:'#7A7886'

    }    
});