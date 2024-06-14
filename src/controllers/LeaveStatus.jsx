import React, { useEffect, useState, useContext } from "react";
import axios from "../utils/api";
import { AuthContext } from "../contexts/AuthContext";
import {
  useBreakpointValue,
  Box,
  List,
  ListItem,
  Text,
  Heading,
  Badge,
  VStack,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";
import LeaveStepper from "../components/LeaveStepper";

const TrackLeaveStatus = () => {
  const { user } = useContext(AuthContext);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get(
          `/students/track-leave-status/${user._id}`
        );
        setLeaveRequests(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching leave requests", err);
      }
    };
    fetchLeaveRequests();
  }, [user]);

  const getApprover = (leave) => {
    if (leave.status === "rejected") {
      return ``;
    } else {
      switch (leave.current_stage) {
        case "class_coordinator":
          return "Warden";
        case "principal":
          return "Class Coordinator";
        case "approved":
          return "Principal";
        default:
          return "Pending";
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <FaCheckCircle className="text-xl" color="green" />;
      case "rejected":
        return <FaTimesCircle className="text-xl" color="red" />;
      default:
        return <FaClock className="text-xl" color="yellow" />;
    }
  };

  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <div
      className="bg-cover fitScreen"
      style={{ backgroundImage: `url('/Frame 1.svg')` }}
    >
      <div className="mx-auto px-5 md:w-2/3 pt-10">
        <Box textAlign="center" p={5} mx={"auto"} w="full">
          {loading ? (
            <div className="py-10">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.600"
                size="xl"
              />
            </div>
          ) : (
            <>
              {leaveRequests.length === 0 ? (
                <div className="pt-60">
                  <Badge
                    color={"red.600"}
                    fontSize={{ base: "12px", md: "16px" }}
                    mb="300px"
                  >
                    ! You haven't applied for any leave.
                  </Badge>
                </div>
              ) : (
                <List spacing={5}>
                  {leaveRequests.map((leave) => {
                    let formattedDate = "Invalid date";
                    if (leave.updatedAt) {
                      try {
                        const date = parseISO(leave.updatedAt);
                        formattedDate = format(date, "dd/MM/yy hh:mm a");
                      } catch (error) {
                        console.error("Error parsing date:", error);
                      }
                    }
                    const approver = getApprover(leave);
                    const statusIcon = getStatusIcon(leave.status);

                    return (
                      <ListItem
                        key={leave._id}
                        border="1px solid #111827"
                        borderRadius="lg"
                        p={5}
                        bg="gray.800"
                        maxW=""
                        mx="auto"
                        color="white"
                        mb={5}
                        transition="all 0.3s ease"
                        _hover={{
                          transform: "scale(1.02)",
                          boxShadow: "lg",
                        }}
                      >
                        {isSmallScreen ? (
                          <VStack justifyContent="space-between" mb={3}>
                            <Heading as="h3" size="lg">
                              {leave.reason}
                            </Heading>
                            <VStack>
                              {leave.status === "rejected" ? (
                                <>
                                  <Badge colorScheme="red" mb={2}>
                                    Rejected
                                  </Badge>
                                  <Text fontSize="lg" fontWeight={700}>
                                    {approver}
                                  </Text>
                                </>
                              ) : leave.status !== "pending" && (
                                <>
                                  <Badge colorScheme="purple" mb={2}>
                                    Approved By
                                  </Badge>
                                  <Text fontSize="lg" fontWeight={700}>
                                    {approver}
                                  </Text>
                                </>
                              )}
                              {statusIcon}
                            </VStack>
                          </VStack>
                        ) : (
                          <HStack justifyContent="space-between" mb={3}>
                            <Heading as="h3" size="lg">
                              {leave.reason}
                            </Heading>
                            <HStack>
                              {leave.status === "rejected" ? (
                                <>
                                  <Badge colorScheme="red" mr={2}>
                                    Rejected
                                  </Badge>
                                  <Text fontSize="lg" fontWeight={700}>
                                    {approver}
                                  </Text>
                                </>
                              ) : leave.status !== "pending" && (
                                <>
                                  <Badge colorScheme="purple" mr={2}>
                                    Approved By
                                  </Badge>
                                  <Text fontSize="lg" fontWeight={700}>
                                    {approver}
                                  </Text>
                                </>
                              )}
                              {statusIcon}
                            </HStack>
                          </HStack>
                        )}
                        <VStack align="start" spacing={2}>
                          <Text fontSize="md">
                            <Badge colorScheme="red" mr={2}>
                              {user.name}
                            </Badge>
                          </Text>
                          <Text fontSize="md">
                            <Badge colorScheme="blue" mr={2}>
                              {user.enrollmentNo}
                            </Badge>
                          </Text>
                          <Text fontSize="md">
                            <Badge colorScheme="blue" mr={2}>
                              Leave Duration
                            </Badge>
                            <Badge colorScheme="none" mr={2} fontSize="sm">
                              {format(
                                new Date(leave.start_date),
                                "dd/MM/yyyy"
                              )}{" "}
                              To{" "}
                              {format(
                                new Date(leave.end_date),
                                "dd/MM/yyyy"
                              )}
                            </Badge>
                          </Text>
                          <Text fontSize="md">
                            <Badge colorScheme="gray" mr={2}>
                              Last Updated
                            </Badge>
                            <Badge colorScheme="gray" mr={2}>
                              {formattedDate.split(" ")[0]}{" "}
                            </Badge>
                            <Badge as="span" color="green">
                              {formattedDate.split(" ")[1] +
                                " " +
                                formattedDate.split(" ")[2]}
                            </Badge>
                          </Text>
                          <Text fontSize="md">
                            <Badge colorScheme="purple" mr={2}>
                              Parent's Contact
                            </Badge>
                            <Badge colorScheme="orange" mr={2}>
                              {leave.parent_mobile}
                            </Badge>
                          </Text>
                          <Text fontSize="md">
                            <Badge colorScheme="pink" mr={2}>
                              Address
                            </Badge>
                            <Badge colorScheme="gray" mr={2}>
                              {user.address}
                            </Badge>
                          </Text>
                        </VStack>
                        <Box mt={5}>
                          {/* Assuming LeaveStepper is another component */}
                          <LeaveStepper currentStage={leave.current_stage} />
                        </Box>
                      </ListItem>
                    );
                  })}
                </List>
              )}
            </>
          )}
        </Box>
      </div>
    </div>
  );
};

export default TrackLeaveStatus;
