import React, { FC, useEffect } from 'react';
import styles from './app.module.scss';

const App: FC = () => {
  useEffect(() => {
    console.log(`vite-react-cil`);
  }, []);

  return (
    <div className={styles.App}>
      <h2>Welcome to vite-react-cil</h2>
    </div>
  );
};

export default App;
