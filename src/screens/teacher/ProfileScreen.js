import React,{useState} from 'react';
import { Alert, Button, Image, StyleSheet, Text, View ,Dimensions} from 'react-native';
import { AuthContext } from '../../context';
import { ATD_HOME, PROFILE } from '../../constants/routeName';
import Header from '../../components/Header';
import colors from '../../theme/colors';
import Icon from '../../components/Icon';

export default function ProfileScreen({ navigation }) {
    const { signOut,loginState } = React.useContext(AuthContext);
    const [user, setUser] = useState(loginState.data);

    console.log(user);

    const handelLogout = () => {
        Alert.alert('Logout!', 'Are you sure you want to logout?', [
          {
            text: 'Cancel',
            onPress: () => { },
          },
    
          {
            text: 'OK',
            onPress: () => {
              signOut();
              console.log(`OK`)
            },
          },
        ]);
      };
    
    return (
        <>
             <Header title={`${PROFILE}`} rightIcon="logout" onRightBtnPress={()=>handelLogout()}/>
             {/* <View style={styles.Container}>
             <Image
                source={require('../../assets/images/profile-user.png')}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 100,
                  margin:20
                }}
              />
               <View style={{marginBottom:20}}>
               <Text style={{fontSize:18,color:colors.black}}>Name: {user.Name}</Text>
                <Text style={{fontSize:18,color:colors.black}}>Email: {user.Email}</Text>
                <Text style={{fontSize:18,color:colors.black}}>Phone: {user.Phone}</Text>
                <Text style={{fontSize:18,color:colors.black}}>Address: {user.Address}</Text>
               </View>
            
             </View> */}

             <View style={{backgroundColor:colors.primary,height:Dimensions.get('screen').height*0.25,justifyContent:'center'}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                 
                <Image
                source={require('../../assets/images/profile-user.png')}
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 5,
                  margin:20
                }}
              />
             <View>
             <Text style={{color:colors.white,fontSize:22,fontWeight:'bold'}}>{user.Name}</Text>
              <Text style={{color:colors.white,fontSize:16}}>{'Teacher'}</Text>
             </View>
                </View>
             </View>

             <View style={{backgroundColor:colors.white,padding:10,height:'100%'}}>

            {user.Email&& <View style={styles.list}>
                <Icon name={'email'}  iconColor={colors.black} backgroundColor={colors.white} size={50}/>
                <Text style={{color:colors.black,fontSize:16,flex: 1, flexWrap: 'wrap'}}>{user.Email.includes(",")?user.Email.replace(', ',"\n"):user.Email}</Text>
            </View>}

            {user.Phone &&<View style={[styles.list,{ marginTop:7}]}>
                <Icon name={'phone'}  iconColor={colors.black} backgroundColor={colors.white} size={50}/>
                <Text style={{color:colors.black,fontSize:16,flex: 1, flexWrap: 'wrap'}}>{user.Phone}</Text>
            </View>}
            {user.Address&& <View style={[styles.list,{ marginTop:7}]}>
                <Icon name={'home'}  iconColor={colors.black} backgroundColor={colors.white} size={50}/>
                <Text style={{color:colors.black,fontSize:16,flex: 1, flexWrap: 'wrap'}}>{user.Address}</Text>
            </View>}
            </View>
            
        </>
    );
}

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignItems:'center',
    padding: 10,
    flex:1
},
list: {
  flexDirection:'row',
  borderWidth:1,
  borderColor:colors.gray,
  borderRadius:5,
  alignItems:'center',
  backgroundColor: colors.white,
  borderRadius: 5,
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.37,
  shadowRadius: 7.49,
  elevation: 6,
},

})