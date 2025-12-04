import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useLocation} from "react-router-dom";
import DeliveryAdd from './DeliveryAdd';
import OrderSummary from './OrderSummary';

const steps = ['Login', 'Delivery address', 'Order Summary',"Payment"];

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
 
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const step = params.get("step");
 

  return (
    <div>
        <Box sx={{ width: '100%', marginTop:"2rem"}}>
        <Stepper activeStep={step}>
            {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
                <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
            );
            })}
        </Stepper>
        {activeStep === steps.length ? (
            <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
            </Typography>
            
            </React.Fragment>
        ) : (
            <React.Fragment>
            <div>
                {step==2?<DeliveryAdd/>:<OrderSummary/>}
                
            </div>
            </React.Fragment>
        )}
        </Box>
    </div>
  );
}
