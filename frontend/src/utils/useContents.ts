import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";

export function useContent(){

    const [content, setContents]= useState([]);

    function getContents(){
        axios.get(`${BACKEND_URL}/content`,{
            headers:{
                'Authorization': localStorage.getItem('token')
            }
        }).then((response)=>{
            setContents(response.data.contents);
        })
    }

    useEffect(()=>{
        getContents();
        let interval = setInterval(()=>{
            getContents();
        }, 10 * 1000);

        clearInterval(interval);
    },[])
    
    return {content, getContents};
}