export async function onRequest(context) {
    if (context.request.method !== "POST") {
        return new Response("Invalid request method.", { status: 405 });
    }

    // Get the form data.
    const formData = await context.request.formData();
    const body = Object.fromEntries(formData.entries());

    // Send form data to my inbox.
    const sent = await sendFormToMe(body, context.env.DKIM_PRIVATE_KEY);

    if (!sent) {
        return new Response("Oops! Something went wrong. Please try submitting the form again.", { status: 500 });
    }

    return new Response("Form submitted successfully!", { status: 200 });
}

// Send email to my inbox (email with form data)
async function sendFormToMe(body, ENV) {
    const send_request = new Request("https://api.mailchannels.net/tx/v1/send", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            personalizations: [
                {
                    to: [{ email: ENV.EMAIL_BEN }],
                },
            ],
            from: {
                name: "Contact Form",
                email: "no-reply@workermail.beh.uk", // CHANGE THIS to your email address (emails will be sent FROM this address).
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

    // Get the response from the email API
    const send_response = await fetch(send_request);

    // Check if the email was sent successfully.
    if (!send_response.ok) {
        return false;
    }

    return true;
}
