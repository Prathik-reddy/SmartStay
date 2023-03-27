import React from 'react'
const Navbar = ({ account,load }) => {

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark text-light ">
        <div className="d-flex justify-content-around align-items-center w-100">
          <div className="">
            <h5 className='text-primary'>Account : {account ? (
              <span >
                {account.slice(0, 5) + "..." + account.slice(-5, -1)}
              </span>
            ) : (
              <span>Not connected</span>
            )}</h5>
          </div>
          <div>
            <h1>HotelBooking</h1>
          </div>
          <div>
            <h4>{account ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
              </>
            ) : (
              <button className="btn btn-primary"onClick ={()=>{load()}}>Connect your Wallet</button>
            )}

            </h4>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar