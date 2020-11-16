import React from 'react';
import { MyStylesheet } from './styles';
import {View, Text} from 'react-native'
import PM from './pm'


class Specifications  {

    showspecification(spec) {
        const pm = new PM();
        const csiid = spec.csiid;
        const csi = pm.getcsibyid.call(this, csiid)
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this)

        return (
        <View style={{ ...styles.generalContainer }} key={spec.csiid}>
        <Text style={{...styles.generalFont, ...regularFont,...styles.generalText}} onPress={()=>{this.handlespecification(csi.csiid)}}>{csi.csi} - {csi.title}</Text>
        </View>
        )

    }

    showspecifications() {
        const pm = new PM();
        const activeparams = pm.getnavigation.call(this)
        const projectid = activeparams.projectid;
        const myproject = pm.getprojectbyid.call(this,projectid);
        const specifications = new Specifications();
        let specids = [];
        if(myproject) {
        const specs = pm.getspecficationsbyprojectid.call(this, myproject.projectid)
        console.log(specs)
        if (specs) {
            // eslint-disable-next-line
            specs.map(spec => {
                specids.push(specifications.showspecification.call(this,spec))
            })
        }
    }
        return specids;
    }

    getspecifications() {
        const styles = MyStylesheet();
        const pm = new PM();
        const headerFont = pm.getHeaderFont.call(this)
        const specifications = new Specifications();
        const activeparams = pm.getnavigation.call(this)
     
        const projectid = activeparams.projectid;
        const myproject = pm.getprojectbyid.call(this,projectid);
     
       
        const myuser = pm.getuser.call(this)
        const regularFont = pm.getRegularFont.call(this)
        const csis = pm.getcsis.call(this);
        if(!csis) {
            pm.loadcsis.call(this)
        }
        if(myuser) {

        if(myproject) {

            if(!myproject.hasOwnProperty("specifications")) {
                pm.loadprojectspecs.call(this,myproject.projectid) 
            }
        return (
            <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <View style={{ ...styles.flex1 }}>
                    
                   

                    {specifications.showspecifications.call(this)}
               
                </View>
            </View>)

        } else {

            return(<Text style={{...regularFont}}>Project Could not be found</Text>)

        }
    } else {

        return(<Text style={{...regularFont}}>Please Login to View Specifications</Text>)

    }
    }

}

export default Specifications;