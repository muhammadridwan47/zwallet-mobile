import React, { useState,useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,Button,Image} from 'react-native'
import { IcArrowUpGreen, IcArrowUpRed } from '../../assets'
import { GoBack} from '../../components'
import { CardPerson } from '../../elements'
import API from '../../service'
import { Gap } from '../../utils'
import Modal from 'react-native-modal';
import CalendarPicker from 'react-native-calendar-picker';

export default function History({navigation,route}) {
    const {id} = route.params;
    const [transaction,setTransaction] = useState([]);
    const [inCome,setInCome] = useState([]);
    const [outCome,setOutCome] = useState([]);
    // calender 
    const [modal,setModal] = useState(false)
    const [selectedStartDate,setSelectedStartDate] = useState()
    const [selectedEndDate,setSelectedEndDate] = useState()
    const minDate = new Date(2017, 6, 3); // Today
    const maxDate = new Date(2024, 6, 3);
    const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
    const endDate = selectedEndDate ? selectedEndDate.toString() : '';

    const onDateChange = (date, type) => {

        if (type === 'END_DATE') {
          setSelectedEndDate(date)
        } else {
          setSelectedStartDate(date)
          setSelectedEndDate(null)
        }
      }


    useEffect(() => {
        API.HistoryHome().then(res => {
            setTransaction(res.data)
            const outMoney = res.data.filter(data => {
                return data.receiver !== id
            })
            setOutCome(outMoney)
            const addMoney = res.data.filter(data => {
                return data.receiver == id
            })
            setInCome(addMoney)
        })
        API.HistoryHome().then(res => {


        })
    },[])
    const reverseDataOut = () => 
    {
        setTransaction(outCome)
    }

    const reverseDataIn = () =>
    {
        setTransaction(inCome)
    }
    return (
        <>
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <GoBack page="History" onPress={() => navigation.goBack() }/>
                    <Gap height={38} />
                    <Text style={styles.thisWeek}>This Week</Text>
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
                <View style={styles.container}>
                   <Gap height={40} />
                   <Text style={styles.thisWeek}>This Month</Text>
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
            <View style={styles.scroll}>
                <Gap height={10} />
                <View style={styles.menu}>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={styles.subMenu} onPress={() => reverseDataOut()}>
                            <IcArrowUpRed/>
                        </TouchableOpacity>
                        <Gap width={20}/>
                        <TouchableOpacity style={styles.subMenu} onPress={() => reverseDataIn()}>
                            <IcArrowUpGreen/>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => setModal(true)} style={styles.filterDate} >
                        <Text style={styles.dateTitle}>Filter by Date</Text>
                    </TouchableOpacity>
                </View>
                <Gap height={10} />
            </View>


        <Modal isVisible={modal} style={{width:'100%',margin:0,}}>
            <Gap height={139}/>
         <View style={{height:674}}>
                <View style={{flex: 1,backgroundColor: '#fff',borderTopLeftRadius:35,borderTopRightRadius:35}}>
                    <Gap height={30}/>
                    <Text style={{textAlign:'center',marginBottom:20,color:'#514F5B',fontWeight:'bold',fontSize:18}}>Filter by Date</Text>
                    <CalendarPicker
                    startFromMonday={true}
                    allowRangeSelection={true}
                    minDate={minDate}
                    maxDate={maxDate}
                    todayBackgroundColor="#6379F4"
                    selectedDayColor="rgba(99, 121, 244, 0.2);"
                    selectedDayTextColor="#FFFFFF"
                    onDateChange={onDateChange}
                    />
                    <View style={{flexDirection:'row',padding:16}}>
                    <View style={{width:'100%',flex:1}}>
                        <Text >From</Text>
                        <Text>{ startDate }</Text>
                    </View>
                    <View style={{width:'100%',flex:1}}>
                        <Text>To</Text>
                        <Text>{ endDate }</Text>
                    </View>
                    </View>
                    <View style={{paddingHorizontal:16}}>
                    <TouchableOpacity onPress={() => setModal(false)} style={{paddingVertical:16,backgroundColor:'#6379F4',borderRadius:12}}>
                        <Text style={{textAlign:'center',fontSize:18,fontWeight:'bold',color:'#fff'}}>Apply</Text>
                    </TouchableOpacity>
                    </View>
                
                </View>





          </View>
        </Modal>
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
    thisWeek:{
        fontSize:16,
        color:'#7A7886'
    },
    menu:{
        flexDirection:'row',
        backgroundColor:'rgb(250,252,255)',
        paddingHorizontal:16,
        justifyContent:'space-between'
    },
    subMenu:{
        padding:14,
        backgroundColor:'#fff',
        borderRadius:12,
        elevation:3
    },
    filterDate:{
        paddingHorizontal:38,
        paddingVertical:16,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
        elevation:3,
        borderRadius:12,
        
    },
    dateTitle:{
        fontSize:18,
        fontWeight:'bold',
        color:'#6379F4'
    }
})
