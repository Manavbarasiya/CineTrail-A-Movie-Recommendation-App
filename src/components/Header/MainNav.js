import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Updated import

const useStyles = makeStyles({
    root: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        zIndex: 100,
    },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();  // Updated to useNavigate
  
  useEffect(() => {
    if (value === 0) navigate("/");
    else if (value === 1) navigate("/movies");
    else if (value === 2) navigate("/series");
    else if (value === 3) navigate("/search");
  }, [value, navigate]);  // Updated dependency array

  return (
    <Box className={classes.root}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ backgroundColor: '#2d313a' }}  // Apply background color here
      >
        <BottomNavigationAction style={{color:"white"}} label="Trending" icon={<WhatshotIcon />} />
        <BottomNavigationAction style={{color:"white"}} label="Movies" icon={<MovieIcon />} />
        <BottomNavigationAction style={{color:"white"}} label="TV series" icon={<TvIcon />} />
        <BottomNavigationAction style={{color:"white"}} label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
    </Box>
  );
}
