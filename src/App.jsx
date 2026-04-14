import React, { useState } from "react";
import axios from "axios";

function GetLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const getUserLocation = () => {
    setError("");
    setSent(false);
    setLoading(true);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const data = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };

        setLocation(data);

        try {
          await axios.post("https://server-geogame-3.onrender.com/locations", data);
          setSent(true);
        } catch (err) {
          console.error(err);
          setError("Failed to send location to server");
        }

        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🌍 Geo Game</h2>
        <p style={styles.subtitle}>
          Click play to share your location and start
        </p>

        <button onClick={getUserLocation} style={styles.button}>
          {loading ? "Getting started..." : "Play now"}
        </button>

        {error && <p style={styles.error}>⚠️ {error}</p>}

        {location && (
          <div style={styles.resultBox}>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    width: "90%",
    maxWidth: "420px",
    background: "#fff",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  title: {
    marginBottom: "5px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  },
  button: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "10px",
    background: "#5b6cff",
    color: "#fff",
    fontSize: "15px",
    cursor: "pointer",
  },
  resultBox: {
    marginTop: "20px",
    padding: "15px",
    background: "#f7f7f7",
    borderRadius: "10px",
    textAlign: "left",
  },
  link: {
    display: "inline-block",
    marginTop: "10px",
    color: "#5b6cff",
    fontWeight: "bold",
    textDecoration: "none",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default GetLocation;
