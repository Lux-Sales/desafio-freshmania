import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

export const Header:React.FC = () =>{
return(
    <AppBar position="static">
      <Toolbar>
        <ShoppingBagIcon /> 
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          DevMarket
        </Typography>
      </Toolbar>
    </AppBar>
)
}

export default Header