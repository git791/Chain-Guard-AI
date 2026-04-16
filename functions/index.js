const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.detectDelay = functions.firestore
  .document("shipments/{id}")
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    // Check if status changed from something else to 'delayed'
    if (after.status === "delayed" && before.status !== "delayed") {
      functions.logger.log(`Shipment ${context.params.id} delayed. Generating feed entry.`);
      
      // Add event feed entry corresponding directly to system event feed
      return admin.firestore().collection("event_feed").add({
        message: `Shipment ${context.params.id} has reported a new delay. Action required.`,
        shipmentId: context.params.id,
        severity: "medium", // 'high' for delays extending beyond 24h
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    return null;
  });
