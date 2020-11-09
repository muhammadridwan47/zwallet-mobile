import React,{useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const Splash = ({navigation}) => {
 useEffect(() => {
      setTimeout(() => {
         navigation.replace('Login');
      },500)
  }, [navigation])

  return (
    <>
        <View style={styles.container}>
          <Text style={styles.logo}>Zwallet</Text>
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#6379F4',
    justifyContent:'center',
    alignItems:'center'
  },
  logo:{
    fontSize:34,
    fontWeight:'bold',
    color:'#fff'
    
  }
});

export default Splash;
