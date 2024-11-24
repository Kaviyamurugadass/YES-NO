export default function YesNO({ num, color, child }) {
    return (
        <div className="absolute w-1/2 h-1/2 cursor-pointer select-none"
            style={{
                backgroundColor: color,
                transformOrigin: 'bottom right',
                transform: `rotate(calc(60deg * ${num}))`,
                clipPath: 'polygon(0 0, 75% 0, 100% 100%, 0 70%)'
            }}>
            <span className="absolute top-1/4 left-1/4 text-white text-2xl font-bold transform -rotate-[30deg]">
                {child}
            </span>
        </div>
    );
}