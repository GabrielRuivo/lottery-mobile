import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Toast from 'react-native-tiny-toast';

import { 
    TextInput, 
    TouchableOpacity, 
    Text, 
    ActivityIndicator, 
    View, 
    StyleSheet,
} from 'react-native';

import { 
    Container, 
    Title, 
    BoxTitle, 
    SubTitle,
    Border,
    Form,
    BoxInputEmail,
    BoxInputPassword,
    ForgetPassword,
    BoxButtonLogin,
    ButtonLogin,
    TextButton,
    TextButtonSignUp,
    TextCopyright,
} from './styles';

import { FontAwesome } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';

import api from '../../services/api';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react/cjs/react.development';

const Login = ({ navigation }) => {

    const store = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const [ isFocusedEmail, setFocusedEmail ] = React.useState(false)
    const [ isFocusedPassword, setFocusedPassword ] = React.useState(false)

    const [ hidePassword, setHidePassword ] = React.useState(true)

    const [ loading, setLoading ] = React.useState(false)

    const [ valueEmail, setValueEmail ] = React.useState('')
    const [ valuePassword, setValuePassword ] = React.useState('')


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

      const labelStylePassword = {
        position: 'absolute',
        left: 0,
        top: !isFocusedPassword && valuePassword === ''  ? 18 : 0,
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
    
    function NavigationToGameHistory () {
        navigation.navigate('Home')
    }

    React.useEffect( () => {
        async function handleStayLogIn () {
            const token = await AsyncStorage.getItem('@CodeApi:token')
            const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:user'))

            if (token && user) {
                navigation.navigate('Home')
            }
        }
        handleStayLogIn ()
        
    }, [])


    async function handleSubmit() {
        setLoading(true)
        try {

            if(!valueEmail && !valuePassword) {
                setLoading(false);
                return Toast.show('Preencha os campos !');
            }
            
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            if (reg.test(valueEmail) === false) {
                setLoading(false)
                return Toast.show("E-mail incorreto !", Toast.LONG);
            }

            if (valuePassword.length < 6) {
                setLoading(false)
                return Toast.show("Senha mínimo 6 dígitos !", Toast.LONG);
            }

            const response = await api.post('/login', {
                email: valueEmail,
                password: valuePassword
            })

            setValueEmail('')
            setValuePassword('')

            const { token, userName } = response.data;

            await AsyncStorage.multiSet([
                ['@CodeApi:token', JSON.stringify(token)],
                ['@CodeApi:user', JSON.stringify(userName)]
            ])

            if(!!AsyncStorage.getItem('@CodeApi:token')) {
                NavigationToGameHistory()
            }

            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.log(err, 'erro')
            return Toast.show("E-mail ou senha inválidos. !", Toast.LONG);
            
          }
          
    }
    

    function NavigationRegister () {
        navigation.navigate('Register')
    }

    function NavigationToResetPassword () {
        navigation.navigate('ResetPassword')
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

                <SubTitle>Authentication</SubTitle>

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
                            onChangeText={(e) => setValuePassword(e)}
                        />
                        <FontAwesome onPress={handleShowPassword} name="eye" size={24} color={ hidePassword ? '#C1C1C1' : '#B5C401' } />
                    </BoxInputPassword>       

                    <TouchableOpacity onPress={NavigationToResetPassword} >
                        <ForgetPassword>I forget my password</ForgetPassword>
                    </TouchableOpacity>

                    <BoxButtonLogin>
                        <ButtonLogin onPress={handleSubmit} >
                            <TextButton>Log In</TextButton>
                            <AntDesign name="arrowright" size={24} color="#B5C401" />
                        </ButtonLogin> 
                    </BoxButtonLogin>

                </Form>


                <TouchableOpacity onPress={NavigationRegister} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 30 }} >
                    <TextButtonSignUp>Sign Up</TextButtonSignUp>
                    <AntDesign name="arrowright" size={24} color="#535351" />
                </TouchableOpacity>

                <TextCopyright>Copyright 2020 Luby Software</TextCopyright>
            
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

export default Login;