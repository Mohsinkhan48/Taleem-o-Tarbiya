// components/AssignmentForm.tsx
import React from 'react';
import Input from '../../../Reusable/Input';
import Card from '../../../Reusable/Card';
import { Assignment } from '../../../../types/course.types';

interface Props {
  assignment?: Assignment;
  onChange: (assignment: Assignment) => void;
}

const AssignmentForm: React.FC<Props> = ({
  assignment = { title: '', description: '', dueDate: '', submissionType: 'file' },
  onChange,
}) => {
  return (
    <Card className="mt-4 border-t pt-4">
      <h4 className="text-lg font-semibold mb-2">Assignment</h4>
      <div className='grid grid-cols-2 gap-4'>
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
      <Input
        label="Due Date"
        type="date"
        value={assignment.dueDate?.split('T')[0]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...assignment, dueDate: e.target.value })}
      />
      <Input
        label="Submission Type"
        value={assignment.submissionType}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...assignment, submissionType: e.target.value })}
      />
      </div>
    </Card>
  );
};

export default AssignmentForm;
