const StripeConnected = () => {
  // Optionally fetch updated user data or account verification status here

  return (
    <div className="text-center p-4 text-text">
      <h2 className="text-xl font-semibold mb-2">Stripe Connected</h2>
      <p className="mb-4">Your Stripe account has been successfully connected!</p>
      <a href="/teacher/dashboard" className="text-primary underline">Go to Dashboard</a>
    </div>
  );
};

export default StripeConnected;
