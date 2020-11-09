//ICE
import React from "react"
import { Link } from "react-router-dom"
import StyledComponents from "../style"

export default function Home() {
    return(
        <StyledComponents>
            <div className="headerContainer">
                <h1>Lambda Eats</h1>
                <div className="nav">
                    <Link to="/">
                        Home
                    </Link>
                    <Link to="/Pizza">
                        Order
                    </Link>
                </div>
            </div>
            <div className="bodyContainer">
                <div className="bodyTitle">
                <h2>WELCOME TO LAMBDA EATS</h2>
                </div>
                <div>
                <p>Where your pizza dreams come true</p>
                </div>
            </div>
        </StyledComponents>
    )
}