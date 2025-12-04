import React from 'react'
import {Box, Button, Grid, IconButton, Typography} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';


const Footer = () => {
  return (
    <div>
        <Grid container bgcolor={"brown"} color={"white"} sx={{bgcolor:"brown", color:"white",marginTop:"10px",  justifyContent:"center", alignItems:"center", paddingBottom:"120px"}}>
            <Grid item xs={12} sm={6} md={3} >


                <div>
                    <Typography variant='h6' sx={{color:"black" }} className=' pb-3 pl-5 pt-12'> Company</Typography>
                </div>
                
                <div>
                    <Button variant='h6'>About</Button>
                </div>
                <div>
                    <Button variant='h6'>Blog</Button>
                </div>
                <div>
                    <Button variant='h6'>Testimonials</Button>
                </div>
            </Grid>

            <Grid item xs={12} sm={6} md={3} pl={22}>
                <div>
                    <Typography variant='h6' sx={{color:"black" }} className='pb-3 pl-5 pt-12'> Solutions</Typography>
                </div>
                <div>
                    <Button variant='h6'>Marketing</Button>
                </div>
                <div>
                    <Button variant='h6'>Analytics</Button>
                </div>
                <div>
                    <Button variant='h6'>Supports</Button>
                </div>
                
            </Grid>

            <Grid item xs={12} sm={6} md={3} pl={22}>
                <div>
                    <Typography variant='h6' sx={{color:"black" }} className='pb-3 pl-5 pt-12'> Documentation</Typography>
                </div>
                <div>
                    <Button variant='h6'>Guides</Button>
                </div>
                <div>
                    <Button variant='h6'>Api</Button>
                </div>
                <div>
                    <Button variant='h6'>Help & support</Button>
                </div>
                

            </Grid>

            <Grid item xs={12} sm={6} md={3} pl={22}>
                <div>
                    <Typography variant='h6'sx={{color:"black" }} className='pb-3 pl-5 pt-12'> Legal</Typography>
                </div>
                <div>
                    <Button variant='h6'>Claim </Button>
                </div>
                <div>
                    <Button variant='h6'>Privacy</Button>
                </div>
                <div>
                    <Button variant='h6'>Terms</Button>
                </div>

                
            </Grid>
           
                            
        </Grid>

       
    </div>
  )
}

export default Footer