import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

import { createOrUpdateUser, deleteUser } from "@/lib/actions/user.action";

export async function GET() {
  return new Response("Welcome to the Webhook CLERK API!", {
    status: 200,
  });
}

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get type
  const eventType = evt.type;
  try {
    if (eventType === "user.created" || eventType === "user.updated") {
      const eventData = evt?.data as typeof evt.data;
      const {
        id,
        username,
        first_name,
        last_name,
        image_url,
        email_addresses,
      } = eventData;

      await createOrUpdateUser({
        clerkId: id,
        username: username ? username : "",
        firstName: first_name,
        lastName: last_name,
        avatar: image_url,
        email: email_addresses[0].email_address,
      });

      return new Response("User is created or updated", {
        status: 200,
      });
    }

    if (eventType === "user.deleted") {
      if (evt?.data && evt.data.id !== undefined) {
        const id: string = evt.data.id;
        await deleteUser(id);
      }

      return new Response("User is deleted", {
        status: 200,
      });
    }

    // Invalid event type
    return new Response("Invalid event type", {
      status: 400,
    });
  } catch (err) {
    console.error("Error processing webhook:", err);
    return new Response("Error occurred", {
      status: 500,
    });
  }
}
