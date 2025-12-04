import { Avatar, Box, Grid, Rating } from '@mui/material'
import React from 'react'

const ProductReviewCard = () => {
  return (
    <div>
        <Grid container padding={"2rem"} spacing={2} gap={3}>
            <Grid item xs={12}>
                <Box >
                    <Avatar sx={{height:35, width:35, bgcolor:"#9155fd"}}>R</Avatar>
                </Box>
            </Grid>
            <Grid item>
                <div className='text-gray-900 text-lg' >
                    
                    <p >Xyz</p>
                    <p className='text-gray-400'>August 11, 2025</p>
                </div>
                <Rating value={3.5} name="half-rating" readOnly></Rating>
                <div>
                    <p className=''>Nice product.</p>
                </div>
            </Grid>
                
        </Grid>

    </div>
  )
}

export default ProductReviewCard