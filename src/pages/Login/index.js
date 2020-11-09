import React,{useState,useEffect} from 'react';
import {Text, View,ScrollView,StyleSheet, TouchableOpacity} from 'react-native'
import { LinkAuth } from '../../components';
import { ButtonAuth, FormGroup } from '../../elements';
import {Gap} from '../../utils';
import { useSelector,useDispatch } from 'react-redux';
import { AuthLogin } from '../../redux/actions/Auth';
import { GetUsers } from '../../redux/actions/Users';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
    const [email,setEmail] = useState('angga@gmail.com')
    const [password,setPassword] = useState('12345678')
    const dispacth = useDispatch();
    const onHandleLogin = () => {
        dispacth(AuthLogin({email:email,password:password}))
    }
    
  return (
    <>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Gap height={76}/>
        <Text style={styles.zwallet}>Zwallet</Text>
        <Gap height={61}/>
        <View style={styles.container}>
            <Gap height={40}/>
            <Text style={styles.heading}>Login</Text>
            <Gap height={20}/>
            <Text style={styles.title}>Login to your existing account to access {'\n'} all the features in Zwallet.</Text>
            <Gap height={53}/>
            <FormGroup icon="mail" placeholder="Enter your e-mail" value={email} onChangeText={e => setEmail(e) } />
            <Gap height={60}/>
            <FormGroup icon="password" placeholder="Enter your password" value={password} onChangeText={e => setPassword(e) }  secureTextEntry tes={() => alert('waw')} />
            <Gap height={15}/>
            <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')} >
                <Text style={styles.forgotPassword} >Forgot password?</Text>
            </TouchableOpacity>
            <Gap height={75}/>
            {/* <ButtonAuth title="Login" onPress={() => navigation.navigate('Dashboard')}/> */}
            <ButtonAuth title="Login" onPress={() => onHandleLogin()}/>
            <Gap height={25}/>
            <LinkAuth title="Don’t have an account? Let’s " active="Sign Up" onPress={() => navigation.navigate('SignUp')}/>
            <Gap height={25}/>
        </View>
      </ScrollView>

    </>
  );
};


export default Login;


const styles = StyleSheet.create({
    scroll:{
        flex:1,
        backgroundColor:'rgb(250,252,255)'
    },
    zwallet:{
        textAlign:'center',
        fontSize:26,
        color:'#6379F4',
        fontWeight:'bold'
    },
    container:{
        backgroundColor:'#fff',
        flex:1,
        borderTopLeftRadius:35,
        borderTopRightRadius:35,
        shadowOpacity:0.75,
        elevation:75,
        paddingHorizontal:16
    },
    heading:{
        fontSize:24,
        color: '#3A3D42',
        fontWeight:'bold',
        textAlign:'center'
    },
    title:{
        textAlign:'center',
        color:'rgba(58, 61, 66, 0.6)',
        fontSize:16,
        lineHeight:23
    },
    forgotPassword:{
        textAlign:'right',
        color:'rgba(58, 61, 66, 0.8)',
        fontSize:14
    }



})


