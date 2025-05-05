import { useEffect } from 'react';
import { FaCommentDots } from 'react-icons/fa';
import './AmazonConnectChat.css';

const AmazonConnectChat = () => {
  useEffect(() => {
    const scriptId = 'ca606727-c7d0-4494-bea6-eb7fcf408f5c';
    let chatIsOpen = false;

    if (!document.getElementById(scriptId)) {
      const s = document.createElement('script');
      s.src = 'https://novasys.my.connect.aws/connectwidget/static/amazon-connect-chat-interface-client.js';
      s.async = true;
      s.id = scriptId;
      document.head.appendChild(s);

      window.amazon_connect = window.amazon_connect || function () {
        (window.amazon_connect.ac = window.amazon_connect.ac || []).push(arguments);
      };

      // 🔸 Personalización visual oficial
      window.amazon_connect('styles', {
        iconType: 'CHAT',
        openChat: { color: '#ffffff', backgroundColor: '#e2653b' },
        closeChat: { color: '#ffffff', backgroundColor: '#cc5630' },
        chat: {
          width: '360px',
          height: '520px',
          borderRadius: '12px',
          fontFamily: 'Inter, sans-serif',
          backgroundColor: '#fffaf7'
        }
      });

      // 🔸 Snippet de instancia
      window.amazon_connect('snippetId', 'QVFJREFIZ2ZYaENvQWJCb1ZtYmxRNlFMNVJYMlhab3BKY1p0RnRGQ2pJNGhxdnBvemdHR3VmZkFaVXlvM1ZGUDEyRGdDUzk4QUFBQWJqQnNCZ2txaGtpRzl3MEJCd2FnWHpCZEFnRUFNRmdHQ1NxR1NJYjNEUUVIQVRBZUJnbGdoa2dCWlFNRUFTNHdFUVFNRGpMeVh2Z1Y3K1dvSkRGNEFnRVFnQ3RnNVNQTGpJS3BSbXJsN2RjU2RXeVNRbHJONjZsSlBIZWlFdDA1ZWczeEc2S2ZBTkVibytUY0VQQXc6OmFHVzlVb3lmbXhLVHdyZWxySkhGdFRDS2dVWHJIMWt5UW5RR25jMUdOcTZBODhEWk1UYlcxWG5qVmZtZVdvN29HY01sakt2eUpyaUZ3RUVIUXU2ZksyTVlRRnFkNURCRWg0cFdJdG0veTZBRFBYWThvMnI5ZDh4aUtYOWxEU1FPbEdNRzhIQzBpQjhmN1JlbnFxUXhIYkt6SDcwUXlndz0=');

      // 🔸 Branding del chat
      window.amazon_connect('customDisplayNames', {
        customerName: 'Cliente Novasys',
        agentName: 'Asesor Novasys',
        headerText: '¡Hola! ¿En qué podemos ayudarte hoy?',
        logoUrl: 'https://novasys.com.pe/logo.svg' // Reemplaza por tu logo real
      });

      // 🔸 Comportamiento programático del botón
      window.amazon_connect('customLaunchBehavior', {
        skipIconButtonAndAutoLaunch: true,
        alwaysHideWidgetButton: true,
        programmaticLaunch: function (launchCallback) {
          const btn = document.getElementById('launch-widget-btn');
          if (!btn) return;

          window.amazonLaunchCallback = launchCallback;
          window.dispatchEvent(new Event("amazonLaunchReady"));

          window.addEventListener('amazon_connect:open', () => {
            chatIsOpen = true;
          });

          window.addEventListener('amazon_connect:close', () => {
            chatIsOpen = false;
          });

          btn.addEventListener('click', () => {
            if (!chatIsOpen) {
              launchCallback();
            } else {
              const closeBtn = document.querySelector('[data-testid="entry-point-close"]');
              if (closeBtn) closeBtn.click();
            }
          });
        }
      });
    }
  }, []);

  return (
    <button id="launch-widget-btn">
      <FaCommentDots />
    </button>
  );
};

export default AmazonConnectChat;
