import React from 'react';
import CaptchaForm from './components/CaptchaForm';


function App() {
  console.log('Checking this :', process.env.REACT_APP_SECRET_KEY);
  
  return (
    <div>
      <CaptchaForm/>
  
    </div>
  );
}

export default App;