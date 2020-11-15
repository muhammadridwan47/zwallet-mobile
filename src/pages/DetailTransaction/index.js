import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView} from 'react-native'
import { useSelector } from 'react-redux'
import { IcArrowUpGreen, IcArrowUpRed, IcChart } from '../../assets'
import { GoBack, LinkHistory } from '../../components'
import { CardPerson } from '../../elements'
import API from '../../service'
import { Gap } from '../../utils'

export default function DetailTransaction({navigation,route}) {
    const {id} = route.params;
    // console.log(id)
    const [transaction,setTransaction] = useState([]);
    const [payment,setPayment] = useState({income:'',outcome:''});

    useEffect(() => {
        API.TransactionDetail()
        .then(res =>{
            // console.log('isi dari transaction detail :',res.data)
            setTransaction(res.data)
            setPayment({income:res.income,outcome:res.outcome})
        })
    }, [])
    return (
        <>
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <GoBack page="Transaction" onPress={() => navigation.goBack() }/>
                    <Gap height={52} />
                        <View style={styles.TransactionWrapper}>
                            <View>
                                <IcArrowUpGreen/>
                                <Gap height={15}/>
                                <Text style={styles.transactionTitle}>Income</Text>
                                <Gap height={8}/>
                                <Text style={styles.TransactionMoney}>Rp{payment.income}</Text>
                            </View>
                            <Gap width={78}/>
                            <View>
                                <IcArrowUpRed/>
                                <Gap height={15}/>
                                <Text style={styles.transactionTitle}>Expense</Text>
                                <Gap height={8}/>
                                <Text style={styles.TransactionMoney}>Rp{payment.outcome}</Text>
                            </View>
                        </View>
                    <Gap height={40}/>
                    <Text style={styles.inThisWeek}>In This Week</Text>
                    <Gap height={75} />

                    <View style={{justifyContent:'space-between',alignItems:'center'}}>
                        {/* <IcChart/>
                        <Gap height={50}/>
                        <Text>di atas adalah svg figma</Text>
                        <Gap height={50}/> */}

                        <View >
                            <View style={{flexDirection:'row',alignItems:'flex-end',height:223}}>
                                  <View style={{alignItems:'center'}}>
                                     <View style={{width:14,height:'100%',backgroundColor:'#6379F4',borderRadius:15}}></View>
                                     <Text style={{fontSize:14,color:'#8F8F8F',marginTop:15}}>
                                         Sat
                                     </Text>
                                  </View>
                                  <Gap width={38}/>
                                  <View style={{alignItems:'center'}}>
                                     <View style={{width:14,height:'30%',backgroundColor:'#6379F4',borderRadius:15}}></View>
                                     <Text style={{fontSize:14,color:'#8F8F8F',marginTop:15}}>
                                        Sun
                                     </Text>
                                  </View>
                                  <Gap width={38}/>
                                  <View style={{alignItems:'center'}}>
                                  <View style={{width:14,height:'70%',backgroundColor:'#9DA6B5',borderRadius:15}}></View>
                                      <Text style={{fontSize:14,color:'#8F8F8F',marginTop:15}}>
                                         Mon
                                      </Text>
                                  </View>
                                  <Gap width={38}/>
                                  <View style={{alignItems:'center'}}>
                                      <View style={{backgroundColor:'red',alignItems:'center'}}>

                                        <View style={{paddingHorizontal:5,paddingVertical:11,backgroundColor:'white',width:92,height:29,position:'absolute',justifyContent:'center',alignItems:'center',bottom:'105%',borderRadius:6,elevation:3,}}>
                                            <Text style={{position:'absolute',width:80,color:'#1EC15F',textAlign:'center',fontWeight:'bold'}}>
                                                +Rp65.000
                                            </Text>
                                        </View>
                                        <Gap height={15} />
                                      </View>

                                      <View style={{backgroundColor:'#fff',width:24,height:24,borderRadius:24/2,justifyContent:'center',alignItems:'center',elevation:4,marginBottom:-10}}>
                                          <View style={{width:14,height:14,backgroundColor:'#6379F4',borderRadius:14/2}}></View>
                                      </View>
                                    <View style={{width:14,height:'78%',backgroundColor:'#9DA6B5',borderRadius:15}}></View>
                                    <Text style={{fontSize:14,color:'#8F8F8F',marginTop:15}}>
                                        Tue
                                    </Text>
                                  </View>
                                  <Gap width={38}/>
                                  <View style={{alignItems:'center'}}>
                                    <View style={{width:14,height:'70%',backgroundColor:'#9DA6B5',borderRadius:15}}></View>
                                    <Text style={{fontSize:14,color:'#8F8F8F',marginTop:15}}>
                                       Wed
                                    </Text>
                                  </View>
                                  <Gap width={38}/>
                                  <View style={{alignItems:'center'}}>
                                    <View style={{width:14,height:'95%',backgroundColor:'#6379F4',borderRadius:15}}></View>
                                     <Text style={{fontSize:14,color:'#8F8F8F',marginTop:15}}>
                                        Thu
                                    </Text>
                                  </View>
                                  <Gap width={38}/>
                                  <View style={{alignItems:'center'}}>
                                    <View style={{width:14,height:'70%',backgroundColor:'#9DA6B5',borderRadius:15}}></View>
                                    <Text style={{fontSize:14,color:'#8F8F8F',marginTop:15}}>
                                      Fri
                                    </Text>
                                  </View>
                            </View>
                        </View>
                    </View>

                    <Gap height={50} />
                    <LinkHistory onPress={() => navigation.navigate('History',{id:id})}/>
                    <Gap height={25} />
                </View>
                {
                    transaction.map((data,index) => {
                        return(
                                <View key={index}>
                                    <CardPerson name={data.receiveBy} amount={data.amountTransfer}  img={data.img} transfer="Transfer" idProfile={id} idReceiver={data.receiver} />
                                    <Gap  height={20}/>
                                </View>
                        )
                    })
                }

            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    scroll:{
        backgroundColor:'rgb(250,252,255)',
    },
    container:{
        paddingHorizontal:16,
    },
    TransactionWrapper:{
        justifyContent:"center",
        flexDirection:'row',
        width:'100%',
        backgroundColor:'#6379F4',
        borderRadius:20,
        padding:25
    },
    transactionTitle:{
        color:'#D0D0D0',
        fontSize:14
    },
    TransactionMoney:{
        color:'#F1F1F1',
        fontSize:18,
        fontWeight:'bold'
    },
    inThisWeek:{
        fontSize:18,
        color:'#514F5B',
        fontWeight:'bold'
    }
})
