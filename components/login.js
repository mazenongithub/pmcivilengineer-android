import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { MyStylesheet } from './styles';
import PM from './pm';
import EmailAddress from './emailaddress'
import GoogleID from './googleid';
import MyProfile from './myprofile';


class Login {


    showlogin() {
        const pm = new PM();
        const styles = MyStylesheet();
        const emailaddress = new EmailAddress();
        const googleid = new GoogleID();
        const headerFont = pm.getHeaderFont.call(this)
        const regularFont = pm.getRegularFont.call(this)
        const login = new Login();
        const myuser = pm.getuser.call(this)
        const myprofile = new MyProfile();
  
        const showlogin = () => {
            return (
                <View style={[styles.generalFlex]}>
                    <View style={[styles.flex1]}>

                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>
                                <Text style={[styles.boldFont, headerFont, styles.alignCenter]}>Login </Text>
                            </View>
                        </View>
                        {googleid.showgoogleid.call(this, "login")}

                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>
                                <Text style={[regularFont, styles.alignCenter]}>{this.state.message}</Text>
                            </View>
                        </View>

                    </View>
                </View>)
        }

        if (myuser) {
            return (myprofile.showmyprofile.call(this))
        } else {
            return (showlogin())
        }



    }

}
export default Login;