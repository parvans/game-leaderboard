import Search from '@mui/icons-material/Search';
import Cancel from '@mui/icons-material/Cancel';
import './styles.css';
import { Backdrop, CircularProgress, InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { getPlayers } from '../API/apiService';
import CustomTable from '../components/Table/CustomTable';
import nodata from '../assets/images/nodata.jpg';
export default function IndexPage() {
  const [search,setSearch]=useState('');
  const [players,setPlayers]=useState([]);
  const [loading,setLoading]=useState(false);

  
  const handleSearch=async(value)=>{
    try {
      setLoading(true);
      const res= await getPlayers(search);
      if(res?.ok){
        console.log(res?.data?.data);
        setPlayers(res?.data?.data)
        setTimeout(()=>{

          setLoading(false)
        },5000)
        // setPlayers()
        
      }
      setLoading(false)

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(()=>{
    // const timer=setTimeout(()=>{
    // },4000);
    handleSearch(search);

    // return ()=>clearTimeout(timer);
  },[search])

  return (
   <div className="leaderboard">
    <TextField  placeholder='Search Player' id="input-with-icon-textfield"
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
    slotProps={{
      input: {
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
        endAdornment:(
          <InputAdornment position="end" onClick={()=>setSearch('')} style={{cursor:"pointer"}}>
            {search && <Cancel/>}
          </InputAdornment>
        )
      },
    }}
    />

    {
      players.length!==0 ?(
        <CustomTable playerData={players}/>
      ):loading?(
        <Backdrop
          sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
          open={loading}
          // onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ):(
        <img src={nodata} alt="nodataImg" width={"100%"} height={"514px"}/>
      )
    }
     
   </div>
  )
}
