import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { MyStylesheet } from './styles';
import PM from './pm'
import MyProfile from './myprofile'


class Landing {
    getimages() {

        const myimages = [
            {
                imageid: 'projectmanagement',
                uri: require('../slides/logo.png'),
                capt: 'Project Management Online by civilengineer.io. Go ahead and start your project now. ',
                title: 'Project Management Online by civilengineer.io'

            },

            {
                imageid: 'profile',
                uri: require('../slides/profile.png'),
                capt: 'Create a Profile from the Registration Page. Add your email address, profile, and Google Sign. This gives you access to profile where you may manage your profile . ',
                title: 'My Profile'

            },
      
            {
                imageid: 'myprojects',
                uri: require('../slides/myprojects.png'),
                capt: 'Use myprojects to start your project. Define the scope and location.  ',
                title: 'Create Projects'

            },
        
        
            {
                imageid: 'milestone_2',
                uri: require('../slides/milestone_2.png'),
                capt: 'Add milestones to your project. Milestones have a start and end date. ',
                title: 'Create Project Milestones'

            },

            {
                imageid: 'criticalpath',
                uri: require('../slides/criticalpath.png'),
                capt: 'Set up relationships for your milestones. The program will determine float values for each milestone by looking at the critcal paths',
                title: 'Critical Paths'

            },
        
            {
                imageid: 'myteam',
                uri: require('../slides/myteam.png'),
                capt: 'My Team project component is used to add members to your project. Construction Team members have access to enter their costs when they use the Construction App. Design Team members can access the project using the Design App. ',
                title: 'Project Team'

            },

            {
                imageid: 'specification',
                uri: require('../slides/specification.png'),
                capt: 'Engineers deliver the specifications for the project using the Design program.',
                title: 'Engineers Specifications'

            },
            {
                imageid: 'costestimate',
                uri: require('../slides/estimate.png'),
                capt: 'Engineers provide the cost estimate with quantity-takeoff schedule using the Design Program. The Service Provider is expected to match the Specications and match the take-off schedule with their estimate. This is the definition of the work on the project. ',
                title: 'Engineers Cost Estimate'

            },
    
            {
                imageid: 'proposal_2',
                uri: require('../slides/proposal_2.png'),
                capt: 'Authorizing Construction Proposal sends an Email Notification to the Service Provider that their proposal has been approved .',
                title: 'View/Authorize Proposal'

            },
    
            {
                imageid: 'lem',
                uri: require('../slides/lem.png'),
                capt: 'Equipment, labor, and materials breakdown for each line item in the contract ',
                title: 'Labor, Equipment, Material'

            },

            {
                imageid: 'balance',
                uri: require('../slides/balance.png'),
                capt: 'Add balance to your project with Google Pay ',
                title: 'Add Balnace'

            },
            {
                imageid: 'viewinvoice',
                uri: require('../slides/viewinvoice.png'),
                capt: 'View Invoice component runs a settlement for the invoice when there are funds avaiable inside the project. The Settlement creates the set of transfers attached to the invoice ',
                title: 'View Invoice/Before'

            },
            {
                imageid: 'settleinvoice',
                uri: require('../slides/settleinvoice.png'),
                capt: 'Invoice before settlement as occurred and when there is an outstanding balance for the invoice ',
                title: 'Settle Invoice/Before'

            },
            {
                imageid: 'settlement',
                uri: require('../slides/settlement.png'),
                capt: 'Invoice settlement after success. Refresh the App to see the transfer balances. Transfers are recorded after the balance has been successfully moved to their accounts. Transfers are shown on the invoice after payment. Press refresh one-second after completing the settlement. The transfers are managed by Stripe and should be there if a transfer occurred.   ',
                title: 'Settle Invoice/After'

            }
         
           ];
        return myimages;
    }

