import { useEffect, useState } from "react";
import { TeacherService } from "../../../../service/teacherService";
import Button from "../../../Reusable/Button";
import { FaStripe, FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";
import { AiOutlineWarning } from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";
import { Loader } from "../../../../assets/Loader";

const StripeAccountManager = () => {
  const [status, setStatus] = useState<string>("loading");
  const [reason, setReason] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const response = await TeacherService.getStripeStatus();
      setStatus(response.data.status);
      setReason(response.data.reason || null);
    } catch (error) {
      alert("Failed to fetch Stripe status");
    } finally {
      setLoading(false);
    }
  };

  const handleOnboard = async () => {
    try {
      const response = await TeacherService.createStripeAccount();
      window.location.href = response.data.url;
    } catch (err) {
      alert("Failed to onboard with Stripe");
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const renderStatus = () => {
    switch (status) {
      case "loading":
        return (
          <div className="flex items-center space-x-3">
            <Loader className="text-info" />
            <p className="text-info">Checking your Stripe status...</p>
          </div>
        );

      case "not_connected":
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-warning">
              <FaStripe size={24} />
              <p>You have not connected your Stripe account yet.</p>
            </div>
            <Button onClick={handleOnboard} variant="primary">
              Connect Now
            </Button>
          </div>
        );

      case "pending":
        return (
          <div className="space-y-4">
            <div className="flex items-start space-x-2 text-warning">
              <AiOutlineWarning size={24} />
              <p>Your account setup is still pending. <br /><span className="text-sm">Reason: {reason}</span></p>
            </div>
            <Button onClick={handleOnboard} variant="warning">
              Complete Setup
            </Button>
          </div>
        );

      case "restricted":
        return (
          <div className="space-y-4">
            <div className="flex items-start space-x-2 text-error">
              <RiErrorWarningFill size={24} />
              <p>Your Stripe account is restricted. <br /><span className="text-sm">Reason: {reason}</span></p>
            </div>
            <Button onClick={handleOnboard} variant="danger">
              Fix Account
            </Button>
          </div>
        );

      case "complete":
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-success font-semibold">
              <FaCheckCircle size={24} />
              <p>Your Stripe account is fully connected and ready!</p>
            </div>
            <a
              href="https://dashboard.stripe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-link hover:text-link-hover underline"
            >
              Go to Stripe Dashboard
            </a>
          </div>
        );

      default:
        return (
          <div className="text-error flex items-center space-x-2">
            <FaTimesCircle size={20} />
            <p>Unknown Stripe status.</p>
          </div>
        );
    }
  };

  return (
    <div className="mt-20 p-6 bg-card rounded-xl border border-card-border text-text max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaStripe className="text-primary" />
        Stripe Account Manager
      </h2>
      {loading ? (
        <div className="flex items-center space-x-2">
          <FaSpinner className="animate-spin text-info" />
          <p className="text-info">Loading...</p>
        </div>
      ) : (
        renderStatus()
      )}
    </div>
  );
};

export default StripeAccountManager;
