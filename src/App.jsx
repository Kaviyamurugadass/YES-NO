import click from './script.js';
import {ARRAY_OBJ} from './script.js';
import MyHeader from './components/MyHeader.jsx';
import YesNO  from './components/YesNO.jsx';

export default function App() {
  return (
    <div className = 'container'>
     <MyHeader />
<div className="w3-display-middle">
    
<div className="container">
    <div className="spinBtn" onClick={click}>Spin!</div>
    <div className="wheel">
      {ARRAY_OBJ.map((obj)=>(<YesNO key={obj.num}{...obj}></YesNO>))};
     </div>
    </div>
</div>
</div>
  );
}