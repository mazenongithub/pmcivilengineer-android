import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
class EnvironmentalVariables {
    
    getvariables() {
        const variables = {
            development: {
                stripeClient: 'pk_test_4ZCejPXp1eoTTdAlwpZW3a4M',
                androidPayMode: 'test',
<<<<<<< HEAD
                serverAPI: 'http://54.237.78.142:8081'
=======
                serverAPI: 'http://3.83.30.207:8081'
>>>>>>> 3205964e47d63dc94b1099534dd01b1dd544b509
            },
            production: {
                stripeClient: 'pk_live_NGJS73N6Hmokpws9S1Qn8Nxs',
                androidPayMode: 'production',
                serverAPI: 'https://api.civilengineer.io'
            }
        };

        if (__DEV__) {

            return variables.development; // return this if in development mode
        }

        return variables.production; // otherwise, return this
    }

    configs() {
        const variables = new EnvironmentalVariables();
        const configs = {
            publishableKey: variables.getvariables().stripeClient,
            androidPayMode: variables.getvariables().androidPayMode,
        }

        Stripe.setOptionsAsync(configs);
    }

}
export default EnvironmentalVariables;