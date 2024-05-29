export async function onRequest(context) {
  if (context.request.method !== "POST") {
    return new Response("Invalid request method.", { status: 405 });
  }

  const formData = await context.request.formData();
  const body = Object.fromEntries(formData.entries());

  const sent = await sendFormTo(body, context.env.EMAIL_BEN);

  if (!sent) {
    return new Response("Oops! Something went wrong. Please try submitting the form again.", { status: 500 });
  }

  return Response.redirect(context.request.headers.get("Referer"), 303);
}

async function sendFormTo(body, email) {
  const send_request = new Request("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [
        {
           to: [{ email }],
        },
      ],
      from: {
        name: "Contact Form",
        email: "no-reply@workermail.beh.uk",
      },
      subject: "New contact form submission",
      content: [
        {
          type: "text/plain",
          value: `Email: ${body.email}\nMessage: ${body.message}`,
        },
      ],
    }),
  });

  const send_response = await fetch(send_request);

  if (!send_response.ok) {
    return false;
  }

  return true;
}
