// SettingsPage.js
import React from "react";
import { useAuth } from "../context/AuthContext";
import SettingsView from "../components/Views/SettingsView";
import { UsersIcon, NotificationsIcon } from "../components/icons/Icons"; // Ensure Icons are imported

// CREATE FUNCTION
function SettingsPage() {
  const { logout, userData, currentUser } = useAuth(); // Access userData and currentUser from context

  // HTML
  return (
    <div>
      {/* Settings Component with userData prop */}
      <SettingsView
        userData={userData} // Pass userData to Settings
        logout={logout} // Pass logout function to Settings
        currentUser={currentUser} // Pass currentUser
        settings={[
          {
            category: "Communication",
            icon: NotificationsIcon,
            text: "Email Notifications",
            link: `manageNotifications`,
          },
        ]}
      />
    </div>
  );
}

export default SettingsPage;