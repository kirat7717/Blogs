import stripe from "../configs/stripe.config.js";
import Blog from "../models/blog.model.js";
import Payment from "../models/payment.model.js";
import { createPaymentIntentSchema } from "../validation/payment.validation.js";

export const createPayment = async (req, res) => {
  try {
    const { error, value } = createPaymentIntentSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { blogId } = value;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    // Check whether blog requires payment
    if (!blog.isPaid) {
      return res.status(400).json({
        success: false,
        message: "This blog is free. Payment is not required.",
      });
    }

    // Get price from database
    const amount = blog.price * 100;

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
    });

    // Create payment record in MongoDB
    const payment = await Payment.create({
      userId: req.user._id,
      blogId: blog._id,
      amount: blog.price,
      currency: "inr",
      stripePaymentIntentId: paymentIntent.id,
      status: "pending",
    });

    return res.status(200).json({
      success: true,
      message: "Payment initiated successfully.",
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        status: paymentIntent.status,
        amount: blog.price,
      },
    });
  } catch (error) {
    console.error("Create PaymentIntent Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating payment.",
    });
  }
};

export const handleStripeWebhook = async (req, res) => {
  try {
    const signature = req.headers["stripe-signature"];
    console.log("signature->",signature);
    
    const event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
     
     console.log("event obj" , event.data.object);
     
    if (event.type === "payment_intent.succeeded") {
      console.log("Payment succeeded!");
    }

    return res.status(200).json({
      success: true,
      message: "Webhook received",
    });
  } catch (error) {
    console.error("Stripe Webhook Error:", error);

    return res.status(400).json({
      success: false,
      message: "Invalid webhook",
    });
  }
};
