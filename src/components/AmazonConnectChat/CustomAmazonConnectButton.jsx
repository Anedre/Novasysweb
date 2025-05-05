import React from 'react';
import { BsChatDotsFill } from 'react-icons/bs';
import './AmazonConnectChat.css';

const CustomAmazonConnectButton = () => {
  return (
    <button
      id="launch-widget-btn"
      className="custom-amazon-chat-button"
      aria-label="Iniciar chat de soporte"
    >
      <BsChatDotsFill className="chat-icon" />
    </button>
  );
};

export default CustomAmazonConnectButton;
