// src/pages/Messages.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase-config';
import { collection, query, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import MessagesView from '../components/Views/MessagesView';
import { useNotifications } from '../context/NotificationContext';

export default function Messages() {
  const { currentUser, userData, loading: authLoading } = useAuth();
  const { addNotification, clearNotification } = useNotifications();
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState(null);

  const conversationIds = userData?.conversationIDs || [];

  // Define the Firestore query based on conversation IDs
  const conversationsQuery =
    conversationIds.length > 0
      ? query(
          collection(db, 'conversations'),
          where('__name__', 'in', conversationIds)
        )
      : null;

  // Use the useCollection hook from react-firebase-hooks
  const [
    conversationsSnapshot,
    conversationsLoading,
    conversationsError,
  ] = useCollection(conversationsQuery);

  // Effect to process conversations and manage notifications
  useEffect(() => {
    if (conversationsSnapshot && currentUser) {
      let hasAnyNewMessages = false;
      const updatedConversations = conversationsSnapshot.docs.map((doc) => {
        const data = doc.data();
        const lastRead = data.lastRead
          ? data.lastRead[currentUser.uid]?.toDate()
          : null;
        const lastMessageTimestamp = data.lastMessage?.timestamp?.toDate();
        const hasNewMessage = lastRead
          ? lastMessageTimestamp > lastRead
          : true;

        if (hasNewMessage) {
          hasAnyNewMessages = true;
        }

        return {
          id: doc.id,
          ...data,
          hasNewMessage,
        };
      });

      setConversations(updatedConversations);

      // Update global messages notification based on unread messages
      if (hasAnyNewMessages) {
        addNotification('messages');
      } else {
        clearNotification('messages');
      }
    }
  }, [
    conversationsSnapshot,
    currentUser,
    addNotification,
    clearNotification,
  ]);

  // Handle errors from Firestore
  useEffect(() => {
    if (conversationsError) {
      setError('Failed to load conversations.');
    }
  }, [conversationsError]);

  // Optionally, handle loading states (both auth and Firestore)
  if (authLoading || conversationsLoading) {
    return <div>Loading messages...</div>;
  }

  // Pass data to the display component
  return (
    <MessagesView
      currentUser={currentUser}
      conversations={conversations}
      loading={conversationsLoading}
      error={error}
    />
  );
}
