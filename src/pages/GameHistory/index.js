import React from 'react';

import { ScrollView, TouchableOpacity , Text, View, } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch, useSelector } from 'react-redux';

import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

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

const GameHistory = ({ navigation }) => {

    const store = useSelector(state => state);

    const dispatch = useDispatch();

    const [ filterLotofacil, setFilterLotofacil ] = React.useState(false)
    const [ filterMegaSena, setFilterMegaSena ] = React.useState(false)
    const [ filterQuina, setFilterQuina ] = React.useState(false)

    const [ dbInformation, setDbInformation ] = React.useState([])
    const [ username, setUsername ] = React.useState()

    const [ infoLotofacil, setInfoLotofacil ] = React.useState([]);
    const [ infoMegasena , setInfoMegasena ] = React.useState([]);
    const [ infoQuina, setInfoQuina ] = React.useState([]);



    React.useEffect(  () => {
        async function requestTypes () {
            const response = await api.get('types')

            setInfoLotofacil(response.data[0])
            setInfoMegasena(response.data[1])
            setInfoQuina(response.data[2])

            dispatch({
                type: 'SET_TYPES',
                lotofacil: response.data[0],
                megasena: response.data[1],
                quina: response.data[2],
            })
        }
        requestTypes()
    },[])

    React.useEffect(() => {
        async function handleStayLogIn () {
            const token = JSON.parse(await AsyncStorage.getItem('@CodeApi:token'))
            const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:user'))

            if(token) {
                api.defaults.headers.authorization = `Bearer ${token.token}`
                const response = await api.get(`/games?id=${user.id}` )
                setDbInformation(response.data)

                const userNameDb = await api.get(`/users?id=${user.id}`)

                /* console.log('USERNAMEDB: ', userNameDb.data) */
                const data = userNameDb.data;

                data.forEach(item => {
                    if(item.id === user.id) {
                        console.log(item.username)
                        setUsername(item.username)
                    }
                })
                
            }
   
        }
        handleStayLogIn()
    }, [])

    React.useEffect(() => {
    async function onRefresh() {
        const token = JSON.parse(await AsyncStorage.getItem('@CodeApi:token'))
        const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:user'))

        if(token) {
            api.defaults.headers.authorization = `Bearer ${token.token}`
            const response = await api.get(`/games?id=${user.id}` )

            setDbInformation(response.data)
        }
    }
    onRefresh()
    },[store.update] )

    React.useEffect(() => {
        if(dbInformation.length > 0 ) {
            setFilterLotofacil(true)
            setFilterMegaSena(true)
            setFilterQuina(true)
        }
    }, [dbInformation])





    function handleLogout() {
        dispatch({type: 'LOG_OUT'})
        
        AsyncStorage.removeItem('@CodeApi:token')
        AsyncStorage.removeItem('@CodeApi:user')

        navigation.navigate('Login')
        
    }
    
    function handleToHome() {
        navigation.navigate('Home')
    }


    

    function filteredLotofacil() {
        setFilterLotofacil(!filterLotofacil)
    }
    function filteredMegaSena() {
        setFilterMegaSena(!filterMegaSena)
    }
    function filteredQuina() {
        setFilterQuina(!filterQuina)
    }



    
    return (
        <Container>
            <Header>
                <TouchableOpacity onPress={handleToHome} >
                    <BoxTitle >
                        <Title>TGL</Title>
                        <Border/>
                    </BoxTitle>
                </TouchableOpacity>
                
                <View style={{ flexDirection: 'row', alignItems: 'center'}} >
                    <Text style={{ color: "#868686", fontSize: 18, fontStyle: 'italic', fontWeight: 'bold' , marginRight: 15 }} >{username}</Text>
                    <MaterialIcons onPress={handleLogout} name="logout" size={30} color="#C1C1C1" />   
                </View>
            </Header>

            <BoxFiltersRecentGames>
                <RecentGamesText>RECENT GAMES</RecentGamesText>
                <FiltersText>Filters</FiltersText>

                <BoxButtonsFilters>
                    <ButtonLotofacil 
                        onPress={filteredLotofacil} 
                        style={ filterLotofacil && { backgroundColor: `${infoLotofacil.color}` }} >
                        <TextButtonLotofacil style={ filterLotofacil && { color: '#fff' }} >Lotofácil</TextButtonLotofacil>
                        <Feather name="x" size={13} color="#f7f7f7" />
                    </ButtonLotofacil>

                    <ButtonMegaSena
                        onPress={filteredMegaSena} 
                        style={ filterMegaSena && { backgroundColor: `${infoMegasena.color}` }}
                    >
                        <TextButtonMegaSena style={ filterMegaSena && { color: '#fff' }} >Mega-Sena</TextButtonMegaSena>
                        <Feather name="x" size={13} color="#f7f7f7" />
                    </ButtonMegaSena>

                    <ButtonQuina
                        onPress={filteredQuina} 
                        style={ filterQuina && { backgroundColor: `${infoQuina.color}` }}
                    >
                        <TextButtonQuina style={ filterQuina && { color: '#fff' }} >Quina</TextButtonQuina>
                        <Feather name="x" size={13} color="#f7f7f7" />
                    </ButtonQuina>
                </BoxButtonsFilters>
            </BoxFiltersRecentGames>

            <ScrollView>
            { dbInformation.length <= 0 && 
                <Text style={{ color: "#868686", fontSize: 14, fontStyle: 'italic', marginLeft: 15 }} >
                    Você não tem nenhuma aposta salva, faça a sua agora clicando no ícone verde abaixo !
                </Text>
            }
            
            <BoxGames>
            {
                dbInformation.length > 0 &&
                dbInformation.map(item => {

                    if (filterLotofacil) {
                        if (item.game_id === 1) {
                            return (
                                <GameLotofacil key={Math.random()} >
                                    <BorderLotofacil />
                                    <BoxInfoGameLotofacil>
                                        <NumbersLotofacil>{item.numbers}</NumbersLotofacil>
                                        <DateAndPriceLotofacil>{item.date} - (R$ {infoLotofacil.price})</DateAndPriceLotofacil>
                                        <NameGameLotofacil>lotofacil</NameGameLotofacil>
                                    </BoxInfoGameLotofacil>
                                </GameLotofacil>
                            )
                        }
                    }

                    if (filterMegaSena) {
                        if (item.game_id === 2) {
                            return (
                                <GameMegaSena key={Math.random()} >
                                    <BorderMegaSena />
                                    <BoxInfoGameMegaSena>
                                        <NumbersMegaSena>{item.numbers}</NumbersMegaSena>
                                        <DateAndPriceMegaSena>{item.date} - (R$ {infoMegasena.price})</DateAndPriceMegaSena>
                                        <NameGameMegaSena>megasena</NameGameMegaSena>
                                    </BoxInfoGameMegaSena>
                                </GameMegaSena>
                            )
                        }
                    }

                    if (filterQuina) {
                        if (item.game_id === 3) {
                            return (
                                <GameQuina key={Math.random()} >
                                    <BorderQuina />
                                    <BoxInfoGameQuina>
                                        <NumbersQuina>{item.numbers}</NumbersQuina>
                                        <DateAndPriceQuina>{item.date} - (R$ {infoQuina.price})</DateAndPriceQuina>
                                        <NameGameQuina>quina</NameGameQuina>
                                    </BoxInfoGameQuina>
                                </GameQuina>
                            )
                        }
                    }

                })
            }


            </BoxGames>
        </ScrollView>
        </Container>
    )
}


export default GameHistory;