export async function onRequest(context) {
  if (context.request.method !== "POST") {
    return new Response("Invalid request method", { status: 405 });
  }

  const formData = await context.request.formData();
  const body = Object.fromEntries(formData.entries());
  body.cf = context.request.cf

  const sent = await sendFormViaResend(body, context.env.EMAIL_BEN, context.env.RESEND_KEY);

  if (!sent) {
    return new Response("Oops! Something went wrong. Please try submitting the form again.", { status: 500 });
  }

  return Response.redirect(context.request.headers.get("Referer"), 303);
}

async function sendFormViaResend(body, email, api_key) {
  const send_request = new Request("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${api_key}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: "no-reply@viaresend.beh.uk",
      to: email,
      subject: "New contact form submission from jekyll-links",
      text: `Email from ${body.email}\n\nMessage:\n${body.message}\n\ncf object:\n${JSON.stringify(body.cf, null, 2)}`,
    }),
  });

  const send_response = await fetch(send_request);

  if (!send_response.ok) {
    return false;
  }

  return true;
}
