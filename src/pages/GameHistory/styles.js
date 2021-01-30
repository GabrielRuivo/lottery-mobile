import styled from 'styled-components/native';


export const Container = styled.View`
    flex: 1;
    background-color: #F7F7F7;
`;

export const Header = styled.View`

    width: 100%;
    height: 100px;
    background-color: #FFF;

    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;

    padding-top: 10%;
    padding-left: 20px;
    padding-right: 20px;
`;

export const BoxTitle = styled.View`
    justify-content: center;
    align-items: center;
`;

export const Title = styled.Text`
    color: #707070;
    font-size: 35px;
    font-style: italic;
    font-weight: bold;
`;

export const Border = styled.View`
    width: 70px;
    height: 7px;
    border-radius: 5px;
    background-color: #B5C401;
`;

export const BoxFiltersRecentGames = styled.View`
    width: 100%;
    height: 140px;
    padding: 10px;
`;

export const RecentGamesText = styled.Text`
    font-size: 25px;
    font-weight: bold;
    font-style: italic;
    color: #707070;
`;

export const FiltersText = styled.Text`
    font-style: italic;
    font-size: 18px;
    color: #868686;
    margin: 10px 0;
`;

export const BoxButtonsFilters = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const ButtonLotofacil = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;

    border: 2.5px solid #7F3992;
    border-radius: 25px;
    width: 30%;
    height: 35px;

    padding-top: 4px;
    padding-left: 10px;
`;

export const TextButtonLotofacil = styled.Text`
    color: #7F3992;
    font-weight: bold;
    font-size: 16px;
    font-style: italic;
`;

export const ButtonMegaSena = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;

    border: 2.5px solid #01AC66;
    border-radius: 25px;
    width: 30%;
    height: 35px;

    padding-top: 4px;
    padding-left: 6.5px;
`;

export const TextButtonMegaSena = styled.Text`
    color: #01AC66;
    font-weight: bold;
    font-size: 16px;
    font-style: italic;
`;

export const ButtonQuina = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;

    border: 2.5px solid #F79C31;
    border-radius: 25px;
    width: 30%;
    height: 35px;

    padding-top: 4px;
    padding-left: 8px;
`;

export const TextButtonQuina = styled.Text`
    color: #F79C31;
    font-weight: bold;
    font-size: 16px;
    font-style: italic;
`;




export const BoxGames = styled.View`

    width: 100%;
    height: 100%;
    padding: 10px;
`;




export const GameLotofacil = styled.View`
    flex-direction: row;
    width: 95%;
    height: 100px;
    margin: 10px;
`;

export const BorderLotofacil = styled.View`
    width: 7px;
    height: 100%;
    background-color: #7F3992;
    border-radius: 10px;
`;

export const BoxInfoGameLotofacil = styled.View`
    padding: 10px;
    justify-content: space-between;
`;

export const NumbersLotofacil = styled.Text`
    font-size: 14px;
    font-style: italic;
    font-weight: bold;
    color: #868686;
`;

export const DateAndPriceLotofacil = styled.Text`
    font-size: 13px;
    color: #868686;
`;

export const NameGameLotofacil = styled.Text`
    font-size: 18px;
    font-style: italic;
    font-weight: bold;
    color: #7F3992;
`;




export const GameMegaSena = styled.View`
    flex-direction: row;
    width: 95%;
    height: 100px;
    margin: 10px;
`;

export const BorderMegaSena = styled.View`
    width: 7px;
    height: 100%;
    background-color: #01AC66;
    border-radius: 10px;
`;

export const BoxInfoGameMegaSena = styled.View`
    padding: 10px;
    justify-content: space-between;
`;

export const NumbersMegaSena = styled.Text`
    font-size: 14px;
    font-style: italic;
    font-weight: bold;
    color: #868686;
`;

export const DateAndPriceMegaSena = styled.Text`
    font-size: 13px;
    color: #868686;
`;

export const NameGameMegaSena = styled.Text`
    font-size: 18px;
    font-style: italic;
    font-weight: bold;
    color: #01AC66;
`;




export const GameQuina = styled.View`
    flex-direction: row;
    width: 95%;
    height: 100px;
    margin: 10px;
`;

export const BorderQuina = styled.View`
    width: 7px;
    height: 100%;
    background-color: #F79C31;
    border-radius: 10px;
`;

export const BoxInfoGameQuina = styled.View`
    padding: 5px;
    justify-content: space-between;
`;

export const NumbersQuina = styled.Text`
    font-size: 14px;
    font-style: italic;
    font-weight: bold;
    color: #868686;
`;

export const DateAndPriceQuina = styled.Text`
    font-size: 13px;
    color: #868686;
`;

export const NameGameQuina = styled.Text`
    font-size: 18px;
    font-style: italic;
    font-weight: bold;
    color: #F79C31;
`;


export const ButtonMainTabNavigator = styled.View`
    position: absolute;
    bottom: 0;
    margin-bottom: -30px;
    height: 100px;
    width: 100px;
    background-color: #aaa;

    border: 5px solid #fff;
    border-radius: 100px;
`;