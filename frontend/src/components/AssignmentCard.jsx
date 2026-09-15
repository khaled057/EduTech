import { Link } from "react-router-dom";
import "./AssignmentCard.css";

const AssignmentCard = ({ assignment, courseId }) => {
    return (
        <div className="assignment-card">
            <div className="assignment-card-content">
                <h3 className="assignment-title">{assignment.title}</h3>
                {assignment.description && (
                    <p className="assignment-description">{assignment.description}</p>
                )}
                <div className="assignment-meta">
                    {assignment.lesson?.title && (
                        <span>Lesson: {assignment.lesson.title}</span>
                    )}
                    {assignment.dueDate && (
                        <span>
                            Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </span>
                    )}
                    <span>Max Score: {assignment.maxScore}</span>
                </div>
                <Link
                    to={`/learning/${courseId}/assignments/${assignment._id}`}
                    className="assignment-view-btn"
                >
                    View Assignment
                </Link>
            </div>
        </div>
    );
};

export default AssignmentCard;
