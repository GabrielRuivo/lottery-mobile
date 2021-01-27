import React from 'react';

import { 
    TextInput, 
    TouchableOpacity, 
    Text, 
    ActivityIndicator, 
    View, 
    StyleSheet,
    ToastAndroid
} from 'react-native';

import { 
    Container, 
    Title, 
    BoxTitle, 
    SubTitle,
    Border,
    Form,
    BoxInputEmail,
    ButtonSendLink,
    BoxButtonSendLink,
    TextButtonBack,
    TextButton,
    TextButtonSignUp,

} from './styles';

import { AntDesign } from '@expo/vector-icons';

import api from '../../services/api';

const ResetPassword = ({ navigation }) => {

    const [ isFocusedEmail, setFocusedEmail ] = React.useState(false)
   
    const [ loading, setLoading ] = React.useState(false)

    const [ valueEmail, setValueEmail ] = React.useState('')
  
    const labelStyleEmail = {
        position: 'absolute',
        left: 0,
        top: !isFocusedEmail && valueEmail === ''  ? 18 : 0,
        fontSize: !isFocusedEmail ? 14 : 14,
        color: !isFocusedEmail ? '#9D9D9D' : '#9D9D9D',
        fontStyle: 'italic', 
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 15,
        marginBottom: 5
    };

    async function handleSubmit() {
        setLoading(true)
        try {

            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            if (reg.test(valueEmail) === false) {
                setLoading(false)
                return ToastAndroid.show("Formato de E-mail incorreto !", ToastAndroid.LONG);
            }

            await api.post('/forgot', {
                email: valueEmail
            })

            setLoading(false)

            ToastAndroid.show('Email enviado com sucesso ! check seu inbox', ToastAndroid.LONG)
  
        } catch(err) {
            setLoading(false)
            ToastAndroid.show('Email não existe !', ToastAndroid.LONG)
        }
  
     }

    function NavigationRegister () {
        navigation.navigate('Register')
    }

    function NavigationToLogin () {
        navigation.navigate('Login')
    }

    return (
        <>
        { loading && 
            <View style={styles.loading} >
                <ActivityIndicator size={100} color="#B5C401" /> 
            </View>
        }
        <Container style={ loading && { opacity: 0.1 }} >
            
                <BoxTitle>
                    <Title>TGL</Title>
                    <Border/>
                </BoxTitle>

                <SubTitle>Reset password</SubTitle>

                <Form>
                    <BoxInputEmail style={ isFocusedEmail && { borderBottomWidth: 2, borderBottomColor: '#B5C401' }} >
                        <Text style={labelStyleEmail} >
                            Email
                        </Text>
                        <TextInput 
                            style={{ width: '100%', height: '80%', paddingLeft: 15, color: '#9D9D9D'}} 
                            onFocus={ () => setFocusedEmail(true)}
                            onBlur={() => setFocusedEmail(false)}
                            value={valueEmail}
                            onChangeText={(e) => setValueEmail(e)}
                            />
                    </BoxInputEmail>

                    <BoxButtonSendLink>
                        <ButtonSendLink onPress={handleSubmit} >
                            <TextButton>Send link</TextButton>
                            <AntDesign name="arrowright" size={24} color="#B5C401" />
                        </ButtonSendLink> 
                    </BoxButtonSendLink>

                </Form>

                <TouchableOpacity onPress={NavigationToLogin} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 30 }} >
                    <AntDesign name="arrowleft" size={24} color="#535351" />
                    <TextButtonBack>Back</TextButtonBack>
                </TouchableOpacity>
            
                <TouchableOpacity onPress={NavigationRegister} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 30 }} >
                    <TextButtonSignUp>Sign Up</TextButtonSignUp>
                    <AntDesign name="arrowright" size={24} color="#535351" />
                </TouchableOpacity>

        </Container>
        </>
    ) 
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: '37.5%',
        top: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default ResetPassword;