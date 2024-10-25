import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import React from 'react'
import { editPlayer } from '../../API/apiService';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
  px: 4,
  pb: 3,
  display:'flex',
  flexDirection:"column",
  gap:3
  };

export default function UpdateModel({open,handleClose,items,setItems,setIsUpdated,isUpdated}) {
    
    const handlePlayerUpdate=async()=>{

        try {
          const res=await editPlayer({score:items?.score},items?._id);
          if(res?.ok){
            console.log(res?.data?.data);
            setIsUpdated(!isUpdated);
            handleClose();
          }
        } catch (error) {
          console.log(error);
        }
      }
    
  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
  <Box sx={{...style,width:200}} >
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Update Score
    </Typography>
    <TextField type='number' value={items?.score} onChange={(e)=>setItems({...items,score:Number(e.target.value)})} />
        <Button variant='contained' onClick={handlePlayerUpdate}>Submit</Button>
  </Box>
</Modal>
  )
}
