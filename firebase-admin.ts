import {
  initializeApp,
  getApp,
  getApps,
  cert,
  App,
  ServiceAccount,
} from "firebase-admin/app";

import { getFirestore } from "firebase-admin/firestore";

let app: App;

if (getApps().length === 0) {
  const Sa: ServiceAccount = (await import("./service_key.json"))
    .default as ServiceAccount;
  app = initializeApp({
    credential: cert(Sa),
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);

export { app as adminApp, adminDb };
