import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "../utils/api";
import {
  Box,
  Button,
  Flex,
  Heading,
  List,
  ListItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
  Icon,
  Avatar,
} from "@chakra-ui/react";
import { CheckCircleIcon, CloseIcon, InfoIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";

const LeaveRequests = () => {
  const { getAvatar } = useContext(AuthContext);
  const [students, setStudents] = useState({});
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Fetch leave requests on component mount
  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get(`/warden/leave-requests`);
      setLeaveRequests(response.data);
      console.log("Fetched leave requests successfully:", response.data);
    } catch (error) {
      console.log("Error fetching leave requests:", error);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  // Fetch student details when leave requests are available
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentIds = [...new Set(leaveRequests.map(req => req.student_id))];
        const studentResponses = await Promise.all(studentIds.map(id => axios.get(`/students/profile/${id}`)));
        const studentData = studentResponses.reduce((acc, res) => {
          acc[res.data._id] = res.data;
          return acc;
        }, {});
        setStudents(studentData);
        console.log("Fetched all student data successfully:", studentData);
      } catch (error) {
        console.log("Error fetching student data:", error);
      }
    };

    if (leaveRequests.length) {
      fetchStudents();
    }
  }, [leaveRequests]);

  // Handle click on leave request to open modal with details
  const handleRequestClick = (requestId) => {
    setSelectedRequestId(requestId);
    onOpen();
  };

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedRequestId(null);
    onClose();
  };

  // Handle status change for leave request
  const handleStatusChange = async (status) => {
    if (!selectedRequestId) return;
    try {
      const response = await axios.post(
        `/warden/leave-requests/${selectedRequestId}`,
        { status }
      );
      fetchLeaveRequests();
      if(status === 'approved'){
        toast.success("Leave Approved")
      }
      else{
        toast.info("Leave Rejected")
      }
      setLeaveRequests((prev) =>
        prev.map((req) =>
          req._id === selectedRequestId ? { ...req, status } : req
        )
      );
      handleCloseModal();
    } catch (error) {
      console.log("Error updating leave request status:", error.response ? error.response.data : error.message);
    }
  };

  const selectedRequest = leaveRequests.find(req => req._id === selectedRequestId);
  const selectedStudent = selectedRequest ? students[selectedRequest.student_id] : null;

  return (
    <Box p={4} bg="gray.800" minH="100vh" color="white">
      <Heading as="h2" size="xl" mb={4}>Leave Requests ({leaveRequests.length})</Heading>
      <List spacing={4}>
        {leaveRequests.map((request) => (
          <ListItem
            key={request._id}
            p={4}
            bg="gray.700"
            shadow="md"
            rounded="lg"
            cursor="pointer"
            _hover={{ bg: "gray.600" }}
            onClick={() => handleRequestClick(request._id)}
          >
            {students[request.student_id] && (
              <>
                <Text>Name: {students[request.student_id].name}</Text>
                <Text>Hostel Room: {students[request.student_id].roomNo}</Text>
                <Text>Branch: {students[request.student_id].branch}</Text>
                <Text>Semester: {students[request.student_id].semester}</Text>
              </>
            )}
            <Text>Reason: {request.reason}</Text>
          </ListItem>
        ))}
      </List>

      {selectedRequest && selectedStudent && (
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent bg="gray.700" color="white">
            <ModalHeader>Student Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <img src={getAvatar(selectedStudent)} className="max-h-40 mx-auto rounded-full"/>
              <Text mb={2}><strong>Name:</strong> {selectedStudent.name}</Text>
              <Text mb={2}><strong>Branch:</strong> {selectedStudent.branch}</Text>
              <Text mb={2}><strong>Reason for Leave:</strong> {selectedRequest.reason}</Text>
              <Text mb={2}><strong>Start Date:</strong> {new Date(selectedRequest.start_date).toLocaleDateString()}</Text>
              <Text mb={2}><strong>End Date:</strong> {new Date(selectedRequest.end_date).toLocaleDateString()}</Text>
              <Text mb={2}><strong>Parent's Mobile:</strong> {selectedRequest.parent_mobile}</Text>
            </ModalBody>
            <ModalFooter>
              <Button
                leftIcon={<CheckCircleIcon />}
                onClick={() => handleStatusChange("approved")}
                colorScheme="green"
                mr={3}
              >
                Approve
              </Button>
              <Button
                leftIcon={<CloseIcon />}
                onClick={() => handleStatusChange("rejected")}
                colorScheme="red"
                mr={3}
              >
                Reject
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default LeaveRequests;
