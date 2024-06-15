import React from "react";
import { Box, Button, Flex, ListItem, Text, Avatar, Badge } from "@chakra-ui/react";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";

const LeaveRequestItem = ({ request, student, onApprove, onReject, getAvatar }) => {
  return (
    <ListItem
      p={4}
      bg="gray.700"
      shadow="md"
      rounded="lg"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexDirection={{ base: "column", md: "row" }}
    >
      <Flex
        alignItems="center"
        flexDirection={{ base: "column", md: "row" }}
        flex="1"
      >
        <Avatar
          size="lg"
          src={getAvatar(student)}
          mr={{ base: 0, md: 4 }}
          mb={{ base: 4, md: 0 }}
        />
        <Box mb={{ base: 4, md: 0 }} textAlign={{ base: "center", md: "left" }}>
          <Text fontWeight="bold" fontSize="lg">
            {student.name}
          </Text>
          <Badge fontWeight="bold" colorScheme="yellow" mr={2}>
            {student.enrollmentNo}
          </Badge>
          <Badge fontWeight="bold" colorScheme="purple">
            {student.branch}
          </Badge>
          <Text>
            Semester: {student.semester}
          </Text>
          <Text>Room No: {student.roomNo}</Text>
          <Text>Mobile No: {student.mobileNo}</Text>
        </Box>
      </Flex>
      <Box flex="1" textAlign={{ base: "center", md: "left" }}>
        <Text fontWeight="bold" fontSize="lg" mb={2}>
          {request.reason}
        </Text>
        <Text>Address: {student.address}</Text>
        <Text>Parent's Mobile: {request.parent_mobile}</Text>
        <Badge colorScheme="blue" mb={2} display="block">
          Leave Type: {request.leave_type}
        </Badge>
        <Text>
          Start Date: {new Date(request.start_date).toLocaleDateString()} | End Date: {new Date(request.end_date).toLocaleDateString()}
        </Text>
        <Text>Status: {request.status}</Text>
      </Box>
      <Flex mt={{ base: 4, md: 0 }}>
        <Button
          leftIcon={<CheckCircleIcon />}
          onClick={() => onApprove(request._id)}
          colorScheme="green"
          mr={2}
        >
          Approve
        </Button>
        <Button
          leftIcon={<CloseIcon />}
          onClick={() => onReject(request._id)}
          colorScheme="red"
        >
          Reject
        </Button>
      </Flex>
    </ListItem>
  );
};

export default LeaveRequestItem;
