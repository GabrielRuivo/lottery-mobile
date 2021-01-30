import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Creators as CreatorsCart } from '../../store/cart/index';

import Toast from 'react-native-tiny-toast';

import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet, Platform } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import {
    BoxGames,
    
    GameLotofacil,
    BorderLotofacil,
    BoxInfoGameLotofacil,
    NumbersLotofacil,
    DateAndPriceLotofacil,
    NameGameLotofacil,
    
    GameMegaSena,
    BorderMegaSena,
    BoxInfoGameMegaSena,
    NumbersMegaSena,
    DateAndPriceMegaSena,
    NameGameMegaSena,
    
    GameQuina,
    BorderQuina,
    BoxInfoGameQuina,
    NumbersQuina,
    DateAndPriceQuina,
    NameGameQuina,
    
} from './styles';

import api from '../../services/api';

const DrawerCart = ({ navigation }) => {

    const [ loading, setLoading ] = React.useState(false)

    const store = useSelector(state => state.cart);
    const types = useSelector(state => state.types);
    const dispatch = useDispatch();

    function handleDeleteBetLotofacil(index1) {
        let newData = store.cartLotofacil.filter((item, index) => index !== index1)

        const price = 2.50;

        const { removeCartLotofacil } = CreatorsCart;

        dispatch(removeCartLotofacil(newData, price));
    }
    
    function handleDeleteBetMegasena(index1) {
        let newData = store.cartMegasena.filter((item, index) => index !== index1)
    
        const price = 4.50;

        const { removeCartMegasena } = CreatorsCart;

        dispatch(removeCartMegasena(newData, price));
    }
    
    function handleDeleteBetQuina(index1) {
        let newData = store.cartQuina.filter((item, index) => index !== index1)
    
        const price = 2.00;

        const { removeCartQuina } = CreatorsCart;

        dispatch(removeCartQuina(newData, price));
    }

    function closeDrawer() {
        navigation.closeDrawer();
    }

    function goToHome() {
        navigation.navigate('Home')
    }

    async function handleSaveBets() {
        setLoading(true)
        try {
            
            if(store.price < 9) {
                setLoading(false)
                return Toast.show(`${store.user}, você precisa fazer no mínimo R$9,00, de apostas !`)
            }

            if (store.price >= 9) {

                const loto = store.cartLotofacil.map(item => {
                    return {
                        numbers: item,
                        game_id: 1,
                        date: new Date().toLocaleDateString()
                    }
                })

                const mega = store.cartMegasena.map(item => {
                    return {
                        numbers: item,
                        game_id: 2,
                        date: new Date().toLocaleDateString()
                    }
                })

                const quina = store.cartQuina.map(item => {
                    return {
                        numbers: item,
                        game_id: 3,
                        date: new Date().toLocaleDateString()
                    }
                })

                await api.post('games', { data: [...loto,...mega,...quina ] })

                const { saveGames } = CreatorsCart;

                dispatch(saveGames())

                Toast.show(`Apostas salvas com sucesso !`)

                setTimeout(() => { goToHome() }, 1000)
                
                setLoading(false)
            } 

        } catch(err) {
            setLoading(false)
            console.log('ERRO: ', err)
            return Toast.show(`Erro ao salvar ! Tente novamente.`)
        }  
    }
    

    return (
        <>
            { loading && 
                <View style={styles.loading} >
                    <ActivityIndicator size={100} color="#B5C401" /> 
                </View>
            }
            
            <View style={ loading ? { opacity: 0.1 } : { height: '100%', paddingBottom: '5%', position: 'relative' }} >
                <View style={{ width: '100%', alignItems: 'center', paddingTop: 15, marginTop: '10%' }} >
                    <FontAwesome onPress={closeDrawer} style={{ marginLeft: '75%' }} name="close" size={30} color="#B5C401" />
                </View>
                
                <View style={{ flexDirection: 'row', width: 100, alignItems: 'center' }} >
                    <AntDesign style={{ marginLeft: 10 }} name="shoppingcart" size={35} color="#B5C401" />
                    <Text style={{ marginLeft: 10, color: '#707070', fontSize: 30, fontStyle: 'italic', fontWeight: 'bold' }} >CART</Text>
                </View>

                <ScrollView style={{ height: '50%' }} >
                    <BoxGames>

                        { 
                            store.cartLotofacil.map((item, index) => (
                                <GameLotofacil key={index} >
                                    <BorderLotofacil />
                                    <BoxInfoGameLotofacil>
                                        <NumbersLotofacil>{item.join(', ')}</NumbersLotofacil>
                                        <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between'}} >
                                            <DateAndPriceLotofacil>{new Date().toLocaleDateString()} - R${types.typesLotofacil.price}</DateAndPriceLotofacil>
                                            <TouchableOpacity onPress={() => handleDeleteBetLotofacil(index)} >
                                                <FontAwesome name="trash-o" size={18} color="#707070" />
                                            </TouchableOpacity>
                                        </View>
                                        <NameGameLotofacil>{types.typesLotofacil.game_type}</NameGameLotofacil>
                                    </BoxInfoGameLotofacil>
                                </GameLotofacil>
                            ))
                        }
                    
                        { 
                            store.cartMegasena.map((item, index) => (
                                <GameMegaSena key={index} >
                                    <BorderMegaSena />
                                    <BoxInfoGameMegaSena>
                                        <NumbersMegaSena>{item.join(', ')}</NumbersMegaSena>
                                        <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between'}} >
                                            <DateAndPriceMegaSena>{new Date().toLocaleDateString()} - R${types.typesMegasena.price}</DateAndPriceMegaSena>
                                            <TouchableOpacity onPress={() => handleDeleteBetMegasena(index)} >
                                                <FontAwesome name="trash-o" size={18} color="#707070" />
                                            </TouchableOpacity>
                                        </View>
                                        <NameGameMegaSena>{types.typesMegasena.game_type}</NameGameMegaSena>
                                    </BoxInfoGameMegaSena>
                                </GameMegaSena>
                            ))
                        }

                        { 
                            store.cartQuina.map((item, index) => (
                                <GameQuina key={index} >
                                    <BorderQuina />
                                    <BoxInfoGameQuina>
                                        <NumbersQuina>{item.join(', ')}</NumbersQuina>
                                        <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between'}} >
                                            <DateAndPriceQuina>{new Date().toLocaleDateString()} - R${types.typesQuina.price}</DateAndPriceQuina>
                                            <TouchableOpacity 
                                                onPress={() => handleDeleteBetQuina(index)}
                                            >
                                                <FontAwesome name="trash-o" size={18} color="#707070" />
                                            </TouchableOpacity>
                                        </View>
                                        <NameGameQuina>{types.typesQuina.game_type}</NameGameQuina>
                                    </BoxInfoGameQuina>
                                </GameQuina>
                            ))
                        }

                    </BoxGames>
                </ScrollView>

                <View style={{ marginBottom: '-98%' }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', height: '5%', marginLeft: 15, marginBottom: 15 }} >
                        <Text style={{ color: '#707070', fontSize: 18, }} >
                            <Text style={{ color: '#707070', fontSize: 18, fontStyle: 'italic', fontWeight: 'bold' }} >CART </Text> 
                            TOTAL:
                        </Text>
                        <Text style={{ color: '#707070', fontSize: 18, fontWeight: 'bold' }} >
                            R$ { store.price.toFixed(2) }
                        </Text>
                    </View>

                    <View style={ Platform.OS === 'android' ? { alignItems: 'center', width: '100%', height: '40%', backgroundColor: '#EBEBEB'  } : 
                        {alignItems: 'center', width: '100%', height: '30%', backgroundColor: '#EBEBEB'} 
                    }>
                        <TouchableOpacity onPress={handleSaveBets} style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Text style={ Platform.OS === 'android' ? { color: '#B5C401', marginTop: '6%', fontSize: 30, fontStyle: 'italic', fontWeight: 'bold' } : 
                                {color: '#B5C401', marginTop: '12%', fontSize: 30, fontStyle: 'italic', fontWeight: 'bold'}
                            }>
                                Save
                            </Text>
                            <AntDesign style={Platform.OS === 'ios' ? { marginTop: '14%' } : { marginTop: '9%' } } name="arrowright" size={24} color="#B5C401" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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

export default DrawerCart;