import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronLeftIcon, UserIcon2 } from '../components/icons/Icons';
import EditStackedList from '../components/molecules/stackedlist/EditStackedList';

// Styled Components
const Container = styled.div`
  max-width: 28rem; /* Equivalent to max-w-md */
  padding: 1rem;
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;
const Title = styled.h1`
  font-size: 1.8rem; /* Equivalent to text-xl */
  font-weight: 600; /* Equivalent to font-semibold */
  color: #333; /* Equivalent to text-gray-800 */
  margin: 0;
  margin-left: 4rem;
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px; /* Adjust as needed */
  left: 20px; /* Adjust as needed */
  width: 40px;
  height: 40px;
  border: 1px solid #e0e0e0;
  padding: 5px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 50; /* Ensure it's above the conversation content */

  svg {
    width: 24px;
    height: 24px;
  }
`;


const ManageNotifications = () => {
  const [notifications, setNotifications] = useState(true);


  const accountItems = [
  
    {
      type: 'ToggleField',
      props: {
        icon: UserIcon2,
        name: 'Email Notifications',
        value: notifications,
        onChange: setNotifications,
      },
    },
  ];



  const handleBackClick = () => {
    window.history.back();
  };


  return (
    <Container>
      {/* Header with Back Button and Title */}
      <Header>
        <BackButton onClick={handleBackClick} aria-label="Go back to settings">
                  <ChevronLeftIcon />
                </BackButton>
        <Title>Manage Account</Title>
      </Header>

      {/* Edit List */}
      <EditStackedList items={accountItems} />

    </Container>
  );
};

export default ManageNotifications;
