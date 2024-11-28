export default function YesNO({ num, color, child }) {
    // Calculate rotation based on segment number
    const rotation = (num - 1) * 60;  // Each segment is 60 degrees
    
    return (
        <div className="absolute w-1/2 h-1/2 cursor-pointer select-none"
            style={{
                backgroundColor: color,
                transformOrigin: 'bottom right',
                transform: `rotate(${rotation}deg)`,
                clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0 75%)',
                border: '1px solid rgba(255,255,255,0.1)'
            }}>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-2xl font-bold" 
                    style={{
                        position: 'absolute',
                        left: '25%',
                        top: '35%',
                        transform: 'rotate(-30deg)',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                    }}>
                    {child}
                </span>
            </div>
        </div>
    );
}