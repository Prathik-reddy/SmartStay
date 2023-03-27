import React from 'react'
import { useState, useEffect } from "react";
import { ethers } from "ethers";



const AddHotel = ({ provider, account, contract }) => {

    const [hotels, setHotels] = useState();
    let ContractHotels;
    let ContractHotels2 = [];
    let newHotel = [];


    const addHotel = async () => {

        let hotelName = document.querySelector("#name").value;
        let noOfRooms = document.querySelector("#noOfRooms").value;
        let price = document.querySelector("#price").value;
        console.log("price is ", price);
        let isAc = document.querySelector("#Ac").checked ? true : false;
        console.log(isAc);

        try {
            const signer = contract.connect(provider.getSigner());
            await signer.addHotel(hotelName, noOfRooms, price, isAc);
            console.log("hotelAdded");

        } catch (error) {
            console.log(error);
        }
    }


    const getHotels = async () => {
        ContractHotels = await contract.getHotels();
        console.log("CH is : ", ContractHotels);
        for (let i = 0; i < ContractHotels.length; i++) {
            let temp = []
            for (let j = 0; j < 7; j++) {
                if (j !== 1 && j !== 6) {
                    //ContractHotels[i][j] = ethers.utils.formatEther(ContractHotels[i][j]);
                    //console.log("sdfgh   ", ContractHotels[i][j].toNumber());
                    temp.push(ContractHotels[i][j].toNumber())
                } else {
                    temp.push(ContractHotels[i][j]);
                }
            }
            ContractHotels2.push(temp);
        }
        console.log("CH updated is : ", ContractHotels2);
        setHotels(ContractHotels2);

    }

    const bookHotel = async (hotel) => {
        console.log("hoteld id is ", hotel);
        let id = `${hotel[1]}`;
        console.log(id);
        let noOfRooms = document.getElementById(`${hotel[1]}`).value;
        console.log(noOfRooms);
        let amount = noOfRooms * hotel[5];
        amount = String(amount);
        console.log("amount is : ", amount);
        const bh = await contract.bookHotel(hotel[0], noOfRooms, { value: ethers.utils.parseEther(amount) });
        console.log("bh is : ", bh);
        //const hdata = await contract.hotels();
        // console.log("hotels is : ", hdata);

    }

    const checkoutHotel = async () => {
        let hotelId = document.getElementById("hotelID").value;
        console.log(hotelId);
        let ch = await contract.checkout(hotelId);
        console.log(ch);
        setHotels([]);
        getHotels();

    }


    useEffect(() => {
        getHotels();
    }, [])
    return (
        <>
            {
                account !== "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" ? (
                    <>
                        <button onClick={() => { getHotels() }}>getHotel</button>
                        <div className="row row-cols-1 row-cols-md-3 g-4 m-5" >
                            {

                                hotels && hotels.map((hotel, index) => (

                                    <div className="col" key={hotel[0]}>
                                        {/* {console.log("hotellll : ", hotel)} */}
                                        {newHotel.push(hotel)}
                                        <div className="card">
                                            <img src="https://securecdn.pymnts.com/wp-content/uploads/2016/05/Hotel-Room-Secondary-Market.jpg" className="card-img-top" alt="..." />

                                            <div className="card-header">
                                                Name : {hotel[1]}
                                            </div>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">Vacant Rooms : {hotel[4]}</li>
                                                <li className="list-group-item">Price : {hotel[5]} ETH</li>
                                                {
                                                    hotel[6] ? <li className="list-group-item">AC : Yes</li> : <li className="list-group-item">AC : No</li>
                                                }
                                                <div className="input-group">
                                                    <span className="input-group-text">Enter Number of rooms to book </span>
                                                    <input type="number" aria-label="First name" id={hotel[1]} className="form-control" />
                                                </div>
                                                <button type="button" className="btn btn-primary" onClick={() => { bookHotel(hotel) }}>
                                                    BookNow
                                                </button>
                                            </ul>

                                        </div>
                                    </div>

                                ))}
                        </div>
                    </>) : (<>
                        <div className="row row-cols-1 row-cols-md-3 g-4 m-5" >
                            {

                                hotels && hotels.map((hotel, index) => (

                                    <div className="col" key={hotel[0]}>
                                        {/* {console.log("hotellll : ", hotel)} */}
                                        {newHotel.push(hotel)}
                                        <div className="card">
                                            <img src="https://securecdn.pymnts.com/wp-content/uploads/2016/05/Hotel-Room-Secondary-Market.jpg" className="card-img-top" alt="..." />

                                            <div className="card-header">
                                                Name : {hotel[1]}
                                            </div>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">Vacant Rooms : {hotel[4]}</li>
                                                <li className="list-group-item">Price : {hotel[5]} ETH</li>
                                                {
                                                    hotel[6] ? <li className="list-group-item">AC : Yes</li> : <li className="list-group-item">AC : No</li>
                                                }
                                                <div className="input-group">
                                                    <span className="input-group-text">Enter Number of rooms to book </span>
                                                    <input type="number" aria-label="First name" id={hotel[1]} className="form-control" />
                                                </div>
                                                <button type="button" className="btn btn-primary" onClick={() => { bookHotel(hotel) }}>
                                                    BookNow
                                                </button>
                                            </ul>

                                        </div>
                                    </div>

                                ))}
                        </div>
                        {/* <form >
                            <label >Name</label><br />
                            <input type="text" name="name" id="name" /><br />
                            <label >No Of Rooms</label><br />
                            <input type="number" name="noOfRooms" id="noOfRooms" /><br />
                            <label >Price</label><br />
                            <input type="number" name="price" id="price" /><br />
                            <br />
                            <input type="radio" id="Ac" name="isAc" value="true" />
                            <label >isAc</label><br />
                            <input type="radio" id="nonAc" name="isAc" value="false" />
                            <label >nonAc</label><br />
                        </form> */}

                        <div className="m-5">
                            <form >
                                <div className="row mb-3 ">
                                    <label className="col-sm-2 col-form-label">HotelName</label>
                                    <div className="col-sm-3">
                                        <input type="text" className="form-control" id="name" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label">NoOfRooms</label>
                                    <div className="col-sm-3">
                                        <input type="number" className="form-control" id="noOfRooms" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label">Price</label>
                                    <div className="col-sm-3">
                                        <input type="number" className="form-control" id="price" />
                                    </div>
                                </div>
                                <fieldset className="row mb-3">
                                    <legend className="col-form-label col-sm-2 pt-0">Type  </legend>
                                    <div className="col-sm-10">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" id="Ac" name="isAc" value="true" />
                                            <label className="form-check-label" for="gridRadios1">
                                                IsAc
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" id="nonAc" name="isAc" value="false" />
                                            <label className="form-check-label" for="gridRadios1">
                                                NonAc
                                            </label>
                                        </div>
                                    </div>

                                </fieldset>
                                <button className="btn btn-primary " onClick={() => { addHotel() }}>AddHotel</button>
                            </form>
                        </div>


                        {/* <button onClick={() => { addHotel() }}>AddHotel</button> */}
                        <div className='d-flex align-items-center justify-content-center'>
                        <button className="btn btn-primary m-5" onClick={() => { getHotels() }}>getHotel</button>
                        <button className="btn btn-primary" onClick={() => { bookHotel() }}>bookHotel</button>
                        </div>

                        {/* <p >Hotel Id to checkout</p>
                        <input type="number" name="hotelID" id="hotelID" /><br />
                        <button onClick={() => { checkoutHotel() }}>checkout</button> */}

                    </>)
            }
        </>

    )
}

export default AddHotel