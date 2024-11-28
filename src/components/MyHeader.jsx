export default function MyHeader(){
    return(
        <div className="absolute top-12 md:top-0 left-1/2 transform -translate-x-1/2 text-center">
            <h1 className="text-4xl md:text-6xl font-semibold py-3 md:p-4 drop-shadow-[2px_4px_2px_rgba(0,0,0,1)]">
                <span className="text-[#00ff00]">YES</span>/<span className="text-[rgb(255,64,0)]">NO</span>
            </h1>
            <p className="text-gray-700 text-sm md:text-base px-4 max-w-md mx-auto font-medium -mt-2 md:mt-0">
                If you're too confused to make a decision, let this magic wheel help you!
            </p>
        </div>
    );
}