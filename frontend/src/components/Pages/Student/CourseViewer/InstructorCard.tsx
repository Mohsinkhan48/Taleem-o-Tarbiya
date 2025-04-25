import { User } from "../../../../types/auth.types";

interface Props {
  instructor: User;
}

const InstructorCard: React.FC<Props> = ({ instructor }) => {
  return (
    <div className="border border-border rounded-lg p-4 bg-card shadow-sm">
      <h2 className="font-semibold text-lg mb-2">Instructor</h2>
      <div className="flex items-center space-x-4">
        <div>
          <p className="font-medium">{instructor.fullName}</p>
          <p className="text-sm text-muted">{instructor.email}</p>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
