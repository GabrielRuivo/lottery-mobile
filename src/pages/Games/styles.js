import styled from 'styled-components/native';


export const Container = styled.View`
    flex: 1;
    align-items: center;
    background-color: #F7F7F7;
`;

export const Header = styled.View`

    width: 100%;
    height: 100px;
    background-color: #FFF;

    flex-direction: row;
    align-items: center;
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
    
    background: transparent;

`;

export const RecentGamesText = styled.Text`
    font-size: 22px;
    font-weight: bold;
    font-style: italic;
    color: #707070;
`;

export const FiltersText = styled.Text`
    font-style: italic;
    font-size: 18px;
    color: #868686;
    margin: 10px 5px;
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
`;

export const TextButtonQuina = styled.Text`
    color: #F79C31;
    font-weight: bold;
    font-size: 16px;
    font-style: italic;
`;

export const BoxButtons = styled.View`
    width: 100%;
    margin-top: 0px;
    padding: 10px;
    flex-direction: row;
/*     background-color: #aaa; */
    flex-wrap: wrap;
`;

export const BoxInfoAboutGame = styled.View`
    width: 100%;
    padding: 10px;
    background: transparent;
    margin-top: -20px;
`;




