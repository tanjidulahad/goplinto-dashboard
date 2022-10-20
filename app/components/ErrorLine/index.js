import React from "react";
const ErrorLine=({value,type})=>{
    return type&&<p className="font-semibold text-secondary">{value}</p>
}

export default ErrorLine;