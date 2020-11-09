import React,{useEffect} from 'react'
import { useState } from 'react'
import { View, Text,Image, ScrollView,StyleSheet, TouchableOpacity} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Foto, IcBell,IcArrowUp,IcPlus } from '../../assets'
import { LinkHistory } from '../../components'
import { CardPerson } from '../../elements'
import { GetTopUp } from '../../redux/actions/TopUp'
import { GetTransfer } from '../../redux/actions/Transfer'
import API from '../../service'
import { Gap} from '../../utils'

export default function Dashboard({navigation}) {
    const User = useSelector((s)=> s.Users)
    const [dashboard,setDashboard] = useState([]);
    const [transaction,setTransaction] = useState([]);
    const dispacth = useDispatch();

    useEffect(() => {
        User?.data?.data && setDashboard(User?.data?.data[0])
        API.HistoryHome().then(res => {
            setTransaction(res.data)
            console.log('dari dashboard: ',res)
            console.log('dari tran: ',transaction)
        })
        console.log(dashboard)
    },[User,transaction])

    const handleTopUp = () =>
    {
        dispacth(GetTopUp())
        navigation.navigate('TopUp')
    }
    const handleTransfer = () =>
    {
        dispacth(GetTransfer())
        navigation.navigate('FindReceiver')
    }
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Gap height={20}/>
                <View style={styles.wrapperContent}>
                    <View style={styles.Profile}>
                        <TouchableOpacity style={styles.profileWrapper} onPress={()=> navigation.navigate('Profile')}>
                            <Image source={{uri:dashboard?.img}}  style={styles.image}/>
                            <Gap width={20}/>
                            <View>
                                <Text style={styles.profileTitle}>Hello,</Text>
                                <Text style={styles.profileName}>{dashboard?.fullName}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> navigation.navigate('Notification',{id:dashboard?.id})}>
                          <IcBell/>
                        </TouchableOpacity>
                    </View>

                    <Gap height={39} />
                    <TouchableOpacity activeOpacity={0.8} style={styles.creditWrapper} onPress={()=> navigation.navigate('DetailTransaction',{id:dashboard?.id})}>
                        <Text style={styles.creditBalance}>Balance</Text>
                        <Gap height={10} />
                        <Text style={styles.credit}>Rp{dashboard?.balance}</Text>
                        <Gap height={10} />
                        <Text style={styles.phoneNumber}>{dashboard?.phoneNumber && '+'+dashboard?.phoneNumber}</Text>
                    </TouchableOpacity>
                    <Gap height={30} />
                    <View style={styles.wrapperButton}>
                        <TouchableOpacity onPress={() => handleTransfer()} style={styles.transferButton}>
                            <IcArrowUp/>
                            <Gap width={14}/>
                            <Text style={styles.transferTitle}>Transfer</Text>
                        </TouchableOpacity>  
                        <Gap width={20}/>
                        <TouchableOpacity onPress={() => handleTopUp()} style={styles.transferButton}>
                            <IcPlus/>
                            <Gap width={14}/>
                            <Text style={styles.transferTitle}>Top Up</Text>
                        </TouchableOpacity>  
                    </View>
                    <Gap height={40}/>
                    <LinkHistory onPress={() => navigation.navigate('History',{id:dashboard?.id})}/>
                </View>
                <Gap height={25}/>
                {
                    transaction.map((data,index) => {
                        return(
                                <View key={index}>
                                    <CardPerson name={data.receiveBy} amount={data.amountTransfer}  img={data.img} transfer="Transfer" idProfile={dashboard?.id} idReceiver={data.receiver} />
                                    <Gap  height={20}/>
                                </View>
                        )
                    })
                }

        
            </ScrollView>

        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgb(250,252,255)',
        flex:1
    },
    wrapperContent:{
        paddingHorizontal:16
    },
    Profile:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    profileWrapper:{
        flexDirection:'row',
        alignItems:'center'
    },
    profileTitle:{
        fontSize:18,
        color:'rgb(100,100,100)'
    },
    profileName:{
        fontWeight:'bold',
        fontSize:18,
        color:'#514F5B'
    },
    creditWrapper:{
        width:'100%',
        backgroundColor:'#6379F4',
        borderRadius:20,
        padding:25
    },
    creditBalance:{
        color:'#D0D0D0',
        fontSize:14
    },
    credit:{
        color:'#fff',
        fontSize:24,
        fontWeight:'bold'
    },
    phoneNumber:{
        color:'#DFDCDC',
        fontSize:14
    },
    wrapperButton:{
        flexDirection:'row'
    },
    transferButton:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        backgroundColor:'#E5E8ED',
        paddingVertical:16,
        borderRadius:10
    },
    transferTitle:{
        color:'#514F5B',
        fontSize:18,
        fontWeight:'bold'
    },
    image:{
        width:52,
        height:52,
        borderRadius:10
    }

})