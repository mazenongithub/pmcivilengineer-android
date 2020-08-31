import React from 'react'
import { View, Text, Image, TextInput } from 'react-native'
import { MyStylesheet } from './styles';
import PM from './pm';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UploadProfileImage } from './actions/api'
import { returnCompanyList, inputUTCStringForLaborID, validateEmail, validateProviderID } from './functions'
import { CheckEmailAddress, CheckProviderID } from './actions/api';

class MyProfile {

   
    confirmemailaddressimage() {
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        if (!myuser.hasOwnProperty("invalidemail") && myuser.emailaddress) {
 
            const gocheck = pm.getgochecksmall.call(this)

            return (
                <Image source={require('./png/gocheck.png')}
                    resizeMethod='scale'
                    style={gocheck}
                />)
        } else {
            return;
        }


    }
    confirmprofileimage() {
        const pm = new PM();
        const gocheck = pm.getgochecksmall.call(this)
        const myuser = pm.getuser.call(this)
        if (!myuser.invalid) {
            const gocheck = pm.getgochecksmall.call(this)
            return (
                <Image source={require('./png/gocheck.png')}
                    resizeMethod='scale'
                    style={gocheck}
                />)
        } else {
            return;
        }

    }

    async handleprofilephoto() {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        if (myuser) {

            let permission = await Permissions.askAsync(
                Permissions.CAMERA_ROLL,
                Permissions.CAMERA);

            if (permission.status === "granted") {
          
                try {
                    let myImage = await ImagePicker.launchImageLibraryAsync({
                        allowsEditing: true,
                        aspect: [1, 1],
                    });

                    if (myImage.hasOwnProperty("uri")) {
                        let uriParts = myImage.uri.split('.');
                        let fileType = uriParts[uriParts.length - 1];

                        const profilephoto = () => {
                            return ({
                                uri: myImage.uri,
                                name: `photo.${fileType}`,
                                type: `image/${fileType}`,
                            })

                        }


                        const values = { providerid: myuser.providerid, client: myuser.client, clientid: myuser.clientid, firstname: myuser.firstname, lastname: myuser.lastname, emailaddress: myuser.emailaddress, phonenumber: myuser.phonenumber, profileurl: myuser.profileurl, profile: myuser.profile }
                   
                        let formData = new FormData();
                        formData.append("profilephoto", profilephoto());
                        formData.append("myuser", JSON.stringify(values))
                        try {
                            let response = await UploadProfileImage(formData, myuser.providerid);
                            
                            console.log("IMAGEPICKER", response)
                            if (response.hasOwnProperty("allusers")) {
                                let companys = returnCompanyList(response.allusers);
                                this.props.reduxAllCompanys(companys)
                                this.props.reduxAllUsers(response.allusers);

                            }
                            if (response.hasOwnProperty("myuser")) {

                                this.props.reduxUser(response.myuser)
                            }

                            if (response.hasOwnProperty("message")) {
                                let lastupdated = inputUTCStringForLaborID(response.lastupdated)
                                this.setState({ message: `${response.message} Last updated ${lastupdated}` })
                            }

                        } catch (err) {
                            alert(err)
                        } // try upload image

                    } // end my image url


                } catch (err) {
                    console.log("User Canceled photo selection")
                }

            } else if (permission.status === "undetermined") {
                Alert.alert("You need to grant permissions to upload your Photo")
            }
        }
    }


    getprofile() {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        return myuser.profile;
    }

    handleprofile(profile) {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        profile = profile.toLowerCase();
        myuser.profile = profile;
        let errmsg = validateProviderID(profile)

        if (myuser) {


            if (errmsg) {

                myuser.invalid = errmsg;
                this.props.reduxUser(myuser);
                this.setState({ message: errmsg })

            } else {

                if (myuser.hasOwnProperty("invalid")) {
                    delete myuser.invalid;
                }

                this.props.reduxUser(myuser);
                this.setState({ message: '' })
            }


        }

    }
    async verifyProfile() {
          
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        if (!myuser.invalid) {   

                try {

                    let response = await CheckProviderID(myuser.profile)
                    console.log(response)
                    let message  ="";
                    if (response.hasOwnProperty("valid")) {

                        if (myuser.hasOwnProperty("invalid")) {

                            delete myuser.invalid

                        }

                    } else if (response.hasOwnProperty("invalid")) {
                       
                        myuser.invalid = response.invalid;
                        message+= response.invalid;
                    }


                    this.props.reduxUser(myuser);
                    this.setState({ message })

                }
                catch (err) {

                    alert(err)
                }

            

        }

    }

    getfirstname() {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        return myuser.firstname;
    }
    handlefirstname(firstname) {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        if (myuser) {
            myuser.firstname = firstname;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }
    getlastname() {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        return myuser.lastname;
    }
    handlelastname(lastname) {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        if (myuser) {
            myuser.lastname = lastname;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }

    getphonenumber() {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        return myuser.phonenumber;
    }
    handlephonenumber(phonenumber) {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        if (myuser) {
            myuser.phonenumber = phonenumber;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }

    getemailaddress() {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        return myuser.emailaddress;
    }
     async verifyEmailAddress() {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        const errmsg = validateEmail(myuser.emailaddress);

        if (!errmsg) {
            try {

                const response = await CheckEmailAddress(myuser.emailaddress)

                if (response.hasOwnProperty("invalid")) {
                    myuser.invalidemail = ` ${response.invalid}`
                    this.props.reduxUser(myuser)
                    this.setState({ message: response.invalid })
                } else {
                    delete myuser.invalidemail;
                    this.props.reduxUser(myuser)
                    this.setState({ message:'' })
                }


            } catch (err) {
                alert(err)
            }




        } else {
            myuser.invalidemail = myuser.emailaddress;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })
        }



    }

     handleemailaddress(emailaddress) {
        const pm = new PM();
        let myuser = pm.getuser.call(this);
        if (myuser) {

            let errmsg = "";
            errmsg = validateEmail(emailaddress)

            if (errmsg) {
                myuser.invalidemail = errmsg;
                this.setState({message:errmsg})

            } else {

                if (myuser.hasOwnProperty("invalidemail")) {
                    delete myuser.invalidemail
                }
                this.setState({message:errmsg})

            }
            myuser.emailaddress = emailaddress;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }

    getprofileurl() {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        return myuser.profileurl;

    }
    handleprofileurl(profileurl) {

        const pm = new PM();
        let myuser = pm.getuser.call(this);

        if (myuser) {
            myuser.profileurl = profileurl;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })
        }
    }

