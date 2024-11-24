export default function YesNO({num,color,child}){
    console.log(num)
    console.log(color)
    console.log(child)
      return(
  
      <div>
           <div className="yn" style={{'--num': num, '--color': color}}><span>{child}</span></div>  
          </div>
      );
  }