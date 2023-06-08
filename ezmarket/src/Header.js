import React from 'react'

function Header() {
  return (
    <div className='header'>
      
      <img
        className='header__logo' 
        src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'/>       
      <div 
      className="header__search">
        <input type="text" className="header__searchInput" />
        {/*logo*/}
      </div>
      <div className="header__nav">
        
      </div>
    </div>
  )
}

export default Header
