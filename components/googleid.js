import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {MyStylesheet} from './styles';
import PM from './pm';

class GoogleID {
showgoogleicon(type) {
    const pm = new PM();
    const googleIcon = pm.getgoogleicon.call(this)
    if(!this.state.client || !this.state.clientid) {
        return(<TouchableOpacity onPress={() => { pm.googleSignIn.call(this, type) }}>
        <Image source={require('./png/googlesign.png')}
            resizeMethod='scale'
            style={googleIcon}
        />
    </TouchableOpacity>)
    } else {
        return;
    }
}
    showgoogleid(type) {
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)
        const googleid = new GoogleID();
        const loginMessage = () => {
            if(this.state.client && this.state.clientid) {
                return(`Your account is secure with Google`)
            } else {
                return(`Secure Login with Google`)
            }
        }
        return(
        <View style={[styles.generalFlex, styles.bottomMargin10]}>
            <View style={[styles.flex1, styles.alignContentCenter]}>
            <Text style={[regularFont,styles.alignCenter]}>{loginMessage()}</Text>
            {googleid.showgoogleicon.call(this, type)}
            </View>
        </View>
        )
    }

}
export default GoogleID;