import axios from "axios"
import React, { useState , useEffect, Fragment}  from "react"
import LoadingSpinner from "../component/LoadingSpinner";
import KitabComp from '../component/KitabComp';
// import Menu from "../component/Navbar";
const KitabList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data,setData] = useState([])
    
   
    const getApi = () => {
        setIsLoading(true)
        axios.get('http://localhost:3001/kitab')
        .then((response) => {
            // handle success
            console.log(response.data)
            setData(response.data.data)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getApi()
    },[])

    return(
        <Fragment>       
            <h1 className="header-kitab-list">Daftar Kitab</h1>
            { isLoading ? <LoadingSpinner /> : '' }
                {    
                    data.map((item,i) => { 
                        return (       
                            <KitabComp key={i} kitab={item.name} hadits={item.jumlah} no={i+1} />
                        )
                    })
                }      
        </Fragment>
    )
}

export default KitabList;