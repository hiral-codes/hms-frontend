import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  Divider,
  Spinner,
} from "@chakra-ui/react";

function CoordinatorDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    } else {
      setLoading(false);
    }
  }, [user, navigate]);
  if (loading) {
    return (
      <div className="loaderContainer">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.600"
          size="xl"
        />
      </div>
    );
  }

  return (
    <Box
      className="bg-cover text-white"
      style={{ backgroundImage: `url('/Frame 1.svg')`, minHeight: "100vh" }}
    >
      <Box className="p-8">
        <Heading className="text-5xl mb-8">Welcome, {user.name}</Heading>

        <Stack spacing={8}>
          {/* Announcements Section */}
          <Box className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <Heading className="text-2xl mb-4">Announcements</Heading>
            <Divider mb={4} />
            <Text>
              🎉 Exam schedules have been updated. Check your timetable.
            </Text>
            <Text>📢 New library hours: 9 AM - 8 PM from next week.</Text>
          </Box>

          {/* Upcoming Events Section */}
          <Box className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <Heading className="text-2xl mb-4">Upcoming Events</Heading>
            <Divider mb={4} />
            <Text>📅 Workshop on React.js: June 20, 2024</Text>
            <Text>📅 Career Fair: July 15, 2024</Text>
          </Box>

          {/* News Feed Section */}
          <Box className="bg-gray-800 p-6 rounded-lg shadow-lg overflow-y-auto h-64">
            <Heading className="text-2xl mb-4">News Feed</Heading>
            <Divider mb={4} />
            <Text>📰 New AI course starting this fall.</Text>
            <Text>📰 Scholarship opportunities for 2024-2025 announced.</Text>
            <Text>
              📰 College ranked top 10 in the state for computer science
              programs.
            </Text>
            <Text>📰 Virtual seminar on Cybersecurity next month.</Text>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default CoordinatorDashboard;
