import click from './script.js';
import {ARRAY_OBJ} from './script.js';
import MyHeader from './components/MyHeader.jsx';
import YesNO from './components/YesNO.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center">
      <MyHeader />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] flex justify-center items-center mt-24 md:mt-36">
          <button 
            onClick={click}
            className="absolute z-10 w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full bg-gray-100 border-4 border-gray-200 flex justify-center items-center font-semibold uppercase tracking-wider cursor-pointer select-none text-sm md:text-base before:content-[''] before:absolute before:-top-8 before:w-6 before:h-10 before:bg-gray-100 before:border-[3px] before:border-gray-200 before:[clip-path:polygon(50%_0%,20%_100%,80%_100%)]"
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