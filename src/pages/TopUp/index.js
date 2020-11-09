import React, { useState } from 'react'
import { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import { IcTopUp } from '../../assets'
import { GoBack } from '../../components'
import { CardTopUp } from '../../elements'
import { Gap } from '../../utils'

export default function TopUp({navigation}) {
   const topUp = useSelector(topup => topup.TopUp)
   const [data,setData] = useState([])
   useEffect(() => {
      topUp?.data && setData(topUp.data)
   }, [topUp])
    return (
        <View style={styles.wrapper}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Gap height={20}/>
                    <GoBack page="Top Up" onPress={() => navigation.goBack()}/>
                    <Gap height={40}/>
                
                    <View style={styles.topUpCard}>
                        <IcTopUp/>
                        <Gap width={15}/>
                        <View>
                            <Text style={styles.headingTopUp}>Virtual Account Number</Text>
                            <Text style={styles.topUpNumber}>2389 081393877946</Text>
                        </View>
                    </View>
                    <Gap height={25}/>
                    <Text style={styles.title}>We provide you virtual account number for top {'\n'} up via nearest ATM.</Text>
                    <Gap height={40} />
                    <Text style={styles.introduction}>How to Top-Up</Text>
                    <Gap height={25} />
                </View>
                <View style={styles.container}>
                    {
                        data.map((result,index) => {
                            return(
                                <View key={index}>
                                    <CardTopUp order={result.stepNumber} content={result.instruction}/>
                                    <Gap height={20}/>
                                </View>
                            )
                        })
                    }


                    <Gap height={40}/>
                </View>

            </ScrollView>
 

        </View>
    )
}


const styles = StyleSheet.create({
    wrapper:{
        backgroundColor:'rgb(250,252,255)',
        flex:1
    },
    container:{
        paddingHorizontal:16
    },
    topUpCard:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius:10,
        elevation:1,
        paddingVertical:20,
        paddingHorizontal:16
    },
    headingTopUp:{
        marginBottom:9,
        color:'#7A7886',
        fontSize:14
    },
    topUpNumber:{
        fontSize:16,
        color:'#4D4B57',
        fontWeight:'bold'
    },
    title:{
        textAlign:'center',
        color:'#7A7886',
        fontSize:16
    },
    introduction:{
        color:'#514F5B',
        fontSize:18,
        fontWeight:'bold'
    }


})
