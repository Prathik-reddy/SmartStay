import React from 'react'
import { useState, useEffect } from "react";

const Profile = ({ account, contract }) => {

    const [hotelData, setHotelData] = useState();
    const [clicked, setClicked] = useState(false);
    const [data, setData] = useState(null);
    let userData = [];

    const getData = async () => {
        let data = await contract.getHotels();
        setHotelData(data);
        for (let i = 0; i < data.length; i++) {
            let hotelPer = await contract.perHotel(account, i);
            console.log(hotelPer.toString());
            userData.push(hotelPer.toString());
        }
        console.log("userDtaa is  ;", userData);
        setData(userData);
        setClicked(true);
        console.log("data is ", userData);
    }

    const checkoutHotel = async (hotelId) => {
        console.log(hotelId);
        let ch = await contract.checkout(hotelId);
        console.log(ch);

    }

    useEffect(() => {
        console.log("account is : " + account);
    }, [data])

    // 0    1   2
    // 2    0   10

    return (
        <>
            {
                clicked ? (

                    <table className="table container container-fluid">
                        <thead>
                            <tr>
                                <th scope="col">HotelName</th>
                                <th scope="col">HotelId</th>
                                <th scope="col">NoOfRooms</th>
                                <th scope="col">Checkout</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data ? (data.map((data, index) => {
                                    if (data != 0) {
                                        return (
                                            <>
                                                <tr >
                                                    <th scope="row">{hotelData[index][1]}</th>
                                                    <td >{index}</td>
                                                    <td>{data}</td>
                                                    <td><button className="btn btn-primary" onClick={() => { checkoutHotel(index) }}>checkout</button></td>
                                                </tr>
                                            </>

                                        )
                                    }
                                })) : (
                                    <>
                                        {console.log("HIIIII")}
                                    </>
                                )

                            }
                        </tbody>
                    </table>) :
                    <button onClick={() => { getData() }}>Get Profile Data</button>
            }

        </>

    )
}

export default Profile