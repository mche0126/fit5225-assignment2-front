import React from 'react';
import { Redirect } from 'react-router-dom';

export default function LoginSuccess() {
  let tokenHash = window.location.href;
  console.log(window.location.href);
  let tokenSplit = tokenHash.split('&access_token=');
  let token = tokenSplit[0].replace('#id_token=', '');
  console.log(token);
  localStorage.setItem('token', token);
  return (
    <div>
      <Redirect to="/welcome" />
    </div>
  );
}
