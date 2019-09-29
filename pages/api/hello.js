import evaluateIncomingJS from '../../lib/sandbox';

export default async (req, res) => {
  if (req.method !== 'POST')
    return res.json({
      status: 'error'
    });
  let result, attachments;

  const body = req.body;

  try {
    // Pass code to function imported through eval
    result = evaluateIncomingJS(body.text, 2500);

    console.log(result);
  } catch (error) {
    // Capture any errors
    result = error.message;
    attachments = [{ text: error.stack }];
  }

  const message = '`' + body.text + '`: ' + result;
  const response_type = 'in_channel';

  res.setHeader('Content-type', 'application/json');
  // Create response object and send result back to Slack
  res.json({ response_type, text: message, attachments });
};
