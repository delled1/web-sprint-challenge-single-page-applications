//ICE
import React from "react"
import Styled from "styled-components"

const StyledHome = Styled.div`
    .headerContainer {
        background-color: yellow;
        color: red;
        padding: 0;
        margin: 0 auto;
        height: 10vh;
        display: flex;
        justify-content: space-around;
    }

    .nav{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        a{
            text-decoration: none;
            color: red;
            padding: 3%;
            margin: 0 2%;
            border: solid red 3px;  
            
        }
    }
`

export default StyledHome;