import React, { useState } from 'react'
import { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView ,TouchableOpacity, TextInput, Button} from 'react-native'
import { useSelector,useDispatch } from 'react-redux'
import { IcTopUp } from '../../assets'
import { GoBack } from '../../components'
import { CardTopUp } from '../../elements'
import { Gap, Midtrans } from '../../utils'
import Modal from 'react-native-modal';
import { WebView } from 'react-native-webview';
import API from '../../service'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GetUsers } from '../../redux/actions/Users'

export default function TopUp({navigation}) {
   const [modal,setModal] = useState(false)
   const [payment,setPayment] = useState(false)
   const topUp = useSelector(topup => topup.TopUp)
   const [data,setData] = useState([])
   const [page,setPage] = useState('')
   const [amount,setAmount] = useState('')
   const dispacth = useDispatch();

   useEffect(() => {
      topUp?.data && setData(topUp.data)
   }, [topUp])
    const pay = () => 
    {
        API.Midtrans({amount:amount})
        .then(token => {
            AsyncStorage.getItem('token').then(key => {
               dispacth(GetUsers({token:key}))
            })
            setPage(Midtrans(token))
            setPayment(true)
            setModal(false)
        })
    }
    return (
    <>
        <View style={styles.wrapper}>
            {
                payment === true &&
                <View style={{position:'absolute',backgroundColor:'#fff',width:'100%',height:'100%',zIndex:99}}>
                <View style={{paddingHorizontal:10}}>
                 <GoBack page="Exit" white onPress={() => navigation.navigate('Dashboard')}/>
                </View>
                 <Gap height={10}/>
                <WebView
                    style={{backgroundColor:'rgba(0,0,0,0.1)'}}
                    originWhitelist={['*']}
                    source={{ html: page }} />
                </View>
             }
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Gap height={20}/>
                    <GoBack page="Top Up" onPress={() => navigation.goBack()}/>
                    <Gap height={40}/>
                
                    <View style={styles.topUpCard}>
                        <TouchableOpacity onPress={() => setModal(true)}>
                            <IcTopUp/>
                        </TouchableOpacity>
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
            <Modal isVisible={modal}>
                <View style={{height:'50%',backgroundColor:'white',borderRadius:10,padding:20}}>
                    <ScrollView style={{height:'100%'}}>
                        <Gap height={50}/>
                        <View style={{paddingHorizontal:20}}>
                            <TextInput placeholder="amount" onChangeText={(e) => setAmount(e)} style={{borderBottomWidth:1,borderBottomColor:'rgba(169, 169, 169, 0.6)'}} keyboardType="numeric"/>
                        </View>
                    </ScrollView>
                    <Button title="Continue" onPress={() => pay()} />
                    <Gap height={10} />
                    <Button title="close" color="#FF5B37" onPress={() => setModal(false)} />
                </View>
             </Modal>

        </View>

    </>
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
