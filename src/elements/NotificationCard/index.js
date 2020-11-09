import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { IcArrowUpGreen, IcArrowUpRed } from '../../assets';
import { Gap } from '../../utils';

export default function NotificationCard({amountTransfer,status,receiveBy,receiver,id}) {
    return (
        <View style={styles.notificationCard}>
          
            {
                receiver !== id ? <IcArrowUpRed/> : <IcArrowUpGreen/>
            }
            <Gap width={15}/>
            <View>
                <Text style={styles.cardTitle}>{status} to {receiveBy}</Text>
                <Text style={styles.amount}>Rp{amountTransfer}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      paddingHorizontal:16,
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

    },
    notificationCard:{
        flexDirection:'row',
        backgroundColor:'#fff',
        elevation:3,
        paddingVertical:20,
        paddingHorizontal:25,
        borderRadius:10
    },
    cardTitle:{
        color:'#7A7A7A',
        fontSize:14,
        marginBottom:8
    },
    amount:{
        color:'#43484F',
        fontWeight:'bold',
        fontSize:18
    }


    
});