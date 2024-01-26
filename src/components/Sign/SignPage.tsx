import { useState } from "react";
import Login from "./Login/Login";
import Reg from "./Registration/Reg";
import { Container } from "./Sign.styled";


const SignPage: React.FC = () => {
  const [login, setLogin] = useState('login')
  return (
    <Container>
      <div className="btn-group">
        <button className = {!login ? 'active' : ''} onClick={() => setLogin('')}>Registration</button>
        <button className={login === 'login' ? 'active' : ''}  onClick={() => setLogin('login')}>Login</button>
      </div>
      <div className="logholder">

    {
      login === 'login' ? <Login/> : <Reg/>
    }
      </div>
    </Container>
  );
};

export default SignPage;
