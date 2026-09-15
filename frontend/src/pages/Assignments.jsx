import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AssignmentCard from "../components/AssignmentCard";

const Assignments = () => {
    const { courseId } = useParams();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(
                    `/api/courses/${courseId}/assignments`
                );
                setAssignments(response.data.assignments || []);
            } 
            catch (error) {
                setError(error.response?.data?.message ||"An error occurred while loading assignments.");
            } 
            finally {
                setLoading(false);
            }
        };
        fetchAssignments();
    }, [courseId]);

    if (loading) {
        return (
            <div className="assignments-page">
                <h1>Assignments</h1>
                <p>Loading assignments...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="assignments-page">
                <h1>Assignments</h1>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="assignments-page">
            <h1>Assignments</h1>
            {assignments.length === 0 ? (
                <p>No assignments available for this course.</p>
            ) : (
                <div className="assignments-list">
                    {assignments.map((assignment) => (
                        <AssignmentCard
                            key={assignment._id}
                            assignment={assignment}
                            courseId={courseId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Assignments;