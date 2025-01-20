import { useState, useEffect } from "react";
import "../components/responder.css";

import {
  fetchAssignedAlerts,
  updateAlertStatus,
  // shareResponderLocation,
} from "../services/api"; // Import API functions

const ResponderDashboard = () => {
  const [alerts, setAlerts] = useState([]); // List of assigned alerts
  const [loading, setLoading] = useState(false); // Loading state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  // Fetch assigned alerts when the component loads
  useEffect(() => {
    const loadAlerts = async () => {
      try {
        const alertsData = await fetchAssignedAlerts(); // API to fetch assigned alerts
        console.log("Fetched alerts:", alertsData); // Debugging
        if (alertsData) {
          setAlerts(alertsData);
        } else {
          setErrorMessage("No alerts available.");
        }
      } catch (error) {
        console.error("Error fetching alerts:", error);
        setErrorMessage("Failed to load alerts. Please try again.");
      }
    };
    loadAlerts();
  }, []);

  // Handle status update for an alert
  const handleStatusUpdate = async (alertID, newStatus) => {
    setLoading(true);
    try {
      const response = await updateAlertStatus(alertID, { status: newStatus }); // API to update alert status
      console.log("Status update response:", response); // Debugging

      if (response && response.success) {
        setSuccessMessage("Status updated successfully!");
        // Refresh alerts after status update
        const updatedAlerts = await fetchAssignedAlerts();
        setAlerts(updatedAlerts || []);
      } else {
        setErrorMessage("Failed to update status. Please try again.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setErrorMessage("Failed to update status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Responder Dashboard</h1>

      {/* Display success or error messages */}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {/* View Assigned Alerts */}
      <section>
        <h2>Assigned Alerts</h2>
        {true ? ( // Always show alerts section for this case
          <table border="1" cellPadding="8" cellSpacing="0">
            <thead>
              <tr>
                <th>Alert ID</th>
                <th>Incident Type</th>
                <th>Description</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Manually Added Alerts */}
              <tr key={1}>
                <td>1</td>
                <td>Fire</td>
                <td>Fire in downtown area</td>
                <td>Downtown street 45</td>
                <td>Pending</td>
                <td>
                  <select value="Pending" disabled>
                    <option value="Acknowledged">Acknowledged</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <button disabled>Update Status</button>
                  <span>Updating...</span>
                </td>
              </tr>
              <tr key={2}>
                <td>2</td>
                <td>Medical</td>
                <td>Heart attack</td>
                <td>New Delhi</td>
                <td>In Progress</td>
                <td>
                  <select value="In Progress" disabled>
                    <option value="Acknowledged">Acknowledged</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <button disabled>Update Status</button>
                  <span>Updating...</span>
                </td>
              </tr>
              <tr key={3}>
                <td>3</td>
                <td>Fire</td>
                <td>Fire at building</td>
                <td>Building 5, Floor 2</td>
                <td>Completed</td>
                <td>
                  <select value="Completed" disabled>
                    <option value="Acknowledged">Acknowledged</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <button disabled>Update Status</button>
                  <span>Updating...</span>
                </td>
              </tr>
              <tr key={4}>
                <td>4</td>
                <td>Fire</td>
                <td>Fire in office</td>
                <td>Delhi</td>
                <td>Pending</td>
                <td>
                  <select value="Pending" disabled>
                    <option value="Acknowledged">Acknowledged</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <button disabled>Update Status</button>
                  <span>Updating...</span>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>No alerts assigned.</p>
        )}
      </section>

      {/* Share Live Location */}
      {/* <section>
        <h2>Share Live Location</h2>
        <button onClick={handleShareLocation} disabled={loading}>
          {loading ? "Sharing Location..." : "Share Location"}
        </button>
        {currentLocation && (
          <p>
            Current Location: Latitude {currentLocation.latitude}, Longitude{" "}
            {currentLocation.longitude}
          </p>
        )}
      </section> */}
    </div>
  );
};

export default ResponderDashboard;
