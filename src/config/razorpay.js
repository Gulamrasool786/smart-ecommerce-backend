import Razorpay from "razorpay";

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

let razorpay = null;

if (keyId && keySecret) {
  razorpay = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });

  console.log("Razorpay Loaded: YES");
} else {
  console.log("Razorpay Loaded: NO - keys missing");
}

export default razorpay;