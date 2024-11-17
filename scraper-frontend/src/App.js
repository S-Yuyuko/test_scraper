import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [newArticles, setNewArticles] = useState({ landingPages: [], otherPages: [] });
  const [previousData, setPreviousData] = useState({ landingPages: [], otherPages: [] });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchScrapedData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:4000/scraped-content');
      const { message, newArticles, previousData } = response.data;

      setMessage(message);
      setNewArticles(newArticles);
      setPreviousData(previousData);
    } catch (err) {
      setError(err.message || 'Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScrapedData();
  }, []);

  if (loading) {
    return <div style={{ padding: '20px', fontFamily: 'Arial' }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial', color: 'red' }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Scraped Content</h1>
      <p>{message}</p>

      <h2>New Landing Pages</h2>
      {newArticles.landingPages.length > 0 ? (
        <ul>
          {newArticles.landingPages.map((url, index) => (
            <li key={index}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No new landing pages found.</p>
      )}

      <h2>New Other Pages</h2>
      {newArticles.otherPages.length > 0 ? (
        <ul>
          {newArticles.otherPages.map((url, index) => (
            <li key={index}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No new other pages found.</p>
      )}

      <h2>All Landing Pages</h2>
      {previousData.landingPages.length > 0 ? (
        <ul>
          {previousData.landingPages.map((url, index) => (
            <li key={index}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No landing pages found.</p>
      )}

      <h2>All Other Pages</h2>
      {previousData.otherPages.length > 0 ? (
        <ul>
          {previousData.otherPages.map((url, index) => (
            <li key={index}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No other pages found.</p>
      )}

      <button
        onClick={fetchScrapedData}
        style={{
          marginTop: '20px',
          padding: '10px',
          fontSize: '16px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Refresh Data
      </button>
    </div>
  );
};

export default App;
