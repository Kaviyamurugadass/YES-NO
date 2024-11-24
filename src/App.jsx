import click from './script.js';
import {ARRAY_OBJ} from './script.js';
import MyHeader from './components/MyHeader.jsx';
import YesNO from './components/YesNO.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center">
      <MyHeader />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-[400px] h-[400px] flex justify-center items-center mt-36">
          <button 
            onClick={click}
            className="absolute z-10 w-[60px] h-[60px] rounded-full bg-gray-100 border-4 border-gray-200 flex justify-center items-center font-semibold uppercase tracking-wider cursor-pointer select-none before:content-[''] before:absolute before:-top-7 before:w-5 before:h-8 before:bg-gray-100 before:border-[3px] before:border-gray-200 before:clip-path-triangle"
          >
            Spin!
          </button>
          <div className="wheel absolute top-0 left-0 w-full h-full bg-black rounded-full overflow-hidden shadow-wheel transition-transform duration-5000 ease-in-out">
            {ARRAY_OBJ.map((obj) => (
              <YesNO key={obj.num} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}