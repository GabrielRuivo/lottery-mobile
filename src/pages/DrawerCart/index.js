import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { View, Text, ScrollView, TouchableOpacity, ToastAndroid, ActivityIndicator, StyleSheet } from 'react-native';

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

    const store = useSelector(state => state);
    const dispatch = useDispatch();


    function handleDeleteBetLotofacil(index1) {
        let newData = store.cartLotofacil.filter((item, index) => index !== index1)

        dispatch({
            type: 'REMOVE_CART_LOTOFACIL',
            price: 2.50,
            newData,
        });

    }
    
    function handleDeleteBetMegasena(index1) {
        let newData = store.cartMegasena.filter((item, index) => index !== index1)
    
        dispatch({
            type: 'REMOVE_CART_MEGASENA',
            price: 4.50,
            newData,
        });
    }
    
    function handleDeleteBetQuina(index1) {
        let newData = store.cartQuina.filter((item, index) => index !== index1)
    
        dispatch({
            type: 'REMOVE_CART_QUINA',
            price: 2,
            newData,
        });
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
                return ToastAndroid.showWithGravity(`${store.user}, você precisa fazer no mínimo R$9,00, de apostas !`, 
                ToastAndroid.SHORT,
                ToastAndroid.CENTER)
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

                console.log('CART: ', store.cartLotofacil)
            

                const response = await api.post('games', {
                    data: [...loto,...mega,...quina ],
                })

                dispatch({
                    type: 'SAVE_GAMES',
                    /* cartLotofacil: store.cartLotofacil,
                    cartMegasena: store.cartMegasena,
                    cartQuina: store.cartQuina, */
                })

                /* console.log(response.data) */

                ToastAndroid.showWithGravity(`Apostas salvas com sucesso !`, 
                ToastAndroid.SHORT,
                ToastAndroid.CENTER)

                setTimeout(() => {
                    goToHome()
                }, 1000)
                
                setLoading(false)

            } 

        } catch(err) {
            setLoading(false)
            console.log('ERRO: ', err)
            return ToastAndroid.showWithGravity(`Erro ao salvar ! Tente novamente.`, 
            ToastAndroid.SHORT,
            ToastAndroid.CENTER)
        }  
    }
    

    return (
        <>
            { loading && 
                <View style={styles.loading} >
                    <ActivityIndicator size={100} color="#B5C401" /> 
                </View>
            }
            
            <View 
                style={ loading ? { opacity: 0.1 } : { height: '100%', paddingBottom: '5%', position: 'relative' }} 
            >
                <View style={{ width: '100%', alignItems: 'center', paddingTop: 15, marginTop: '5%' }} >
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
                                            <DateAndPriceLotofacil>25/01/2020 - R${store.typesLotofacil.price}`</DateAndPriceLotofacil>
                                            <TouchableOpacity onPress={() => handleDeleteBetLotofacil(index)} >
                                                <FontAwesome name="trash-o" size={18} color="#707070" />
                                            </TouchableOpacity>
                                        </View>
                                        <NameGameLotofacil>{store.typesLotofacil.game_type}</NameGameLotofacil>
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
                                            <DateAndPriceMegaSena>25/01/2020 - R${store.typesMegasena.price})</DateAndPriceMegaSena>
                                            <TouchableOpacity onPress={() => handleDeleteBetMegasena(index)} >
                                                <FontAwesome name="trash-o" size={18} color="#707070" />
                                            </TouchableOpacity>
                                        </View>
                                        <NameGameMegaSena>{store.typesMegasena.game_type}</NameGameMegaSena>
                                    </BoxInfoGameMegaSena>
                                </GameMegaSena>
                            ))
                        }

                        { 
                            store.cartQuina.map((item, index) => (
                                <GameQuina key={index} >
                                    <BorderQuina />
                                    <BoxInfoGameQuina>
                                        <NumbersQuina>
                                            {item.join(', ')}
                                        </NumbersQuina>
                                        <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between'}} >
                                            <DateAndPriceQuina>25/01/2020 - R${store.typesQuina.price})</DateAndPriceQuina>
                                            <TouchableOpacity 
                                                onPress={() => handleDeleteBetQuina(index)}
                                            >
                                                <FontAwesome name="trash-o" size={18} color="#707070" />
                                            </TouchableOpacity>
                                        </View>
                                        <NameGameQuina>{store.typesQuina.game_type}</NameGameQuina>
                                    </BoxInfoGameQuina>
                                </GameQuina>
                            ))
                        }

                    </BoxGames>
                </ScrollView>

                <View style={{ marginBottom: '-88%' }} >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', height: '5%', marginLeft: 15, padding: '5%', paddingBottom: '7%', }} >
                        <Text style={{ color: '#707070', fontSize: 18, }} >
                            <Text style={{ color: '#707070', fontSize: 18, fontStyle: 'italic', fontWeight: 'bold' }} >CART </Text> 
                            TOTAL:
                        </Text>
                        <Text style={{ color: '#707070', fontSize: 18, fontWeight: 'bold' }} >
                            R$ { store.price.toFixed(2) }
                        </Text>
                    </View>

                    <View style={{ alignItems: 'center', width: '100%', height: '40%', backgroundColor: '#EBEBEB'  }} >
                        <TouchableOpacity onPress={handleSaveBets} style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Text style={{ color: '#B5C401', marginTop: '6%', fontSize: 30, fontStyle: 'italic', fontWeight: 'bold' }} >Save</Text>
                            <AntDesign style={{ marginTop: '10%' }} name="arrowright" size={24} color="#B5C401" />
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