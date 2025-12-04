import { Button, IconButton } from '@mui/material'
import React from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from 'react-redux';
import { removeCartItem, updateCart } from '../../../redux/cart/cartSlice';

const CartItem = ({item}) => {
    console.log("ITEM: ", item);

    const dispatch = useDispatch();

    const handleUpdateCartItem = async (num)=>{

        const updateQuantity = item.quantity+num;
        if(updateQuantity<1) return

        const data={ cartItemId:item?._id, quantity:updateQuantity};
        try {
            await dispatch(updateCart(data)).unwrap();
        } catch (error) {
            console.log(error.message||"Failure in dispatching the update btn")
        }
    }
    const handleRemoveItem = async ()=>{
        try {
            await dispatch(removeCartItem({ cartItemId: item._id })).unwrap();
            
        } catch (error) {
            console.log(error.message||"failure in removing cartItem");
        }
    }
    return (
    <div className='pb-20 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg ' >
        <div className='flex items-center mt-2 ml-6'>
            <div className='shadow-lg h-[8rem] w-[8rem] lg:h-[10rem] lg:w-[10rem] ml-5 '>
                <img className='w-full rounded-2xl mt-2 h-full object-cover object-top' src={item?.product?.imageUrl} alt="" />
            </div>

            <div className='m-5 pt-1.5 '>

                <p className='font-semibold'>{item?.product?.description} </p>
                <p className='opacity-60'>Size: {item?.size}, Color: {item?.product?.color}</p>
                <p className='opacity-60'>Seller: {item?.product?.brand}</p>
                <div className='flex items-center space-x-3 pt-3'>
                    <p className='font-semibold'>₹ {item?.product?.discountedPrice}</p>
                    <p className='line-through'>₹1599</p>
                    <p className='text-green-600 font-semibold'>{item?.product?.discountedPercent}%</p>
                </div>
            </div>

        </div>
            <div className=' pl-5 lg:flex items-center lg:space-x-10 pt-1'>
                <div className='flex items-center space-x-2 ml-6'>
                    <IconButton onClick={()=>handleUpdateCartItem(-1)} disabled={item?.quantity<=1} sx={{color:"#9155fd","&:hover":{bgcolor:'#E5E4E2', opacity:2}}}>
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                    <span className='px-4 font-semibold'>{item?.quantity}</span>
                    <IconButton onClick={()=>handleUpdateCartItem(+1)} sx={{color:'#9155fd',"&:hover":{bgcolor:'#E5E4E2', opacity:2}}}> 
                        <AddCircleOutlineIcon/>
                    </IconButton>
                </div>
                    <Button onClick={()=>handleRemoveItem()} className="flex items-center " sx={{ bgcolor:"#9155fd",width:"10rem",color:"white","&:hover":{bgcolor:"primary.dark",boxShadow:8}}}>
                        Remove
                    </Button>
            </div>
    </div>
  )
}

export default CartItem