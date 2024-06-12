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
import { IoCheckmarkCircle } from 'react-icons/io5';

const LeaveStepper = ({ currentStage }) => {
  const stages = ['warden', 'class_coordinator', 'principal', 'approved'];
  const currentIndex = stages.indexOf(currentStage);

  const { activeStep } = useSteps({
    index: currentIndex,
    count: stages.length,
  });

  return (
    <Box width="100%">
      <Stepper size="lg" index={activeStep} colorScheme="blue">
        {stages.map((stage, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepCompletedIcon />}
                incomplete={<StepIncompleteIcon />}
                active={<StepActiveIcon />}
              />
            </StepIndicator>
            <Flex justify="center" mt={2}>
              <StepTitle>
                <Text fontSize="md" fontWeight="bold" textTransform="capitalize">
                  {stage.replace('_', ' ')}
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

const StepCompletedIcon = () => <IoCheckmarkCircle className="text-4xl text-blue-600" />;
const StepIncompleteIcon = () => <Box bg="gray.300" w={6} h={6} borderRadius="50%" />;
const StepActiveIcon = () => <Box bg="blue.500" w={6} h={6} borderRadius="50%" />;

export default LeaveStepper;
