import React, { useEffect, useState, useContext } from "react";
import axios from "../utils/api";
import { AuthContext } from "../contexts/AuthContext";
import LeaveStepper from "../components/LeaveStepper";
import {
  Box,
  List,
  ListItem,
  Text,
  Heading,
  Badge,
  VStack,
  HStack,
  Tooltip,
  Button,
} from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaDownload,
} from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching leave requests");
      }
    };
    fetchLeaveRequests();
  }, [user]);

  const getApprover = (currentStage) => {
    switch (currentStage) {
      case "class_coordinator":
        return "Warden";
      case "principal":
        return "Class Coordinator";
      case "approved":
        return "Principal";
      default:
        return "Pending";
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

  const generatePdf = (leave) => {
    const doc = new jsPDF();

    // Set background color to white
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 210, 297, "F");

    // Add title
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(
      "S.S Agrwal Institute of Engineering and Technology, Navsari",
      20,
      20
    );
    // Add title
    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    doc.text("Leave Application", 20, 30);

    // Add custom image/stamp
    const img = new Image();
    img.src = "/logo.jpg"; // Replace with your image path
    doc.addImage(img, "PNG", 150, 10, 50, 50);

    // Add details with styling
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);

    doc.text("Name", 20, 60);
    doc.setFontSize(14);
    doc.setTextColor(20, 20, 20);
    doc.text(`${user.name}`, 60, 60);

    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    doc.text("Status:", 20, 70);
    doc.setFontSize(14);
    doc.setTextColor(20, 20, 20);
    doc.text(
      leave.status.charAt(0).toUpperCase() + leave.status.slice(1),
      60,
      70
    );

    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    doc.text("Approved By:", 20, 80);
    doc.setFontSize(14);
    doc.setTextColor(20, 20, 20);
    doc.text(getApprover(leave.current_stage), 60, 80);

    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    doc.text("Start Date:", 20, 90);
    doc.setFontSize(14);
    doc.setTextColor(20, 20, 20);
    doc.text(format(new Date(leave.start_date), "dd/MM/yyyy"), 60, 90);

    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    doc.text("End Date:", 20, 100);
    doc.setFontSize(14);
    doc.setTextColor(20, 20, 20);
    doc.text(format(new Date(leave.end_date), "dd/MM/yyyy"), 60, 100);

    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    doc.text("Parent's Contact:", 20, 110);
    doc.setFontSize(14);
    doc.setTextColor(20, 20, 20);
    doc.text(leave.parent_mobile, 60, 110);

    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    doc.text("Last Updated:", 20, 120);
    doc.setFontSize(14);
    doc.setTextColor(20, 20, 20);
    doc.text(format(parseISO(leave.updatedAt), "dd/MM/yy hh:mm a"), 60, 120);

    // Add a table with jsPDF AutoTable
    doc.autoTable({
      startY: 130,
      head: [["Field", "Value"]],
      body: [
        ["Reason", leave.reason],
        ["Status", leave.status],
        ["Approved By", getApprover(leave.current_stage)],
        ["Start Date", format(new Date(leave.start_date), "dd/MM/yyyy")],
        ["End Date", format(new Date(leave.end_date), "dd/MM/yyyy")],
        ["Parent's Contact", leave.parent_mobile],
        ["Last Updated", format(parseISO(leave.updatedAt), "dd/MM/yy hh:mm a")],
      ],
      theme: "grid",
    });

    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(
      `Generated on: ${format(new Date(), "dd/MM/yyyy hh:mm a")}`,
      20,
      280
    );

    // Save the PDF
    doc.save(`leave-approval-${leave._id}.pdf`);
  };

  return (
    <div
      className="bg-cover loaderContainer"
      style={{ backgroundImage: `url('/Frame 1.svg')` }}
    >
      <div className="mx-auto px-5 md:w-2/3">
        <Box textAlign="center" p={5} mx={"auto"} w="full">
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <>
              {leaveRequests.length === 0 ? (
                <Text>You haven't applied for any leave.</Text>
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

                    const approver = getApprover(leave.current_stage);
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
                      >
                        <div id={`leave-details-${leave._id}`}>
                          <HStack justifyContent="space-between" mb={3}>
                            <Heading as="h3" size="lg">
                              {leave.reason}
                            </Heading>
                            <HStack>
                              {leave.status !== "pending" && (
                                <>
                                  <Badge colorScheme="purple" mr={2}>
                                    Approved By
                                  </Badge>
                                  <Text fontSize="lg" fontWeight={700}>{approver}</Text>
                                </>
                              )}
                                {statusIcon}
                            </HStack>
                          </HStack>
                          <VStack align="start" spacing={2}>
                            <Text fontSize="md">
                              <Badge colorScheme="blue" mr={2}>
                                Start Date
                              </Badge>
                              {format(new Date(leave.start_date), "dd/MM/yyyy")}
                            </Text>
                            <Text fontSize="md">
                              <Badge colorScheme="red" mr={2}>
                                End Date
                              </Badge>
                              {format(new Date(leave.end_date), "dd/MM/yyyy")}
                            </Text>
                            <Text fontSize="md">
                              <Badge colorScheme="green" mr={2}>
                                Last Updated
                              </Badge>
                              {formattedDate.split(" ")[0]}{" "}
                              <Text as="span" color="green.300">
                                {formattedDate.split(" ")[1] +
                                  " " +
                                  formattedDate.split(" ")[2]}
                              </Text>
                            </Text>
                            <Text fontSize="md">
                              <Badge colorScheme="purple" mr={2}>
                                Parent's Contact
                              </Badge>
                              {leave.parent_mobile}
                            </Text>
                          </VStack>
                          <Box mt={5}>
                            <LeaveStepper currentStage={leave.current_stage} />
                          </Box>
                        </div>
                        {leave.status === "approved" && (
                          <Button
                            leftIcon={<FaDownload />}
                            colorScheme="blue"
                            mt={3}
                            onClick={() => generatePdf(leave)}
                          >
                            Generate Report
                          </Button>
                        )}
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
