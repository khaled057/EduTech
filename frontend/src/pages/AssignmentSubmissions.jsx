import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const AssignmentSubmissions = () => {
    const { assignmentId } = useParams();
    const [assignment, setAssignment] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                setLoading(true);
                setError(null);
                const [assignmentResponse, submissionsResponse] =
                    await Promise.all([//2 independent req both can start at the same time
                        axios.get(`/api/assignments/${assignmentId}`),
                        axios.get(
                            `/api/assignments/${assignmentId}/submissions`
                        ),
                    ]);
                setAssignment(assignmentResponse.data.assignment);
                setSubmissions(
                    submissionsResponse.data.submissions || []
                );
            } 
            catch (error) {
                setError(error.response?.data?.message ||"An error occurred while loading submissions.");
            } 
            finally {
                setLoading(false);
            }
        };
        fetchSubmissions();
    }, [assignmentId]);

    if (loading) {
        return (
            <div className="assignment-submissions-page">
                <h1>Assignment Submissions</h1>
                <p>Loading submissions...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="assignment-submissions-page">
                <h1>Assignment Submissions</h1>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="assignment-submissions-page">
            <h1>
                {assignment?.title || "Assignment"} - Submissions
            </h1>
            {submissions.length === 0 ? (
                <p>No students have submitted this assignment yet.</p>
            ) : (
                <div className="submissions-list">
                    {submissions.map((submission) => (
                        <div
                            key={submission._id}
                            className="submission-card"
                        >
                            <h2>
                                {submission.student?.name || "Unknown Student"}
                            </h2>
                            {submission.student?.email && (
                                <p>{submission.student.email}</p>
                            )}
                            <div>
                                <strong>Answer:</strong>
                                <p>{submission.answer}</p>
                            </div>
                            {submission.score !== null && (
                                    <p>
                                        <strong>Score:</strong>{" "}
                                        {submission.score} /{" "}
                                        {assignment?.maxScore}
                                    </p>
                                )}
                            {submission.feedback && (
                                <p>
                                    <strong>Feedback:</strong>{" "}
                                    {submission.feedback}
                                </p>
                            )}
                            <Link
                                to={`/instructor/submissions/${submission._id}/review`}
                                state={{//pass data to review page
                                    submission,
                                    maxScore: assignment?.maxScore,
                                }}
                            >
                            Review Submission
                        </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AssignmentSubmissions;