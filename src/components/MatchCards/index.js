import React, { Component, useState, useEffect } from "react";
import Col from "../Col"
import "./style.css"


export default function MatchCards(props) {

    const [newData, setNewData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    console.log(props.arrayData)
    useEffect(() => {
        if (props.length === null) {
            setIsLoading(true)
        } if (props.length !== null) {
            setIsLoading(false)
        }
    }, [setIsLoading, props.length]
    )
    if (isLoading) {
        return (
        <div>
            <h1>No Current Matches</h1>
        </div>
        )
    } if (!isLoading) {
        return (
            <div className="Container fixed">
                {props.arrayData.map((item, userName) => (
                    <div key={userName}>
                    <Row-fixed>
                        <div className="mainCont ">
                                <div className="image">
                                    <Col size="md-3" className="image-col">
                                        <div>
                                            <img className="img" src={props.image} alt={item.userData.userName}></img>
                                            <div>
                                                <h5>{item.userData.userName}</h5>
                                            </div>
                                        </div>
                                    </Col>
                                </div>
                                <div className="messages">
                                    <Col size="md-5 messages">
                                        <div>
                                            <p className="text">{item.userData.userName}{props.message}</p>
                                        </div>
                                        </Col>
                                </div>
                                <div className="messageBtn">
                                    <Col size="md-3 messageBtn">

                                        <div className="button-container">
                                            <a style={{ borderTopRightRadius: "15px", borderBottomRightRadius: "15px", borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px"  }} type="submit" className="btn button-message" href={`mailto:doggie@gmail.com?subject=RW:`}><p className="btnText" style={{ fontFamily: "Arial", fontWeight: "bolder" }}>Message Now</p></a>
                                        </div>
                                    </Col>
                                </div>
                                </div>
                            </Row-fixed>
                    </div>
                ))}
            </div>
        )
    }
}