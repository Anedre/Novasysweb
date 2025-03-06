import React, { useEffect } from 'react';
import './AmazonConnectChat.css';

const AmazonConnectChat = () => {
  useEffect(() => {
    // Inyecta el script del widget
    (function(w, d, x, id){
      const s = d.createElement('script');
      s.type = 'text/javascript';
      s.src = 'https://db08fjupg2abb.cloudfront.net/amazon-connect-chat-interface-client.js';
      s.async = 1;
      s.id = id;
      d.getElementsByTagName('head')[0].appendChild(s);
      w[x] = w[x] || function() { (w[x].ac = w[x].ac || []).push(arguments) };
    })(window, document, 'amazon_connect', 'ca606727-c7d0-4494-bea6-eb7fcf408f5c');

    // Espera a que se cargue el script y configura el widget
    const interval = setInterval(() => {
      if (window.amazon_connect) {
        window.amazon_connect('styles', { 
          iconType: 'CHAT', 
          openChat: { color: '#ffffff', backgroundColor: '#007dfa' }, 
          closeChat: { color: '#ffffff', backgroundColor: '#0080ff'} 
        });
        window.amazon_connect('snippetId', 'QVFJREFIZ2ZYaENvQWJCb1ZtYmxRNlFMNVJYMlhab3BKY1p0RnRGQ2pJNGhxdnBvemdHR3VmZkFaVXlvM1ZGUDEyRGdDUzk4QUFBQWJqQnNCZ2txaGtpRzl3MEJCd2FnWHpCZEFnRUFNRmdHQ1NxR1NJYjNEUUVIQVRBZUJnbGdoa2dCWlFNRUFTNHdFUVFNRGpMeVh2Z1Y3K1dvSkRGNEFnRVFnQ3RnNVNQTGpJS3BSbXJsN2RjU2RXeVNRbHJONjZsSlBIZWlFdDA1ZWczeEc2S2ZBTkVibytUY0VQQXc6OmFHVzlVb3lmbXhLVHdyZWxySkhGdFRDS2dVWHJIMWt5UW5RR25jMUdOcTZBODhEWk1UYlcxWG5qVmZtZVdvN29HY01sakt2eUpyaUZ3RUVIUXU2ZksyTVlRRnFkNURCRWg0cFdJdG0veTZBRFBYWThvMnI5ZDh4aUtYOWxEU1FPbEdNRzhIQzBpQjhmN1JlbnFxUXhIYkt6SDcwUXlndz0=');
        window.amazon_connect('supportedMessagingContentTypes', [ 
          'text/plain', 
          'text/markdown', 
          'application/vnd.amazonaws.connect.message.interactive', 
          'application/vnd.amazonaws.connect.message.interactive.response' 
        ]);
        clearInterval(interval);
      }
    }, 500);

    return () => {
      const script = document.getElementById('ca606727-c7d0-4494-bea6-eb7fcf408f5c');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <div id="amazon-connect-chat-container" className="amazon-widget"></div>
  );
};

export default AmazonConnectChat;
