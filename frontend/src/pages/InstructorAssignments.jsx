import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const InstructorAssignments = () => {
    const { courseId } = useParams();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(`/api/courses/${courseId}/assignments`);
                setAssignments(response.data.assignments || []);
            } 
            catch (error) {
                setError(error.response?.data?.message ||"An error occurred while loading assignments.",);
            } 
            finally {
                setLoading(false);
            }
        };
        fetchAssignments();
    }, [courseId]);

    if (loading) {
        return (
            <div className="instructor-assignments-page">
                <h1>Course Assignments</h1>
                <p>Loading assignments...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="instructor-assignments-page">
                <h1>Course Assignments</h1>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="instructor-assignments-page">
            <h1>Course Assignments</h1>
            <Link to={`/instructor/courses/${courseId}/assignments/create`}>
                Create Assignment
            </Link>
            {assignments.length === 0 ? (
                <p>No assignments available for this course.</p>
            ) : (
                <div className="instructor-assignments-list">
                    {assignments.map((assignment) => (
                        <div key={assignment._id}>
                            <h2>{assignment.title}</h2>
                            {assignment.description && <p>{assignment.description}</p>}
                            {assignment.lesson?.title && (
                                <p>
                                    <strong>Lesson:</strong> {assignment.lesson.title}
                                </p>
                            )}
                            {assignment.dueDate && (
                                <p>
                                    <strong>Due:</strong>{" "}
                                    {new Date(assignment.dueDate).toLocaleDateString()}
                                </p>
                            )}
                            <p><strong>Max Score:</strong> {assignment.maxScore}</p>
                            <Link
                                to={`/instructor/assignments/${assignment._id}/submissions`}
                            >
                                View Submissions
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InstructorAssignments;