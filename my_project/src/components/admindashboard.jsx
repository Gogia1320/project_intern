import { useState, useEffect } from "react";
import "../components/admin.css";
import {
  fetchIncidents,
  fetchResponders,
  insertResponder,
} from "../services/api"; // Import API functions

const AdminDashboard = () => {
  const [incidents, setIncidents] = useState([]); // List of incidents
  const [responders, setResponders] = useState([]); // List of responders
  const [responderForm, setResponderForm] = useState({
    name: "",
    role: "",
    phone: "",
    location: "",
  }); // Form data for new responder
  const [report, setReport] = useState([]); // Placeholder for report data

  // Fetch incidents and responders when the component loads
  useEffect(() => {
    const loadData = async () => {
      try {
        const incidentsData = await fetchIncidents();
        const respondersData = await fetchResponders();
        setIncidents(incidentsData || []);
        setResponders(respondersData || []);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResponderForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Insert a new responder
  const handleInsertResponder = async () => {
    const { name, role, phone, location } = responderForm;

    if (!name || !role || !phone || !location) {
      alert("Please fill out all the fields.");
      return;
    }

    try {
      await insertResponder({
        name,
        role,
        phone,
        location,
      });
      alert("Responder added successfully!");
      setResponderForm({ name: "", role: "", phone: "", location: "" });
      // Refresh responders list
      const updatedResponders = await fetchResponders();
      setResponders(updatedResponders || []);
    } catch (error) {
      console.error("Error inserting responder:", error);
      alert("Failed to add responder. Please try again.");
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* View Reported Incidents */}
      <section>
        <h2>Reported Incidents</h2>
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Description</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Manually Added Incidents */}
            {[
              {
                IncidentID: 1,
                Type: "Fire",
                Description: "Fire in downtown area",
                Location: "Downtown street 45",
                Status: "In Progress",
              },
              {
                IncidentID: 2,
                Type: "Medical",
                Description: "Heart attack",
                Location: "New Delhi",
                Status: "Acknowledged",
              },
              {
                IncidentID: 3,
                Type: "Fire",
                Description: "Fire at building",
                Location: "Building 5, Floor 2",
                Status: "Completed",
              },
              {
                IncidentID: 4,
                Type: "Medical",
                Description: "Accident with multiple injuries",
                Location: "Sector 23, Chandigarh",
                Status: "Pending",
              },
            ].map((incident) => (
              <tr key={incident.IncidentID}>
                <td>{incident.IncidentID}</td>
                <td>{incident.Type}</td>
                <td>{incident.Description}</td>
                <td>{incident.Location}</td>
                <td>{incident.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Insert New Responder */}
      <section>
        <h2>Add New Responder</h2>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={responderForm.name}
              onChange={handleInputChange}
              placeholder="Enter name"
            />
          </label>
        </div>
        <div>
          <label>
            Role:
            <input
              type="text"
              name="role"
              value={responderForm.role}
              onChange={handleInputChange}
              placeholder="Enter role (e.g., Firefighter, Paramedic)"
            />
          </label>
        </div>
        <div>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={responderForm.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
            />
          </label>
        </div>
        <div>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={responderForm.location}
              onChange={handleInputChange}
              placeholder="Enter location"
            />
          </label>
        </div>
        <button onClick={handleInsertResponder}>Add Responder</button>
      </section>
    </div>
  );
};

export default AdminDashboard;
