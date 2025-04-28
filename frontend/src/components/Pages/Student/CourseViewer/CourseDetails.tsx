import { Course } from "../../../../types/course.types";
import { timeAgo } from "../../../../utils/dateFormat";
import RatingStars from "../../../Course/RatingStars";
import TagList from "../../../Course/TagList";

interface Props {
  course: Course;
}

const CourseDetails: React.FC<Props> = ({ course }) => {
  return (
    <div className="space-y-3">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p className="text-sm text-muted">{course.description}</p>
      <TagList tags={course.tags}/>
      <div className="text-sm text-muted">
        <RatingStars ratings={course.ratings} />
        <p className="text-sm text-text">
          Last Updated:{" "}
          <span className="font-medium">{timeAgo(course.updatedAt!)}</span>
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2 text-text">
          What You Will Learn
        </h2>
        <div className="bg-card border border-card-border px-4 py-2 rounded-lg">
          <div
            className="text-text space-y-2 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: course.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
