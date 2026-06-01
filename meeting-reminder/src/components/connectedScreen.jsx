import React from 'react';

const ConnectedScreen = ({ onDisconnect }) => (
  <button onClick={onDisconnect}>
    Disconnect
  </button>
);

export default ConnectedScreen;
