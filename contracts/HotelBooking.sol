// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/* Todos :

1 : Add payment in BookHotel func - done
2 : Add checkout func - done
3 : Add from and to in BookHotel func

*/

contract HotelBooking{
    address payable public  Admin;
    hotel[] public hotels;
    uint id = 0;
    mapping (address => mapping(uint => uint) ) public perHotel;//mapping address of booking person with the mapping of hotelID and noOFRoomsBooked

    constructor (){
        Admin = payable(msg.sender);
    }

    struct hotel {
        uint id;
        string name;
        uint noOfRooms;
        uint occupiedRooms;
        uint vacantRooms;
        uint price;
        bool isAc;
    }

    function addHotel(string memory _name,uint _noOfRooms,uint _price,bool _isAc) public {
        require(msg.sender == Admin,"Only Admin can add hotels");
        hotel memory h = hotel(id,_name,_noOfRooms,0,_noOfRooms,_price,_isAc);
        hotels.push(h);
        id++;
    }

    function getHotels() public view returns(hotel[] memory){
        return hotels;
    }

    function bookHotel(uint _hotelId,uint _noOfRoomsToBook) payable public {
        require(hotels[_hotelId].vacantRooms>=_noOfRoomsToBook,"Not enough rooms available to book");
        require(msg.value == (hotels[_hotelId].price * _noOfRoomsToBook) * 1 ether,"not enough ethers provided");
        Admin.transfer(msg.value);
        hotels[_hotelId].occupiedRooms += _noOfRoomsToBook;
        perHotel[msg.sender][_hotelId] += _noOfRoomsToBook;
        hotels[_hotelId].vacantRooms = hotels[_hotelId].noOfRooms - hotels[_hotelId].occupiedRooms;
    }

    function checkout(uint _hotelId) public  {
        // do here
        uint noOfRoomsToChechout = perHotel[msg.sender][_hotelId];
        hotels[_hotelId].occupiedRooms -= noOfRoomsToChechout;
        perHotel[msg.sender][_hotelId] -= noOfRoomsToChechout;
        hotels[_hotelId].vacantRooms = hotels[_hotelId].noOfRooms - hotels[_hotelId].occupiedRooms;
    }


}