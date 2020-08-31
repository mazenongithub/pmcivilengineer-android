import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { MyStylesheet } from './styles';
import PM from './pm';
import Profile from './profile'
import EmailAddress from './emailaddress'
import GoogleID from './googleid';
import { ClientLogin } from './actions/api'
import { returnCompanyList } from './functions';
import MyProfile from './myprofile';

class Register {


    async registerclient() {
        let emailaddress = this.state.emailaddress;
        let client = this.state.client;
        let clientid = this.state.clientid;
        let profile = this.state.profile;
        let firstname = this.state.firstname;
        const lastname = this.state.lastname;
        const values = { profile, client, clientid, firstname, lastname, emailaddress }

        try {
            let response = await ClientLogin(values)
            console.log(response)
            if (response.hasOwnProperty("allusers")) {
                let companys = returnCompanyList(response.allusers);
                this.props.reduxAllCompanys(companys)
                this.props.reduxAllUsers(response.allusers);

            }
            if (response.hasOwnProperty("myuser")) {

                this.props.reduxUser(response.myuser)
                this.setState({ client: '', clientid: '', emailaddress: '' })
            } else if (response.hasOwnProperty("message")) {
                this.setState({ message: response.message })
            }
        } catch (err) {
            alert(err)
        }
    }

    showregister() {
        const pm = new PM();
        const styles = MyStylesheet();
        const profile = new Profile();
        const emailaddress = new EmailAddress();
        const googleid = new GoogleID();
        const headerFont = pm.getHeaderFont.call(this)
        const regularFont = pm.getRegularFont.call(this);
        const register = new Register();
        const myuser = pm.getuser.call(this);
        const myprofile = new MyProfile();

        const showgoogleid = () => {

            if(this.state.profile && this.state.profilecheck) {
                return(googleid.showgoogleid.call(this,"register"))
            }
        }
        
        if (myuser) {
            return (myprofile.showmyprofile.call(this))
        } else {
            return (
                <View style={[styles.generalFlex]}>
                    <View style={[styles.flex1]}>

                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>
                                <Text style={[styles.boldFont, headerFont, styles.alignCenter]}>Register </Text>
                            </View>
                        </View>
                        {profile.showprofile.call(this)}

                        {showgoogleid()}

                        

             
                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>
                                <Text style={[regularFont, styles.alignCenter]}>{this.state.message}</Text>
                            </View>
                        </View>

                    </View>
                </View>)

        }
    }

}
export default Register;