    showimage(image) {
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)
        const headerFont = pm.getHeaderFont.call(this)
        const styles = MyStylesheet()
        const marginLeft = () => {
            return ({ marginLeft: 60 })
        }
        return (
            <View style={[styles.generalFlex, styles.bottomMargin30]}>
                <View style={[styles.flex1,]}>
                    <Image source={image.uri}
                        resizeMethod='scale'
                        style={[styles.slideimage, marginLeft()]}
                        key={image.imageid}
                    />
                    <Text style={[headerFont, styles.alignCenter,styles.width90]}>{image.title}</Text>
                    <Text style={[regularFont, styles.marginRight10, styles.alignCenter,styles.marginLeft10]}>{image.capt}</Text>
                </View>
            </View>)

    }

    showiconimage(image) {
        const styles = MyStylesheet()

        return (

            <TouchableOpacity onPress={() => { this.setState({ activeimage: image.imageid }) }}>
                <Image source={image.uri}
                    resizeMethod='scale'
                    style={[styles.iconimage]}
                    key={image.imageid}
                />
            </TouchableOpacity>)

    }
    getactiveimage() {
        const landing = new Landing();
        const images = landing.getimages.call(this)
        let myimage = false;
        images.map(image => {
            if (image.imageid === this.state.activeimage) {
                myimage = image;
            }
        })
        return myimage;
    }
    showactiveimage() {
        const landing = new Landing();
        const activeimage = landing.getactiveimage.call(this)
        if (activeimage) {
            return (landing.showimage(activeimage))
        }
    }
    showimages() {

        const landing = new Landing();
        const images = landing.getimages.call(this);
        let myimage = [];


        images.map(image => {

            myimage.push(landing.showimage.call(this, image))


        })


        return myimage;
    }

    showiconimages() {
        const pm = new PM();
        const styles = MyStylesheet();
        const landing = new Landing();
        const images = landing.getimages.call(this)
        const myimages = [];
        const regularFont = pm.getRegularFont.call(this)
        images.map((image, i) => {

            if (i % 2 === 0 || i == 0) {

                if (i < images.length - 1) {

                    myimages.push(
                        <View style={[styles.generalFlex, styles.bottomMargin10]} key={image.imageid}>
                            <View style={[styles.flex1, styles.alignContentCenter]}>
                                {landing.showiconimage.call(this, image)}
                                <Text style={[regularFont, styles.alignCenter]}>{image.title}</Text>
                            </View>
                            <View style={[styles.flex1, styles.alignContentCenter]}>
                                {landing.showiconimage.call(this, images[i + 1])}
                                <Text style={[regularFont, styles.alignCenter]}>{images[i + 1].title}</Text>
                            </View>

                        </View>
                    )
                } else {
                    myimages.push(
                        <View style={[styles.generalFlex, styles.bottomMargin10]} key={[image.imageid]}>
                            <View style={[styles.flex1, styles.alignContentCenter]}>
                                {landing.showiconimage.call(this, image)}
                                <Text style={[regularFont, styles.alignCenter]}>{image.title}</Text>
                            </View>
                            <View style={[styles.flex1]}>

                            </View>

                        </View>
                    )
                }
            }


        })
        return myimages;
    }
    showlanding() {
        const pm = new PM();
        const styles = MyStylesheet();
        const landing = new Landing();
        const myprofile = new MyProfile();

        const justify = () => {
            return ({ justifyContent: 'center' })
        }
        const myuser = pm.getuser.call(this);
        if (myuser) {
            return (myprofile.showmyprofile.call(this))
        } else {
            return (
                <View style={[styles.generalFlex]}>
                    <View style={[styles.flex1]}>


                        <View style={[styles.generalFlex]}>
                            <View style={[styles.flex1, justify(), styles.topMargin35]}>

                                {landing.showactiveimage.call(this)}

                            </View>

                        </View>


                        {landing.showiconimages.call(this)}



                    </View>

                </View>


            )
        }
    }
}
export default Landing;