import { useState, useEffect } from "react";
import { reportIncident, fetchIncidents } from "../services/api";
import "../components/user.css";

const UserPortal = () => {
  const [incident, setIncident] = useState({
    type: "",
    description: "",
    location: "",
    status: "",
    reportedByID: "",
  });

  const [incidents, setIncidents] = useState([]); // Initialize as an empty array
  const [filterStatus, setFilterStatus] = useState(""); // State to filter incidents by status

  // Fetch incidents on component mount
  useEffect(() => {
    const loadIncidents = async () => {
      try {
        const data = await fetchIncidents(); // Fetch incidents from the API
        console.log("Fetched incidents:", data); // Debugging API response
        setIncidents(data); // Ensure data is an array
      } catch (error) {
        console.error("Error fetching incidents:", error);
        setIncidents([]); // Fallback to empty array on error
      }
    };
    loadIncidents();
  }, []); // Only run once on component mount

  // Handle submit for reporting a new incident
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting Incident:", incident); // Debug incident being submitted
      await reportIncident(incident); // Report the incident
      alert("Incident reported successfully!");

      // Reset form after submitting
      setIncident({
        type: "",
        description: "",
        location: "",
        status: "",
        reportedByID: "",
      });

      // Refresh the incidents list after reporting
      const updatedIncidents = await fetchIncidents();
      console.log("Updated incidents:", updatedIncidents); // Debug updated incidents
      setIncidents(Array.isArray(updatedIncidents) ? updatedIncidents : []);
    } catch (error) {
      console.error("Error reporting incident:", error);
      alert("Failed to report the incident. Please try again.");
    }
  };

  // Filter incidents based on the selected status

  return (
    <div>
      <h1>User Portal</h1>

      {/* Incident Reporting Form */}
      <section>
        <h2>Report an Incident</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type"
            value={incident.type}
            onChange={(e) => setIncident({ ...incident, type: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={incident.description}
            onChange={(e) =>
              setIncident({ ...incident, description: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={incident.location}
            onChange={(e) =>
              setIncident({ ...incident, location: e.target.value })
            }
            required
          />
          <select
            value={incident.status}
            onChange={(e) =>
              setIncident({ ...incident, status: e.target.value })
            }
            required
          >
            <option value="" disabled>
              Select Status
            </option>
            <option value="pending">pending</option>
            <option value="in progress">In Progress</option>
            <option value="resolved">resolved</option>
          </select>
          <input
            type="text"
            placeholder="Reported By (User ID)"
            value={incident.reportedByID}
            onChange={(e) =>
              setIncident({ ...incident, reportedByID: e.target.value })
            }
            required
          />
          <button type="submit">Report Incident</button>
        </form>
      </section>

      <section>
        <h2>Reported Incidents</h2>
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Incident ID</th>
              <th>Type</th>
              <th>Description</th>
              <th>Location</th>
              <th>Status</th>
              <th>Reported By</th>
            </tr>
          </thead>
          <tbody>
            {/* Manually Added Incident Data */}
            <tr>
              <td>1</td>
              <td>Fire</td>
              <td>Fire in downtown area</td>
              <td>Downtown street 45</td>
              <td>Pending</td>
              <td>1</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Fire</td>
              <td>Fire in building</td>
              <td>Building 5, Floor 2</td>
              <td>Pending</td>
              <td>2</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Medical</td>
              <td>Heart attack</td>
              <td>New Delhi</td>
              <td>In Progress</td>
              <td>3</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Fire</td>
              <td>Fire at house</td>
              <td>Delhi</td>
              <td>Resolved</td>
              <td>4</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Fire</td>
              <td>Fire in office</td>
              <td>Delhi</td>
              <td>Pending</td>
              <td>5</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default UserPortal;
