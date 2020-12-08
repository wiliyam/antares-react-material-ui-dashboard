import React from 'react';

const Logo = (props) => {
  let url = '/static/images/logo-white.png';
  // console.log('props.logocolor -->>', props.logocolor);
  if (props.logocolor == 'black') {
    console.log('inside loop--->');
    url = '/static/images/logo-black.png';
  }
  // console.log('url--->', url);
  return (
    <img
      alt="Logo"
      src={url}
      {...props}
    />
  );
};

export default Logo;
