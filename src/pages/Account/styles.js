import styled, { css } from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #f7f7f7;
    justify-content: center;
    align-items: center;
`;

export const BoxTitle = styled.View`
    background-color: #f7f7f7;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;

export const Title = styled.Text`
    color: #707070;
    font-size: 50px;
    font-style: italic;
    font-weight: bold;
    /* ${Platform.select({ ios: css`font-family: Helvetica`, android: css`font-family: Roboto` })}; */
`;

export const Border = styled.View`
    width: 110px;
    height: 8px;
    border-radius: 5px;
    background-color: #B5C401;
`;

export const SubTitle = styled.Text`
    color: #707070;
    font-size: 40px;
    font-weight: bold;
    font-style: italic;
    margin-bottom: 10px;
`;

export const Form = styled.View`
    width: 85%;
    height: 300px;
    border-radius: 10px;
    border: 1px solid #ddd;
    background-color: #FFFFFF;
`;

export const BoxInputName = styled.View`
    width: 100%;
    height: 25%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: #FFF;

    align-items: center;
    justify-content: center;
`;

export const BoxInputPassword = styled.View`
    width: 100%;
    height: 25%;
    border: 1px solid #ddd;
    background-color: #FFF;
    padding-right: 15px;

    border-left-width: 0;
    border-right-width: 0;
    
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`;

export const ForgetPassword = styled.Text`
    color: #C1C1C1;
    margin-left: 45%;
    margin-top: 8%;
`;

export const BoxButtonLogin = styled.View`

    flex-direction: row;
    align-items: center;
    justify-content: center;

    margin-top: 30px;
`;

export const ButtonLogin = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const TextButton = styled.Text`
    color: #B5C401;
    font-size: 35px;
    font-weight: bold;
    font-style: italic;
`;

export const TextButtonSignUp = styled.Text`
    color: #707070;
    font-size: 35px;
    font-weight: bold;
    font-style: italic;
`;

export const TextCopyright = styled.Text`
    color: #707070;
    font-size: 15px;
`;



