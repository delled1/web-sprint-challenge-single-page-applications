//ICE
import React from "react"
import { Link } from "react-router-dom"
import StyledHome from "../style"

export default function Home(props) {
    return(
        <StyledHome>
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
        </StyledHome>
    )
}