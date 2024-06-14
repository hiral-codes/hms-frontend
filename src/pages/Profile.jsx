import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Box, Flex, Avatar, Text, Heading, Stack, Badge, Divider, IconButton } from '@chakra-ui/react';
import { BiEdit, BiUser, BiMailSend, BiBook, BiCalendar, BiPhone, BiHome } from 'react-icons/bi';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { FaAddressCard } from 'react-icons/fa';
function Profile() {
  const { user,getAvatar } = useContext(AuthContext);
  return (
    <Box className="bg-black text-white py-10">
      <Flex justify="center" align="center" direction="column">
        <Box
          className="max-w-lg w-full bg-gray-800 shadow-lg rounded-lg p-6 text-center"
        >
          <div className='p-2 h-52 overflow-hidden w-52 mx-auto border border-gray-600 shadow-lg rounded-full bg-gray-600'>
          <img
            src={`${getAvatar(user)}`}
            className="w-48 h-48 rounded-full object-cover object-top mx-auto"
          />
          </div>
          <Heading className="text-2xl font-body mb-2">
            {user.name}
          </Heading>
          <Stack direction="row" spacing={4} align="center" justify="center" mb={4}>
            <Badge colorScheme="teal" display="flex" alignItems="center">
              <BiUser className="mr-2" /> {user.enrollmentNo}
            </Badge>
            <Badge colorScheme="blue" display="flex" alignItems="center">
              <BiBook className="mr-2" /> {user.branch}
            </Badge>
          </Stack>
          <Stack direction="row" spacing={4} align="center" justify="center" mb={4}>
            <Badge colorScheme="purple" display="flex" alignItems="center">
              <BiCalendar className="mr-2" /> Semester {user.semester}
            </Badge>
            <Badge colorScheme="orange" display="flex" alignItems="center">
              <BiHome className="mr-2" /> Hostel Room No {user.roomNo}
            </Badge>
          </Stack>
          <Stack direction="row" spacing={4} align="center" justify="center" mb={4}>
            <Badge colorScheme="red" display="flex" alignItems="center">
              <BiPhone className="mr-2" /> {user.mobileNo}
            </Badge>
            <Badge colorScheme="yellow" display="flex" alignItems="center">
              <BiCalendar className="mr-2" /> {user.dob ? format(new Date(user.dob), 'MMMM d, yyyy') : 'N/A'}
            </Badge>
          </Stack>
          <Badge className="font-normal text-gray-300 mb-4">
            <FaAddressCard className="mr-2 inline-block" /> {user.address}
          </Badge>
          <Text className="font-normal text-gray-300 mb-4">
            <BiMailSend className="mr-2 inline-block" /> {user.email}
          </Text>
          <Divider my={4} />
          <Stack align="center" justify="center" direction="row" mt={6}>
            <Link to={"/edit-profile"}><IconButton
              icon={<BiEdit />}
              colorScheme="teal"
              variant="outline"
              aria-label="Edit Profile"
              className="cursor-pointer"
            /></Link>
            <Text className="font-semibold ml-2">Edit Profile</Text>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}

export default Profile;
