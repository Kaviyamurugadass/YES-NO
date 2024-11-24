export default function MyHeader(){
    return(
        <>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 hidden sm:block">
                <h1 className="text-6xl font-semibold p-4 drop-shadow-[2px_4px_2px_rgba(0,0,0,1)]">
                    <span className="text-[#00ff00]">YES</span>/<span className="text-[#de1212]">NO</span>
                </h1>
            </div>
            {/* <span style={{fontWeight:500,fontSize:15,marginLeft:2}}>
"Are you feeling too confused to make a decision? Let's spin the wheel and let it make the decision for you."</span> */}
        </>);
}