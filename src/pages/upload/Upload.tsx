import Uploader from '@/components/Uploader';
import React, { useState } from 'react';

const Home = function () {
  const [iweblens, setIweblens] = useState();
  console.log(iweblens);

  return (
    <>
      <Uploader response={setIweblens} />
    </>
  );
};

export default Home;
