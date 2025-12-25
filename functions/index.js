/**
 * यह Firebase Cloud Functions के लिए आधारभूत (Basic) कोड है।
 * पुरानी फ़ाइल की जगह इसे पेस्ट करें, ताकि सभी पुरानी ग़लतियाँ (जैसे PORT और गलत indentation) खत्म हो जाएं।
 */

// Firebase Functions SDK और Admin SDK को इम्पोर्ट करें
const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Firebase Admin SDK को शुरू करें (Initialization)
// यह सुनिश्चित करता है कि आप डेटाबेस, ऑथ आदि के साथ सर्वर-साइड बातचीत कर सकें।
admin.initializeApp();

// Firestore डेटाबेस का संदर्भ (Reference)
const db = admin.firestore();

// -----------------------------------------------------------------------
// 1. उदाहरण Cloud Function (HTTP Callable Function)
// -----------------------------------------------------------------------

// यह फ़ंक्शन क्लाइंट (आपके ऐप) से कॉल किया जा सकता है।
// यह सुरक्षा नियम (Firebase Rules) को बायपास करते हुए जटिल तर्क को चलाने के लिए सबसे अच्छा है।
exports.helloWorld = functions.https.onCall((data, context) => {
  // 1. जाँच करें कि उपयोगकर्ता लॉग इन है
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "इस फ़ंक्शन को कॉल करने के लिए उपयोगकर्ता को लॉग इन होना चाहिए।",
    );
  }

  const name = data.name || "दुनिया"; // क्लाइंट द्वारा भेजा गया डेटा

  console.log(`Hello World function called by user: ${context.auth.uid}`);

  // आप यहाँ जटिल तर्क (Complex Logic) लागू कर सकते हैं।

  // 2. प्रतिक्रिया (Response) वापस भेजें
  return {
    message: `नमस्ते, ${name}! आपका संदेश सर्वर से आया है।`,
    timestamp: new Date().toISOString(),
  };
});

// -----------------------------------------------------------------------
// 2. (उदाहरण: Firestore ट्रिगर फ़ंक्शन)
// -----------------------------------------------------------------------
// यह फ़ंक्शन तब चलता है जब 'users' कलेक्शन में कोई नया दस्तावेज़ (document) बनाया जाता है।
exports.onUserCreated = functions.firestore
    .document("users/{userId}")
    .onCreate((snap, context) => {
      const newUser = snap.data();
      const userId = context.params.userId;

      console.log(`नया उपयोगकर्ता बनाया गया: ${userId}. नाम: ${newUser.displayName || "कोई नाम नहीं"}`);

      // आप यहाँ नए उपयोगकर्ता के लिए कोई प्रारंभिक सेटअप (जैसे वेलकम ईमेल या डिफॉल्ट सेटिंग्स) कर सकते हैं।

      return null; // functions को हमेशा कुछ वापस (return) करना चाहिए।
    });
// -----------------------------------------------------------------------

// **अब, आप अपने सभी Razorpay और Role Management फ़ंक्शन्स को यहाँ नीचे जोड़ सकते हैं।**

