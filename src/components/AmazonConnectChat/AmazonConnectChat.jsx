import React, { useEffect } from 'react';
import "./AmazonConnectChat.css"; // Para estilos adicionales como hover o ajustes finos

const AmazonConnectChat = () => {
  useEffect(() => {
    // Inyectar el script del widget
    (function(w, d, x, id){
      const s = d.createElement('script');
      s.src = 'https://novasys.my.connect.aws/connectwidget/static/amazon-connect-chat-interface-client.js';
      s.async = true;
      s.id = id;
      d.getElementsByTagName('head')[0].appendChild(s);
      w[x] = w[x] || function() { (w[x].ac = w[x].ac || []).push(arguments) };
    })(window, document, 'amazon_connect', 'ca606727-c7d0-4494-bea6-eb7fcf408f5c');

    // Estilos del botón flotante del widget
    window.amazon_connect('styles', {
      iconType: 'CHAT',
      openChat: { color: '#ffffff', backgroundColor: '#ff2c2c' },
      closeChat: { color: '#ffffff', backgroundColor: '#ff2c2c' }
    });

    // ID del snippet del widget
    window.amazon_connect('snippetId', 'QVFJREFIZ2ZYaENvQWJCb1ZtYmxRNlFMNVJYMlhab3BKY1p0RnRGQ2pJNGhxdnBvemdHR3VmZkFaVXlvM1ZGUDEyRGdDUzk4QUFBQWJqQnNCZ2txaGtpRzl3MEJCd2FnWHpCZEFnRUFNRmdHQ1NxR1NJYjNEUUVIQVRBZUJnbGdoa2dCWlFNRUFTNHdFUVFNRGpMeVh2Z1Y3K1dvSkRGNEFnRVFnQ3RnNVNQTGpJS3BSbXJsN2RjU2RXeVNRbHJONjZsSlBIZWlFdDA1ZWczeEc2S2ZBTkVibytUY0VQQXc6OmFHVzlVb3lmbXhLVHdyZWxySkhGdFRDS2dVWHJIMWt5UW5RR25jMUdOcTZBODhEWk1UYlcxWG5qVmZtZVdvN29HY01sakt2eUpyaUZ3RUVIUXU2ZksyTVlRRnFkNURCRWg0cFdJdG0veTZBRFBYWThvMnI5ZDh4aUtYOWxEU1FPbEdNRzhIQzBpQjhmN1JlbnFxUXhIYkt6SDcwUXlndz0=');

    // Estilos internos del cuadro de chat
    window.amazon_connect('customStyles', {
      global: {
        frameWidth: '400px',
        frameHeight: '600px',
        fontSize: '14px',
        textColor: '#333333',
        typeface: "'Segoe UI', sans-serif"
      },
      header: {
        headerTextColor: '#ffffff',
        headerBackgroundColor: '#ff2c2c'
      },
      transcript: {
        widgetBackgroundColor: '#f9f9f9',
        customerMessageTextColor: '#ffffff',
        customerChatBubbleColor: '#ff5e5e',
        agentMessageTextColor: '#000000',
        agentChatBubbleColor: '#e1e1e1'
      },
      footer: {
        footerBackgroundColor: '#ffffff',
        buttonTextColor: '#ffffff',
        buttonBackgroundColor: '#ff2c2c',
        buttonFontSize: '14px'
      },
      logo: {
        logoMaxHeight: '40px',
        logoMaxWidth: '120px'
      }
    });

    // Tipos de contenido permitidos en el chat
    window.amazon_connect('supportedMessagingContentTypes', [
      'text/plain',
      'text/markdown',
      'application/vnd.amazonaws.connect.message.interactive',
      'application/vnd.amazonaws.connect.message.interactive.response'
    ]);
  }, []);

  return null;
};

export default AmazonConnectChat;