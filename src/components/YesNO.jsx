export default function YesNO({ num, color, child }) {
    return (
        <div className="absolute w-1/2 h-1/2 cursor-pointer select-none"
            style={{
                backgroundColor: color,
                transformOrigin: 'bottom right',
                transform: `rotate(calc(60deg * ${num}))`,
                clipPath: 'polygon(0 0, 75% 0, 100% 100%, 0 70%)'
            }}>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-2xl font-bold" 
                    style={{
                        position: 'absolute',
                        transform: 'translate(-50%, -50%) rotate(-30deg)'
                    }}>
                    {child}
                </span>
            </div>
        </div>
    );
}