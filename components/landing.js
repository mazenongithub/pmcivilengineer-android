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
                uri: require('../slides/myprojects.jpg'),
                capt: 'Project Management Online by civilengineer.io. Go ahead and start your project now. ',
                title: 'Project Management Online by civilengineer.io'

            },

            {
                imageid: 'profile',
                uri: require('../slides/profile.jpg'),
                capt: 'Create a Profile from the Registration Page. Add your email address, profile, and Google Sign. This gives you access to profile where you may manage your profile . ',
                title: 'My Profile'

            },
      
            {
                imageid: 'myprojects',
                uri: require('../slides/myprojects.jpg'),
                capt: 'Use myprojects to start your project. Define the scope and location.  ',
                title: 'Create Projects'

            },
        
        
            {
                imageid: 'milestones',
                uri: require('../slides/milestoneview.jpg'),
                capt: 'Add milestones to your project. Milestones have a start and end date. ',
                title: 'Create Project Milestones'

            },

            {
                imageid: 'criticalpath',
                uri: require('../slides/criticalpaths.jpg'),
                capt: 'Set up relationships for your milestones. The program will determine float values for each milestone by looking at the critcal paths',
                title: 'Critical Paths'

            },
        
            {
                imageid: 'myteam',
                uri: require('../slides/projecteam.jpg'),
                capt: 'My Team project component is used to add members to your project. Construction Team members have access to enter their costs when they use the Construction App. Design Team members can access the project using the Design App. ',
                title: 'Project Team'

            },

            {
                imageid: 'specification',
                uri: require('../slides/engineerspecs.jpg'),
                capt: 'Engineers deliver the specifications for the project using the Design program.',
                title: 'Engineers Specifications'

            },
            {
                imageid: 'costestimate',
                uri: require('../slides/engineerestimate.jpg'),
                capt: 'Engineers provide the cost estimate with quantity-takeoff schedule using the Design Program. The Service Provider is expected to match the Specications and match the take-off schedule with their estimate. This is the definition of the work on the project. ',
                title: 'Engineers Cost Estimate'

            },
    
            {
                imageid: 'proposal',
                uri: require('../slides/proposalview.jpg'),
                capt: 'Authorizing Construction Proposal sends an Email Notification to the Service Provider that their proposal has been approved .',
                title: 'View/Authorize Proposal'

            },
    
            {
                imageid: 'lineitems',
                uri: require('../slides/lineitems.jpg'),
                capt: 'Equipment, labor, and materials breakdown for each line item in the contract ',
                title: 'Labor, Equipment, Material'

            }

          
         
           ];
        return myimages;
    }

    showimage(image) {
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)
        const headerFont = pm.getHeaderFont.call(this)
        const styles = MyStylesheet()
        const mainslide =pm.getmainslide.call(this)
        const marginLeft = () => {
            return ({ marginLeft: 60 })
        }
        return (
            <View style={[styles.generalFlex, styles.bottomMargin30]}>
                <View style={[styles.flex1, styles.alignContentCenter]}>
                    <Image source={image.uri}
                        resizeMethod='scale'
                        style={[mainslide, marginLeft()]}
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
            return (landing.showimage.call(this,activeimage))
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