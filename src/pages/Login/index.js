import React,{useState,useEffect} from 'react';
import {Text, View,ScrollView,StyleSheet, TouchableOpacity} from 'react-native'
import { LinkAuth } from '../../components';
import { ButtonAuth, FormGroup } from '../../elements';
import {Gap} from '../../utils';
import { useSelector,useDispatch } from 'react-redux';
import { AuthLogin } from '../../redux/actions/Auth';
import { showMessage} from "react-native-flash-message";
const Login = ({navigation}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [showKey,setShowKey] = useState(true)
    const [errorHandling,setError] = useState(false)
    const [active,setActive] = useState(false)
    const dispacth = useDispatch();
    const Auth = useSelector((s)=> s.Auth)
    useEffect(() => {
             Auth.isStatus === false ? setError(true) : setError(false)
    },[Auth])

    const form = (eml,pass) =>
    {
        setEmail(eml)
        setPassword(pass)
        eml !== '' && pass !== '' ? (setActive(true),setError(false)) : setActive(false)
    }

    const onHandleLogin = async () => {

        if (!email) {
            showMessage({
                message: "Email is required",
                type: "danger",
              });
            return false
        }
        if (!password) {
            showMessage({
                message: "Password is required",
                type: "danger",
              });
            return false
        }

        dispacth(AuthLogin({email:email,password:password}))
    }

    const showPassword = (value) => 
    {
        const key = value === false ? true : false
        setShowKey(key)
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
            <FormGroup icon="mail" placeholder="Enter your e-mail" value={email} error={errorHandling} onChangeText={e => form(e,password) } />
            <Gap height={60}/>
            <FormGroup icon="password" placeholder="Enter your password" value={password}  onChangeText={e => form(email,e) }  secureTextEntry={showKey} error={errorHandling} showPassword={() => showPassword(showKey)} />
            <Gap height={15}/>
            <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')} >
                <Text style={styles.forgotPassword} >Forgot password?</Text>
            </TouchableOpacity>
            {
                errorHandling === true ? <Gap height={20}/> : <Gap height={75}/>
            }
            {
               errorHandling == true && <Text style={{fontSize:16,color:'#FF5B37',textAlign:'center',marginBottom:27}}>Email or Password Invalid</Text>
            }
            <ButtonAuth active={active} title="Login" onPress={() => onHandleLogin()}/>
            <Gap height={25}/>
            <LinkAuth  title="Don’t have an account? Let’s " active="Sign Up" onPress={() => navigation.navigate('SignUp')}/>
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
        fontFamily:'NunitoSans-Bold'
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
        textAlign:'center',
        fontFamily:'NunitoSans-Bold'
    },
    title:{
        textAlign:'center',
        color:'rgba(58, 61, 66, 0.6)',
        fontSize:16,
        lineHeight:23,
        fontFamily:'NunitoSans-Reguler'
        
    },
    forgotPassword:{
        textAlign:'right',
        color:'rgba(58, 61, 66, 0.8)',
        fontSize:14
    }



})


