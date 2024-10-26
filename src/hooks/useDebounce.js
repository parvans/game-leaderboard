import React, { useEffect, useState } from 'react'

export default function useDebounce(value,delay=500) {
    const [debouncedValue,setDebouncedValue]=useState(value);
    console.log(value);
    
    useEffect(()=>{
        const id=setTimeout(()=>{
            console.log("setting new timeout");
            setDebouncedValue(value);
        },delay);

        return()=>{
            console.log("clearing the timeout");
            clearTimeout(id)
        }
    },[value,delay])

  return debouncedValue;

}
