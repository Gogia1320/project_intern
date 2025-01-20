const AUTH_TOKEN =
  "YV6pSd4S7Tet1hGRYIel7LSy6jsP3FZEXfDGoZ+cMQ5jIbS0J98TglC14Zs5wqhA1+ZwHW+Wcfu0t9U+maeoFybH7E0Svk/xo9nmWWNmsN8zCX/el3UlNpUnE32J9mnRiyHSr+wesQTjaTXPiq4VAekta0dJj2dtBU7p88NCmFIOhbEFV4b0roZWnV6DyWNJxtKgJ0AV+IzcTB3c4cDHzUt3QgTTjTyI3cLDed5rIViI8Ufif+LTjPrE7rhEHFYkCr4cJR3NPd995mn9XPD0rxPvvnPVx3QMHa/VcDHUG+4GhfsEYqXs1Jlto1u2PJxTKZ6GLH/SZwJqh4cDaDnaRRir7K6F9npkAJhsN4VR/YLdDMni8edpgkPBgbbwIHuAENFpHvsDH/w2HPEuflasKY3bcTOswhzF0CI4YpueEfzcKAtKrBi7J/opSeWTOXvZUljYb/CSMvC8tjZbmxLG8r69r+ZcuD8Rz8azTf5OA/ha3ty2PE49Zga/5BIZ6wQxhKmVokvWR6Kd48HXoO+rw6nci9cvrEPMOyGmcxU+977parq+nhFjemlpdjkW9OtXQPVwSnBvtxH/CnhBB7Ofh//iw+20KEfQBR+CvH5WYsGlCVkY2MK8vxeIguTBhlDD+g58YOZojx+2k3PvqCwjOiP5H4fSNHEM11rX3cph5CA=";

import axios from "axios";

// export const registerUser = (userData) => {
//   return axios.post(`${API_URL}/users/register`, userData);
// };

// export const loginUser = (credentials) => {
//   return axios.post(`${API_URL}/users/login`, credentials);
// };
export const fetchResponders = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/tenant/default/packages.Project.db_services.responder.api.fetch_all.main"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching responders:", error);
    throw error;
  }
};
export const fetchAssignedAlerts = async () => {
  const response = await axios.get(
    "http://localhost:8080/tenant/default/packages.Project.db_services.alert.api.allalerts.main",
    {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`, // Add Authorization header
      },
    }
  );
  return response.data; // Expected format: [{ alertID, type, description, location, status }]
};

export const updateAlertStatus = async (alertID, data) => {
  const response = await axios.put(
    `http://localhost:8080/tenant/default/alerts_api/${alertID}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`, // Add Authorization header
      },
    }
  );
  return response.data; // Example: { success: true }
};

export const insertResponder = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/tenant/default/responders",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error inserting responder:", error);
    throw error;
  }
};

export const reportIncident = async (data) => {
  const response = await fetch(
    "http://localhost:8080/tenant/default/packages.Project.db_services.incident.api.insert_api.main",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to report incident: ${response.statusText}`);
  }

  return response.json();
};

export const fetchIncidents = async () => {
  const response = await fetch(
    "http://localhost:8080/tenant/default/packages.Project.db_services.incident.api.getall_api.main",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch incidents: ${response.statusText}`);
  }

  return response.json();
};
