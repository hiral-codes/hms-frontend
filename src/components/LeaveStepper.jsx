// components/LeaveStepper.js
import React from 'react';
import { Box, Step, StepIndicator, StepSeparator, StepStatus, StepTitle, Stepper, useSteps } from '@chakra-ui/react';
import { FaCircleCheck } from 'react-icons/fa6';

const LeaveStepper = ({ currentStage }) => {
  const stages = ['warden', 'class_coordinator', 'principal'];
  const currentIndex = stages.indexOf(currentStage);

  const { activeStep } = useSteps({
    index: currentIndex,
    count: stages.length,
  });

  return (
    <Box width="100%">
      <Stepper size="lg" index={activeStep}>
        {stages.map((stage, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus complete={<StepCompletedIcon />} incomplete={<StepIncompleteIcon />} active={<StepActiveIcon />} />
            </StepIndicator>
            <StepTitle><span className='capitalize'>{stage.replace('_', ' ')}</span></StepTitle>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

const StepCompletedIcon = () => <FaCircleCheck className='text-3xl'/>;
const StepIncompleteIcon = () => <Box bg="gray.300" w={4} h={4} borderRadius="50%" />;
const StepActiveIcon = () => <Box bg="blue.500" w={4} h={4} borderRadius="50%" />;

export default LeaveStepper;
