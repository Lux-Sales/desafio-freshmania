import styled from 'styled-components'

export const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 15em;
`

export const CardBody = styled.div`
button{
    width: 90%;
    height: 7em;
    margin-bottom: 12px;
    img{
        height: 100%;
        width: 2em;
    }
}
div{
    display: flex;
    flex-direction: column;
    input{
        padding-left: 5px;
        width: 95%;
        border-radius: 15px;
    }
    #title-input{
        margin-left: 3px;
        font-weight: bold;
    }
    #value-input{
        width: 4em;
        margin: 5px 5px 0 auto
    }
}
position: absolute;
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
border: solid 1px black;
border-radius: 15px;
height: 10em;
width: 8em;
background-color: #fff;
`
export const LateralButtons = styled.div`
    margin-left: 32px;
    margin-bottom: 3.5em;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    border: solid 1px black;
    width: 10em;
    height: 6.5em;
    button{
        width: 32px;
        height: 2em;
        margin: 0 0 auto auto;
        background-color: transparent;
        border: none;
        svg{
            flex: 1;
            width: 100%;
            height: 100%;
        }
    }
`