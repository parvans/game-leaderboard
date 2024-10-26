import Search from '@mui/icons-material/Search';
import Cancel from '@mui/icons-material/Cancel';
import './styles.css';
import { Backdrop, CircularProgress, InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { getPlayers } from '../API/apiService';
import CustomTable from '../components/Table/CustomTable';
import nodata from '../assets/images/nodata.jpg';
import useDebounce from '../hooks/useDebounce';
export default function IndexPage() {
  const [search,setSearch]=useState('');
  const [players,setPlayers]=useState([]);
  const [loading,setLoading]=useState(false);
  const [open, setOpen] = useState(false);
  const [isUpdated,setIsUpdated]=useState(false)

  //debounce
  const debouncedSearchValue=useDebounce(search,1000)
  // console.log(debouncedSearchValue);
  


  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  
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
    handleSearch(debouncedSearchValue);
    
  },[debouncedSearchValue,isUpdated])

 

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
        <CustomTable
          setIsUpdated={setIsUpdated}
          isUpdated={isUpdated}
          playerData={players} 
          handleClose={handleClose} 
          handleOpen={handleOpen} 
          open={open}
        />
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
