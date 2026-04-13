import webpush from "web-push";
import { env } from "../config/env";

webpush.setVapidDetails(
  env.VAPID_EMAIL,
  env.VAPID_PUBLIC_KEY,
  env.VAPID_PRIVATE_KEY
);

export const sendPushNotification = async (
  subscription: any,
  payload: any
) => {

  try {

    await webpush.sendNotification(
      subscription,
      JSON.stringify(payload)
    );

  } catch (err) {

    console.error("Push notification error", err);

  }

};