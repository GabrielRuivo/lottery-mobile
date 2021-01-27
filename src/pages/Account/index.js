import React from 'react';

import { useDispatch } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
    TextInput, 
    TouchableOpacity, 
    Text, 
    ActivityIndicator, 
    View, 
    StyleSheet ,
    ToastAndroid,
} from 'react-native';

import { 
    Container, 
    Title, 
    BoxTitle, 
    SubTitle,
    Border,
    Form,
    BoxInputName,
    BoxInputPassword,
    BoxButtonLogin,
    ButtonLogin,
    TextButton,
} from './styles';

import { FontAwesome } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';

import api from '../../services/api';

const Login = ({ navigation }) => {

    const dispatch = useDispatch()

    const [ isFocusedName, setFocusedName ] = React.useState(false)
    const [ isFocusedPassword, setFocusedPassword ] = React.useState(false)
    const [ hidePassword, setHidePassword ] = React.useState(true)
    const [ loading, setLoading ] = React.useState(false)
    const [ valueName, setValueName ] = React.useState('')
    const [ valuePassword, setValuePasword ] = React.useState('')

    const labelStyleName = {
        position: 'absolute',
        left: 0,
        top: !isFocusedName && valueName === ''  ? 18 : 0,
        fontSize: !isFocusedName ? 14 : 14,
        color: !isFocusedName ? '#9D9D9D' : '#9D9D9D',
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





    async function handleChangeNameAndPassword() {
        setLoading(true)
        try {
            const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:user'))

            const response = await api.put('change', {
                name: valueName,
                password: valuePassword,
                id: user.id
            })

            setValueName('')
            setValuePasword('')

            ToastAndroid.show("DADOS ATUALIZADOS !", ToastAndroid.SHORT);

            dispatch({type: 'LOG_OUT'})
            
            AsyncStorage.removeItem('@CodeApi:token')
            AsyncStorage.removeItem('@CodeApi:user')
    
            navigation.navigate('Login')
                

            setLoading(false)
        } catch(err) {
            setLoading(false)
            console.log('Algo deeu errado !', err)
        }
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

                <SubTitle>Account</SubTitle>

                <Form>
                    <BoxInputName style={ isFocusedName && { borderBottomWidth: 2, borderBottomColor: '#B5C401' }} >
                        <Text style={labelStyleName} >
                            New name
                        </Text>
                        <TextInput 
                            style={{ width: '100%', height: '80%', paddingLeft: 15, color: '#9D9D9D'}} 
                            onFocus={ () => setFocusedName(true)}
                            onBlur={() => setFocusedName(false)}
                            value={valueName}
                            onChangeText={(e) => setValueName(e)}
                            />
                    </BoxInputName>

                    <BoxInputPassword style={ isFocusedPassword && {  borderBottomWidth: 2, borderBottomColor: '#B5C401' }}>
                        <Text style={labelStylePassword} >
                            New password
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

                    <BoxButtonLogin>
                        <ButtonLogin onPress={handleChangeNameAndPassword} >
                            <TextButton>Enter</TextButton>
                            <AntDesign name="arrowright" size={24} color="#B5C401" />
                        </ButtonLogin> 
                    </BoxButtonLogin>

                </Form>
            
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