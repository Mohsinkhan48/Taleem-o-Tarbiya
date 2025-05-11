import { TeacherService } from "../../../../service/teacherService";
import Button from "../../../Reusable/Button";

const StripeReauth = () => {
  const retryOnboarding = async () => {
    const res = await TeacherService.createStripeAccount()
    window.location.href = res.data.url;
  };

  return (
    <div className="text-center p-4">
      <h2 className="text-xl font-semibold mb-2">Stripe Onboarding Incomplete</h2>
      <p className="mb-4">You didn't finish setting up your Stripe account. Please try again.</p>
      <Button onClick={retryOnboarding} variant="primary">
        Retry Onboarding
      </Button>
    </div>
  );
};

export default StripeReauth;