    showmyprofile() {
        const pm = new PM();
        const styles = MyStylesheet();
        const profileDimension = pm.getprofiledimesions.call(this)
        const foldericon = pm.getfoldericon.call(this)
        const myuser = pm.getuser.call(this)
        const regularFont = pm.getRegularFont.call(this)
        const headerFont = pm.getHeaderFont.call(this)
        const downIcon = pm.getdownIcon.call(this)
        const myprofile = new MyProfile();
  
        const profilepicture = () => {
            return (<View style={[styles.generalFlex, styles.topMargin5]}>
                <View style={[styles.flex1]}>


                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1, styles.flexRow, styles.alignContentCenter]}>

                            {profileImage()}
                            <TouchableOpacity onPress={() => { myprofile.handleprofilephoto.call(this) }}>
                                <Image source={require('./png/folder.png')}
                                    resizeMethod='scale'
                                    style={[foldericon, styles.leftMargin5]}
                                />
                            </TouchableOpacity>

                        </View>
                    </View>




                </View>
            </View>
            )
        }
        const profileImage = () => {

            if (myuser.profileurl) {
                return (<Image
                    resizeMethod='scale'
                    style={[profileDimension, styles.showBorder]}
                    source={{ uri: `${myuser.profileurl}` }} />)
            } else {
                return;
            }
        }
        return (<View style={[styles.generalFlex]}>
            <View style={[styles.flex1]}>

                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                    <View style={[styles.flex1, styles.alignContentCenter, styles.flexRow]}>
                        <Text style={[headerFont]}>/</Text>
                        <TextInput style={[styles.defaultInput, headerFont, styles.boldFont, styles.profileInput]}
                            value={myprofile.getprofile.call(this)}
                            onChangeText={text => { myprofile.handleprofile.call(this, text) }}
                            onBlur={() => { myprofile.verifyProfile.call(this) }} />
                        {myprofile.confirmprofileimage.call(this)}
                    </View>
                </View>

                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                    <View style={[styles.flex1, styles.alignContentCenter]}>
                        {profilepicture()}
                    </View>
                </View>

                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                    <View style={[styles.flex1]}>
                        <Text style={[regularFont]}>Profile Image URL</Text>
                        <TextInput style={[styles.defaultInput, regularFont]}
                            value={myprofile.getprofileurl.call(this)}
                           />
                    </View>
                </View>

                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                    <View style={[styles.flex1, styles.flexRow]}>
                        <Text style={[regularFont]}>Login  </Text>
                        <Image source={require('./png/downicon.png')}
                            resizeMethod='scale'
                            style={[downIcon]}
                        />

                    </View>
                </View>

                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                    <View style={[styles.flex3]}>
                        <Text style={[regularFont]}>Email Address</Text>
                        <TextInput style={[styles.defaultInput, regularFont]}
                            onChangeText={text => { myprofile.handleemailaddress.call(this, text) }}
                            value={myprofile.getemailaddress.call(this)}
                            onBlur={()=>{myprofile.verifyEmailAddress.call(this)}}
                        />
                    </View>
                    <View style={[styles.flex1, styles.flexEnd]}>{myprofile.confirmemailaddressimage.call(this)}</View>
                </View>

                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                    <View style={[styles.flex1]}>
                        <Text style={[regularFont]}>Phone Number </Text>
                        <TextInput style={[styles.defaultInput, regularFont]}
                            onChangeText={text => { myprofile.handlephonenumber.call(this, text) }}
                            value={myprofile.getphonenumber.call(this)}
                        />
                    </View>

                </View>

                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                    <View style={[styles.flex1, styles.flexRow]}>
                        <Text style={[regularFont]}>Additional Contact  </Text>
                        <Image source={require('./png/downicon.png')}
                            resizeMethod='scale'
                            style={[downIcon]}
                        />

                    </View>
                </View>

                <View style={[styles.generalFlex, styles.bottomMargin10]}>
                    <View style={[styles.flex1]}>
                        <Text style={[regularFont]}>First Name</Text>
                        <TextInput style={[styles.defaultInput, regularFont]}
                            onChangeText={text => { myprofile.handlefirstname.call(this, text) }}
                            value={myprofile.getfirstname.call(this)}
                        />
                    </View>
                    <View style={[styles.flex1]}>
                        <Text style={[regularFont]}>Last Name </Text>
                        <TextInput style={[styles.defaultInput, regularFont]}
                            onChangeText={text => { myprofile.handlelastname.call(this, text) }}
                            value={myprofile.getlastname.call(this)}
                        />
                    </View>

                </View>

                {pm.showsaveproject.call(this)}

             

            </View>
        </View>)
    }
}
export default MyProfile;