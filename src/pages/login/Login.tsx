import { Result, Button } from 'antd';
import React from 'react';

export default function Login() {
  // Put AWS cognital login UI link here
  const cognitalURL =
    'https://5225prototype.auth.us-east-1.amazoncognito.com/login?client_id=5c7kmpaj3g33imdvlosujm74q1&response_type=token&scope=email+openid+profile&redirect_uri=http://localhost:3000/loginSuccess';
  return (
    <Result
      status="warning"
      title="You MUST Login Before Using the System"
      extra={
        <Button type="primary" key="console" href={cognitalURL}>
          Go login
        </Button>
      }
    />
  );
}
