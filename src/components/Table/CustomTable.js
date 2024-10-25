import React, { useContext, useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { UserContext } from '../../context/UserContext';
import UpdateModel from '../UpdateModal/UpdateModel';
import { editPlayer } from '../../API/apiService';
export default function CustomTable({playerData,handleOpen,handleClose,open,setIsUpdated,isUpdated}) {
  const {userInfo}=useContext(UserContext);
  const [items,setItems]=useState(null);


  const handleSetup=(values)=>{
    setItems(values);
    handleOpen();  
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Rank</TableCell>
            <TableCell align="right">Score</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {playerData.map((row,index) => (
            <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell align="right">{row.rank}</TableCell>
              <TableCell align="right">{row.score}</TableCell>
              <TableCell align="right">
              {userInfo?.isAdmin ?(<Button key={row._id} variant='contained'size='small' onClick={()=>handleSetup(row)}>Update</Button>):
              userInfo?._id===row?._id?(
                <Button key={row._id}  variant='contained'size='small' onClick={()=>handleSetup(row)}>Update</Button>
              ):null

              
            }


              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <UpdateModel open={open} handleClose={handleClose} items={items} 
      setItems={setItems} setIsUpdated={setIsUpdated} isUpdated={isUpdated} />
    </TableContainer>
  )
}
