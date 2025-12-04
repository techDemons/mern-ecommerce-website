import { Alert, AlertTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../../redux/order/orderSlice';
import { updatePayment } from '../../../redux/payment/paymentSlice';
import OrderDetails from '../OrderStatus/OrderDetails';

const PaymentSuccess = () => {
    const [paymentId, setPaymentId] = useState();
    const [paymentStatus, setPaymentStatus] = useState();
    const {orderId} = useParams();
    console.log("ksjksk: ",orderId);

    const dispatch = useDispatch();
    
    
    useEffect(()=>{
        const urlParam =new URLSearchParams(window.location.search);
        setPaymentId(urlParam.get("razorpay_payment_id"));
        setPaymentStatus(urlParam.get("razorpay_payment_link_status"));
        
    },[]);

    useEffect(()=>{
        const data = {orderId, paymentId}
        const fetchPay = async()=>{
            if(paymentId){
                const ord = await dispatch(getOrderById(orderId)).unwrap();
                const dro = await dispatch(updatePayment(data)).unwrap();
            }
        };
        fetchPay();
    },[orderId, paymentId]);

  return (
    <div className='px-2'>
        <div className='flex flex-col justify-center items-center'>
            <Alert variant="filled" severity='success'>
                <AlertTitle>Payment success</AlertTitle>
                Congratulation your order gets placed
            </Alert>
        </div>

        {/* <OrderTracker activeStep={1}/> */}
        <OrderDetails />
    </div>
  )
}

export default PaymentSuccess