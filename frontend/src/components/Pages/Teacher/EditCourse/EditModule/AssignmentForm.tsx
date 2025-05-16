// components/AssignmentForm.tsx
import React from 'react';
import Input from '../../../../Reusable/Input';
import { Assignment } from '../../../../../types/course.types';

interface Props {
  assignment?: Assignment;
  onChange: (assignment: Assignment) => void;
}

const AssignmentForm: React.FC<Props> = ({
  assignment = { title: '', description: '' },
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <Input
        label="Title"
        value={assignment.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...assignment, title: e.target.value })}
      />
      <Input
        label="Description"
        value={assignment.description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...assignment, description: e.target.value })}
      />
    </div>
  );
};

export default AssignmentForm;
