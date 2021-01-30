import React from 'react';

import Toast from 'react-native-tiny-toast';

import { Text, TextInput, TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native';

import { 
    Container,
    BoxTitle,
    Title,
    Border,
    SubTitle,
    Form,
    BoxInputEmail,
    BoxInputPassword,
    BoxInputName,
    BoxButtonRegister,
    ButtonRegister,
    TextButton,
    TextButtonBack
    
} from './styles';

import { FontAwesome } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';

import api from '../../services/api';

const Register = ({ navigation }) => {

    const [ isFocusedName, setFocusedName ] = React.useState(false)
    const [ isFocusedEmail, setFocusedEmail ] = React.useState(false)
    const [ isFocusedPassword, setFocusedPassword ] = React.useState(false)

    const [ hidePassword, setHidePassword ] = React.useState(true)

    const [ loading, setLoading ] = React.useState(false)

    const [ valueName, setValueName ] = React.useState('')
    const [ valueEmail, setValueEmail ] = React.useState('')
    const [ valuePassword, setValuePasword ] = React.useState('')

    async function handleSubmit() {
        setLoading(true)
  
        try {
            if(!valueName|| !valueEmail || !valuePassword) {
                setLoading(false)
                return Toast.show('Preencha todos os campos corretamente !', Toast.LONG)
            } 
    
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            if (reg.test(valueEmail) === false) {
                setLoading(false)
                return Toast.show("Formato de E-mail incorreto !", Toast.LONG);
            }

            if (valuePassword.length < 6) {
                setLoading(false)
                return Toast.show("Senha deve ter no mínimo 6 dígitos !", Toast.LONG);
            }
            
            const response = await api.post('/users', {
                username: valueName,
                email: valueEmail,
                password: valuePassword
            })

            console.log(response.data)

            Toast.show('Registrado com sucesso !', Toast.SHORT)

            setTimeout(() => {
                navigation.navigate('Login')
            }, 2000);

            setLoading(false)
           
        } catch(e) {
            setLoading(false)
            console.log('Err', e)
            Toast.show('Este email já está em uso tente outro.')
        }
    }

    const labelStyleName = {
        position: 'absolute',
        left: 0,
        top: !isFocusedName && !valueName  ? 18 : 0,
        fontSize: !isFocusedName ? 14 : 14,
        color: !isFocusedName ? '#9D9D9D' : '#9D9D9D',
        fontStyle: 'italic', 
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 15,
        marginBottom: 5
    };

    const labelStyleEmail = {
        position: 'absolute',
        left: 0,
        top: !isFocusedEmail && !valueEmail ? 18 : 0,
        fontSize: !isFocusedEmail ? 14 : 14,
        color: !isFocusedEmail ? '#9D9D9D' : '#9D9D9D',
        fontStyle: 'italic', 
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 15,
        marginBottom: 5
    };

      const labelStylePassword = {
        position: 'absolute',
        left: 0,
        top: !isFocusedPassword && !valuePassword ? 18 : 0,
        fontSize: !isFocusedPassword ? 14 : 14,
        color: !isFocusedPassword ? '#9D9D9D' : '#9D9D9D',
        fontStyle: 'italic', 
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 15,
        marginBottom: 5
    };

    function handleShowPassword () {
        setHidePassword(!hidePassword)
    }

    function NavigationLogin () {
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

                <SubTitle>Registration</SubTitle>

                <Form>
                    <BoxInputName style={ isFocusedName && { borderBottomWidth: 2, borderBottomColor: '#B5C401' }} >
                        <Text style={labelStyleName} >
                            Name
                        </Text>
                        <TextInput 
                            style={{ width: '100%', height: '80%', paddingLeft: 15, color: '#9D9D9D'}} 
                            onFocus={ () => setFocusedName(true)}
                            onBlur={() => setFocusedName(false)}
                            value={valueName}
                            onChangeText={(e) => setValueName(e)}
                        />
                    </BoxInputName>

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

                    <BoxInputPassword style={ isFocusedPassword && {  borderBottomWidth: 2, borderBottomColor: '#B5C401' }}>
                        <Text style={labelStylePassword} >
                            Password
                        </Text>
                        <TextInput 
                            secureTextEntry={hidePassword}
                            style={{ width: '90%', height: '80%', paddingLeft: 15, color: '#9D9D9D'}} 
                            onFocus={ () => setFocusedPassword(true)}
                            onBlur={() => setFocusedPassword(false)}
                            value={valuePassword}
                            onChangeText={(e) => setValuePasword(e)}
                        />
                        <FontAwesome onPress={handleShowPassword} name="eye" size={24} color={ hidePassword ? '#C1C1C1' : '#B5C401' } />
                    </BoxInputPassword>        

                    <BoxButtonRegister>
                        <ButtonRegister onPress={handleSubmit} >
                            <TextButton>Register</TextButton>
                            <AntDesign name="arrowright" size={24} color="#B5C401" />
                        </ButtonRegister> 
                    </BoxButtonRegister>

                </Form>

                <TouchableOpacity onPress={NavigationLogin} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 30 }} >
                    <AntDesign name="arrowleft" size={24} color="#535351" />
                    <TextButtonBack>Back</TextButtonBack>
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


export default Register;