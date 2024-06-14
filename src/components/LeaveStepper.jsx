// components/LeaveStepper.js
import React from 'react';
import {
  Box,
  Step,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Flex,
  Text,
} from '@chakra-ui/react';
import { IoCheckmarkCircle, IoCheckmarkDoneCircle } from 'react-icons/io5';
import { useBreakpointValue } from '@chakra-ui/react';

const LeaveStepper = ({ currentStage }) => {
  const stages = ['warden', 'class_coordinator', 'principal', 'approved'];
  const currentIndex = stages.indexOf(currentStage);

  const { activeStep } = useSteps({
    index: currentIndex,
    count: stages.length,
  });

  const stepperOrientation = useBreakpointValue({ base: 'vertical', md: 'horizontal' });

  return (
    <Box width="100%">
      <Stepper size="lg" index={activeStep} colorScheme="blue" orientation={stepperOrientation}>
        {stages.map((stage, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={
                  currentStage === 'approved' && index === stages.length - 1
                    ? <StepCompletedIcon />
                    : <StepCompletedIcon />
                }
                incomplete={<StepIncompleteIcon />}
                active={
                  currentStage === 'approved' && index === stages.length - 1
                    ? <IoCheckmarkDoneCircle className='text-4xl text-green-600'/>
                    : <StepActiveIcon />
                }
              />
            </StepIndicator>
            <Flex justify="center" mt={2}>
              <StepTitle>
                <Text fontSize="md" fontWeight="bold" textTransform="capitalize">
                  {stage.replace('_', ' ')}
                  {stage === 'approved' && ``}
                </Text>
              </StepTitle>
            </Flex>
            {index < stages.length - 1 && <StepSeparator />}
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

const StepCompletedIcon = () => <IoCheckmarkCircle className="text-4xl text-gray-900" />;
const StepIncompleteIcon = () => <Box bg="gray.300" w={6} h={6} borderRadius="50%" />;
const StepActiveIcon = () => <Box bg="blue.500" w={6} h={6} borderRadius="50%" />;

export default LeaveStepper;
