import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Text, View, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { 
    Container, 
    Header, 
    BoxTitle, 
    Title, 
    Border,
    BoxFiltersRecentGames,
    RecentGamesText,
    FiltersText,
    BoxButtonsFilters,
    ButtonLotofacil,
    TextButtonLotofacil,
    ButtonMegaSena,
    TextButtonMegaSena,
    ButtonQuina,
    TextButtonQuina,

    BoxButtons,
    BoxInfoAboutGame,

} from './styles';

const Games = ({ navigation }) => {

    const store = useSelector(state => state);
    const dispatch = useDispatch();

    const BUTTONS_LOTOFACIL = Array.from({ length: 25  }).map(() => false);
    const BUTTONS_MEGASENA  = Array.from({ length: 60  }).map(() => false);
    const BUTTONS_QUINA = Array.from({ length: 80 }).map(() => false);

    const [listLotofacil, setListLotofacil] = React.useState(BUTTONS_LOTOFACIL);
    const [listMegasena, setListMegasena] = React.useState(BUTTONS_MEGASENA);
    const [listQuina, setListQuina] = React.useState(BUTTONS_QUINA);

    const [ filterLotofacil, setFilterLotofacil ] = React.useState(true)
    const [ filterMegasena, setFilterMegasena ] = React.useState(false)
    const [ filterQuina, setFilterQuina ] = React.useState(false)

    const [ betsSavesLotofacil, setBetsSavesLotofacil ] = React.useState([]);
    const [ betsSavesMegasena, setBetsSavesMegasena ] = React.useState([]);
    const [ betsSavesQuina, setBetsSavesQuina ] = React.useState([]);


    function handleLogout() {
        navigation.navigate('Login')
    }
    function handleToHome() {
        navigation.navigate('Home')
    }
    function goToCartDrawer() {
        navigation.openDrawer();
    }




    function filteredLotofacil() {
        setFilterLotofacil(true)
        setFilterMegasena(false)
        setFilterQuina(false)
    }

    function filteredMegasena() {
        setFilterLotofacil(false)
        setFilterMegasena(true)
        setFilterQuina(false)
    }

    function filteredQuina() {
        setFilterLotofacil(false)
        setFilterMegasena(false)
        setFilterQuina(true)
    }




    function getBetsLotofacil() {
        return listLotofacil.reduce((buttons, isBtnSelected, index) => {
            if (isBtnSelected) {
                return [...buttons, index + 1]
            }
            return buttons;
        }, [])
    }
    const betsLotofacil = getBetsLotofacil();
    function toggleButtonStateLotofacil(buttonIndex) {
        const canToggleBtn = betsLotofacil.length <= 14;

        setListLotofacil((oldList) => {
            const newList = oldList.map((isBtnSelected, index) => {
                const shouldToggleBtnState = index === buttonIndex;
                if(canToggleBtn) {
                    return shouldToggleBtnState === true ? !isBtnSelected : isBtnSelected;
                }
                return isBtnSelected && shouldToggleBtnState ? false : isBtnSelected;
            });
            return newList;
        });
    }

    function getBetsMegasena() {
        return listMegasena.reduce((buttons, isBtnSelected, index) => {
            if (isBtnSelected) {
                return [...buttons, index + 1]
            }
            return buttons;
        }, [])
    }
    const betsMegasena = getBetsMegasena();
    function toggleButtonStateMegasena(buttonIndex) {
        const canToggleBtn = betsMegasena.length <= 5;

        setListMegasena((oldList) => {
            const newList = oldList.map((isBtnSelected, index) => {
                const shouldToggleBtnState = index === buttonIndex;
                if(canToggleBtn) {
                    return shouldToggleBtnState === true ? !isBtnSelected : isBtnSelected;
                }
                return isBtnSelected && shouldToggleBtnState ? false : isBtnSelected;
            });
            return newList;
        });
    }

    function getBetsQuina() {
        return listQuina.reduce((buttons, isBtnSelected, index) => {
            if (isBtnSelected) {
                return [...buttons, index + 1]
            }
            return buttons;
        }, [])
    }
    const betsQuina = getBetsQuina();
    function toggleButtonStateQuina(buttonIndex) {
        const canToggleBtn = betsQuina.length <= 4;

        setListQuina((oldList) => {
            const newList = oldList.map((isBtnSelected, index) => {
                const shouldToggleBtnState = index === buttonIndex;
                if(canToggleBtn) {
                    return shouldToggleBtnState === true ? !isBtnSelected : isBtnSelected;
                }
                return isBtnSelected && shouldToggleBtnState ? false : isBtnSelected;
            });
            return newList;
        });
    }




    function handleCompleteGameLotofacil() {
        function qtdTrue(value) { return value === true; }
        let filtered = listLotofacil.filter(qtdTrue);

        let qtdToAdd =  15 - filtered.length
        if(betsLotofacil.length < 15) {

            let randonBets = [];
            while(randonBets.length < qtdToAdd) {
                let randomBets = Math.floor(Math.random() * (25 - 1)) + 1;

                if(randonBets.indexOf(randomBets) === -1) {
                    if(listLotofacil[randomBets - 1] === false) {
                        listLotofacil[randomBets - 1] = true
                        randonBets.push(randomBets);
                    }
                }
            }
            setBetsSavesLotofacil(
                ...betsSavesLotofacil, (randonBets.sort((a,b) => a - b ))
            );  
        } else {
            return ToastAndroid.show('O Jogo já está completo !', ToastAndroid.SHORT);
        }
    } 

    function handleCompleteGameMegasena() {
        function qtdTrue(value) { return value === true; }
        let filtered = listMegasena.filter(qtdTrue);

        let qtdToAdd = 6 - filtered.length
        if(betsMegasena.length < 6) {

            let randonBets = [];
            while(randonBets.length < qtdToAdd) {
                let randomBets = Math.floor(Math.random() * (60 - 1)) + 1;

                if(randonBets.indexOf(randomBets) === -1) {
                    if(listMegasena[randomBets - 1] === false) {
                        listMegasena[randomBets - 1] = true
                        randonBets.push(randomBets);
                    }
                }
            }
            setBetsSavesMegasena(
                ...betsSavesMegasena, (randonBets.sort((a,b) => a - b ))
            );  
        } else {
            return ToastAndroid.show('O Jogo já está completo !', ToastAndroid.SHORT);
        }
    } 
    
    function handleCompleteGameQuina() {
        function qtdTrue(value) { return value === true; }
        let filtered = listQuina.filter(qtdTrue);

        let qtdToAdd =  5 - filtered.length
        if(betsQuina.length < 5) {

            let randonBets = [];
            while(randonBets.length < qtdToAdd) {
                let randomBets = Math.floor(Math.random() * (80 - 1)) + 1;

                if(randonBets.indexOf(randomBets) === -1) {
                    if(listQuina[randomBets - 1] === false) {
                        listQuina[randomBets - 1] = true
                        randonBets.push(randomBets);
                    }
                }
            }
            setBetsSavesQuina(
                ...betsSavesQuina, (randonBets.sort((a,b) => a - b ))
            );  
        } else {
            return ToastAndroid.show('O Jogo já está completo !', ToastAndroid.SHORT);
        }
    } 




    function handleClearGameLotofacil() {
        setListLotofacil(listLotofacil.map(() => false))
        setBetsSavesLotofacil([]); 
    }
    function handleClearGameMegasena() {
        setListMegasena(listMegasena.map(() => false))
        setBetsSavesMegasena([]); 
    }
    function handleClearGameQuina() {
        setListQuina(listQuina.map(() => false))
        setBetsSavesQuina([]); 
    }




    function handleAddtoCartLotofacil() {
        if (betsLotofacil.length < 15) {
            return ToastAndroid.show('Minímo 15 números !', ToastAndroid.SHORT);
        }

        if (betsLotofacil.length >= 15) {
            
            try {
                console.log('betsLotofacil: ', betsLotofacil)

                dispatch({
                    type: 'ADD_CART_LOTOFACIL',
                    payload: betsLotofacil,
                    price: 2.50
                })

                ToastAndroid.show('Adicionado ao Cart !', ToastAndroid.SHORT);
                
                handleClearGameLotofacil();

            } catch (err) {
                console.log(err, 'DEU RUIM !')
            }
        }

    }

    function handleAddtoCartMegasena() {
        if (betsMegasena.length < 6) {
            return ToastAndroid.show('Minímo 6 números !', ToastAndroid.SHORT);
        }

        if (betsMegasena.length >= 6) {
            
            try {
                console.log('betsMegasena: ', betsMegasena)

                dispatch({
                    type: 'ADD_CART_MEGASENA',
                    payload: betsMegasena,
                    price: 4.50
                })

                ToastAndroid.show('Adicionado ao Cart !', ToastAndroid.SHORT);
                
                handleClearGameMegasena();

            } catch (err) {
                console.log(err, 'DEU RUIM !')
            }
        }

    }

    function handleAddtoCartQuina() {
        if (betsQuina.length < 5) {
            return ToastAndroid.show('Minímo 5 números !', ToastAndroid.SHORT);
        }

        if (betsQuina.length >= 5) {
            
            try {
                console.log('betsQuina: ', betsQuina)

                dispatch({
                    type: 'ADD_CART_QUINA',
                    payload: betsQuina,
                    price: 2
                })

                ToastAndroid.show('Adicionado ao Cart !', ToastAndroid.SHORT);
                
                handleClearGameQuina();

            } catch (err) {
                console.log(err, 'DEU RUIM !')
            }
        }

    }


/*     console.log('TYPES LOTOFACIL DENTRO DO GAMES: ', store.typesLotofacil) */

    return (
        <Container>

            <Header>
                <TouchableOpacity onPress={handleToHome} >
                    <BoxTitle >
                        <Title>TGL</Title>
                        <Border/>
                    </BoxTitle>
                </TouchableOpacity>
                

                { 
                    betsLotofacil.length > 0 || betsMegasena.length > 0 || betsQuina.length > 0 
                ||  store.cartLotofacil.length > 0 || store.cartMegasena.length > 0 || store.cartQuina.length > 0 ? 
                    <TouchableOpacity onPress={goToCartDrawer} style={{ marginLeft: '45%', position: 'relative' }} >
                        <AntDesign name="shoppingcart" size={40} color="#B5C401" />
                        <Text style={{ position: 'absolute', top: 6, right: 12, color:'#868686', fontWeight: 'bold',  }} >
                            {store.cartLotofacil.length + store.cartMegasena.length + store.cartQuina.length}
                        </Text>
                    </TouchableOpacity>
                    : null
                }

                <TouchableOpacity onPress={handleLogout} >
                    <MaterialIcons name="logout" size={35} color="#C1C1C1" />   
                </TouchableOpacity>

            </Header>
            
            <BoxFiltersRecentGames>
                <RecentGamesText> NOVA APOSTA PARA 
                    { filterLotofacil && <Text>{' '}LOTOFACIL</Text> }
                    { filterMegasena  && <Text>{' '}MEGA-SENA</Text> }
                    { filterQuina && <Text>{' '}QUINA</Text> }
                </RecentGamesText>

                <FiltersText>Escolha um jogo</FiltersText>

                <BoxButtonsFilters>
                    <ButtonLotofacil 
                        onPress={filteredLotofacil} 
                        style={ filterLotofacil && { backgroundColor: `${store.typesLotofacil.color}` }} >
                        <TextButtonLotofacil style={ filterLotofacil && { color: '#fff' }} >{store.typesLotofacil.game_type}</TextButtonLotofacil>
                    </ButtonLotofacil>

                    <ButtonMegaSena
                        onPress={filteredMegasena} 
                        style={ filterMegasena && { backgroundColor: `${store.typesMegasena.color}` }}
                    >
                        <TextButtonMegaSena style={ filterMegasena && { color: '#fff' }} >{store.typesMegasena.game_type}</TextButtonMegaSena>
                    </ButtonMegaSena>

                    <ButtonQuina
                        onPress={filteredQuina} 
                        style={ filterQuina && { backgroundColor: `${store.typesQuina.color}` }}
                    >
                        <TextButtonQuina style={ filterQuina && { color: '#fff' }} >{store.typesQuina.game_type}</TextButtonQuina>
                    </ButtonQuina>

                </BoxButtonsFilters>
            </BoxFiltersRecentGames>

            <BoxInfoAboutGame>

                { betsLotofacil.length === 0  && filterLotofacil === true &&
                    <>
                        {
                            filterLotofacil && 
                            <>
                                <Text   
                                    style={{ 
                                        marginBottom: 5, 
                                        fontWeight: 'bold', 
                                        fontSize: 20, 
                                        fontStyle: 'italic',
                                        color: '#868686'
                                    }} >Faça sua aposta</Text>

                                <Text 
                                    style={{ 
        
                                        fontSize: 15, 
                                        fontStyle: 'italic',
                                        color: '#868686'
                                    }}
                                >
                                   {store.typesLotofacil.description}
                                </Text>
                            </>
                        }
                    </> 
                }
                {
                    betsLotofacil.length > 0 && filterLotofacil === true && 
                    <>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false} 
                        legacyImplementation={true} 
                    >
                        <View style={{ flexDirection: 'row' }} > 
                            {
                                betsLotofacil.map((isBtnSelected, buttonIndex) => (
                                    <TouchableOpacity 
                                        key={isBtnSelected}
                                        style={{
                                            position: 'relative',
                                            margin: 5,
                                            backgroundColor: "#7F3992",
                                            borderRadius: 100,
                                            width: 40,
                                            height: 40,
                                            
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        onPress={() => toggleButtonStateLotofacil(isBtnSelected - 1)}
                                    >
                                        <Feather style={{ position: 'absolute', top: 6, right: 6 }} name="x" size={10} color="#f7f7f7" />
                                        <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 14 }} >{isBtnSelected}</Text>
                                    </TouchableOpacity>
                                ))
                            } 
                        </View>
                    </ScrollView>
                    
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 10 }} >
                            <TouchableOpacity 
                                style={{ 
                                    borderRadius: 5, 
                                    borderColor: '#B5C401', 
                                    borderWidth: 2, 
                                    width: 110, 
                                    height: 35, 
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    
                                }}
                            >
                                <Text onPress={handleCompleteGameLotofacil} style={{ color: '#B5C401', fontWeight: 'bold' }} >Complete Game</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={{ 
                                    borderRadius: 5, 
                                    borderColor: '#B5C401', 
                                    borderWidth: 2, 
                                    width: 80, 
                                    height: 35, 
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    
                                }}
                            >
                                <Text onPress={handleClearGameLotofacil} style={{ color: '#B5C401', fontWeight: 'bold' }} >Clear game</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={handleAddtoCartLotofacil}
                                style={{ 
                                    borderRadius: 5, 
                                    borderColor: '#B5C401', 
                                    backgroundColor: '#B5C401',
                                    borderWidth: 2, 
                                    width: 130, 
                                    height: 35, 
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-evenly',
                                    
                                }}
                            >
                                <AntDesign name="shoppingcart" size={24} color="#FFF" />
                                <Text style={{ color: '#FFF', fontWeight: 'bold' }} >Add to cart</Text>
                            </TouchableOpacity>
                        </View>
                            
                    </> 
                }




                { betsMegasena.length === 0  && filterMegasena === true &&
                    <>
                        {
                            filterMegasena && 
                            <>
                                <Text   
                                    style={{ 
                                        marginBottom: 5, 
                                        fontWeight: 'bold', 
                                        fontSize: 20, 
                                        fontStyle: 'italic',
                                        color: '#868686'
                                    }} >Faça sua aposta</Text>

                                <Text 
                                    style={{ 
                                        fontSize: 15, 
                                        fontStyle: 'italic',
                                        color: '#868686'
                                    }}
                                >
                                   {store.typesMegasena.description}
                                </Text>
                            </>
                        }
                    </> 
                }
                {
                    betsMegasena.length > 0 && filterMegasena === true && 
                    <>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false} 
                        legacyImplementation={true} 
                    >
                        <View style={{ flexDirection: 'row' }} > 
                            {
                                betsMegasena.map((isBtnSelected, buttonIndex) => (
                                    <TouchableOpacity 
                                        key={isBtnSelected}
                                        style={{
                                            position: 'relative',
                                            margin: 5,
                                            backgroundColor: "#01AC66",
                                            borderRadius: 100,
                                            width: 40,
                                            height: 40,
                                            
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        onPress={() => toggleButtonStateMegasena(isBtnSelected - 1)}
                                    >
                                        <Feather style={{ position: 'absolute', top: 6, right: 6 }} name="x" size={10} color="#f7f7f7" />
                                        <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 14 }} >{isBtnSelected}</Text>
                                    </TouchableOpacity>
                                ))
                            } 
                        </View>
                    </ScrollView>
                    
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 10 }} >
                            <TouchableOpacity 
                                style={{ 
                                    borderRadius: 5, 
                                    borderColor: '#B5C401', 
                                    borderWidth: 2, 
                                    width: 110, 
                                    height: 35, 
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    
                                }}
                            >
                                <Text onPress={handleCompleteGameMegasena} style={{ color: '#B5C401', fontWeight: 'bold' }} >Complete Game</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={{ 
                                    borderRadius: 5, 
                                    borderColor: '#B5C401', 
                                    borderWidth: 2, 
                                    width: 80, 
                                    height: 35, 
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    
                                }}
                            >
                                <Text onPress={handleClearGameMegasena} style={{ color: '#B5C401', fontWeight: 'bold' }} >Clear game</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={handleAddtoCartMegasena}
                                style={{ 
                                    borderRadius: 5, 
                                    borderColor: '#B5C401', 
                                    backgroundColor: '#B5C401',
                                    borderWidth: 2, 
                                    width: 130, 
                                    height: 35, 
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-evenly',
                                    
                                }}
                            >
                                <AntDesign name="shoppingcart" size={24} color="#FFF" />
                                <Text style={{ color: '#FFF', fontWeight: 'bold' }} >Add to cart</Text>
                            </TouchableOpacity>
                        </View>

                            
                    </> 
                }




                { betsQuina.length === 0  && filterQuina === true &&
                    <>
                        {
                            filterQuina && 
                            <>
                                <Text   
                                    style={{ 
                                        marginBottom: 5, 
                                        fontWeight: 'bold', 
                                        fontSize: 20, 
                                        fontStyle: 'italic',
                                        color: '#868686'
                                    }} >Faça sua aposta</Text>

                                <Text 
                                    style={{ 
        
                                        fontSize: 15, 
                                        fontStyle: 'italic',
                                        color: '#868686'
                                    }}
                                >
                                   {store.typesQuina.description}
                                </Text>
                            </>
                        }
                    </> 
                }
                {
                    betsQuina.length > 0 && filterQuina === true && 
                    <>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false} 
                        legacyImplementation={true} 
                    >
                        <View style={{ flexDirection: 'row' }} > 
                            {
                                betsQuina.map((isBtnSelected, buttonIndex) => (
                                    <TouchableOpacity 
                                        key={isBtnSelected}
                                        style={{
                                            position: 'relative',
                                            margin: 5,
                                            backgroundColor: "#F79C31",
                                            borderRadius: 100,
                                            width: 40,
                                            height: 40,
                                            
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        onPress={() => toggleButtonStateQuina(isBtnSelected - 1)}
                                    >
                                        <Feather style={{ position: 'absolute', top: 6, right: 6 }} name="x" size={10} color="#f7f7f7" />
                                        <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 14 }} >{isBtnSelected}</Text>
                                    </TouchableOpacity>
                                ))
                            } 
                        </View>
                    </ScrollView>
                    
                    {/* <View>  */}{/* BUTTONS CLEAT GAME, COMPLETE E ADD TO CART */}
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 10 }} >
                            <TouchableOpacity 
                                style={{ 
                                    borderRadius: 5, 
                                    borderColor: '#B5C401', 
                                    borderWidth: 2, 
                                    width: 110, 
                                    height: 35, 
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    
                                }}
                            >
                                <Text onPress={handleCompleteGameQuina} style={{ color: '#B5C401', fontWeight: 'bold' }} >Complete Game</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={{ 
                                    borderRadius: 5, 
                                    borderColor: '#B5C401', 
                                    borderWidth: 2, 
                                    width: 80, 
                                    height: 35, 
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    
                                }}
                            >
                                <Text onPress={handleClearGameQuina} style={{ color: '#B5C401', fontWeight: 'bold' }} >Clear game</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={handleAddtoCartQuina}
                                style={{ 
                                    borderRadius: 5, 
                                    borderColor: '#B5C401', 
                                    backgroundColor: '#B5C401',
                                    borderWidth: 2, 
                                    width: 130, 
                                    height: 35, 
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-evenly',
                                    
                                }}
                            >
                                <AntDesign name="shoppingcart" size={24} color="#FFF" />
                                <Text style={{ color: '#FFF', fontWeight: 'bold' }} >Add to cart</Text>
                            </TouchableOpacity>
                        </View>
                    {/* </View> */}
                            
                </> 
                }



                    
                <View style={{ backgroundColor: '#C1C1C1', width: 36, height: 6, marginHorizontal: '45%', borderRadius: 20, marginTop: 15 }} />
            </BoxInfoAboutGame>
            
            <ScrollView>
                <BoxButtons>
                {
                    filterLotofacil &&
                        listLotofacil.map((isBtnSelected, buttonIndex) => {
                        return (
                            <TouchableOpacity
                                key={buttonIndex}
                                style={{
                                    margin: 5,
                                    backgroundColor: isBtnSelected ? `${store.typesLotofacil.color}` : "#ADC0C4",
                                    borderRadius: 100,
                                    width: 55,
                                    height: 55,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onPress={() => toggleButtonStateLotofacil(buttonIndex)}
                            >
                                <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 18 }} >{buttonIndex + 1}</Text>
                            </TouchableOpacity>
                        );
                    })
                }


                {
                    filterMegasena &&
                        listMegasena.map((isBtnSelected, buttonIndex) => {
                        return (
                            <TouchableOpacity
                                key={buttonIndex}
                                style={{
                                    margin: 5,
                                    backgroundColor: isBtnSelected ? `${store.typesMegasena.color}` : "#ADC0C4",
                                    borderRadius: 100,
                                    width: 55,
                                    height: 55,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onPress={() => toggleButtonStateMegasena(buttonIndex)}
                            >
                                <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 18 }} >{buttonIndex + 1}</Text>
                            </TouchableOpacity>
                        );
                    })
                }




                {
                    filterQuina &&
                        listQuina.map((isBtnSelected, buttonIndex) => {
                        return (
                            <TouchableOpacity
                                key={buttonIndex}
                                style={{
                                    margin: 5,
                                    backgroundColor: isBtnSelected ? `${store.typesQuina.color}` : "#ADC0C4",
                                    borderRadius: 100,
                                    width: 55,
                                    height: 55,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onPress={() => toggleButtonStateQuina(buttonIndex)}
                            >
                                <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 18 }} >{buttonIndex + 1}</Text>
                            </TouchableOpacity>
                        );
                    })
                }


            </BoxButtons>
            </ScrollView>

        </Container>
    )
}

export default Games;