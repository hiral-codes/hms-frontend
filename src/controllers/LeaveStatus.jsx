import React, { useEffect, useState, useContext } from "react";
import axios from "../utils/api";
import { AuthContext } from "../contexts/AuthContext";
import LeaveStepper from "../components/LeaveStepper";
import { Box, ChakraProvider, List, ListItem, Text } from "@chakra-ui/react";
import { format } from "date-fns";

const TrackLeaveStatus = () => {
  const { user } = useContext(AuthContext);
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get(
          `/students/track-leave-status/${user._id}`
        );
        setLeaveRequests(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching leave requests");
      }
    };
    fetchLeaveRequests();
  }, [user]);

  return (
    <div className="bg-cover loaderContainer" style={{ backgroundImage: `url('/Frame 1.svg')` }}>
      <div className="w-2/3">
      <Box textAlign="center" p={5} mx={"auto"} w="full">
        <Text as="h2" fontSize="3xl" mb={5}>
          Track Leave Status
        </Text>
        <List spacing={5}>
          {leaveRequests.map((leave) => (
            <ListItem
              key={leave._id}
              border="1px solid #111827"
              borderRadius="lg"
              p={5}
              bg="black"
              maxW=""
              mx="auto"
            >
              <Text as="p" fontSize="lg" fontWeight="bold">
                {leave.reason}
              </Text>
              <Text as="p">
                {format(new Date(leave.start_date), "dd/MM/yyyy")} To{" "}
                {format(new Date(leave.end_date), "dd/MM/yyyy")}
              </Text>
              <Box mt={5}>
                <LeaveStepper currentStage={leave.current_stage} />
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
      </div>
    </div>
  );
};

export default TrackLeaveStatus;
