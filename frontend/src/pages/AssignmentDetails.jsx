import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AssignmentDetails = () => {
    const { assignmentId } = useParams();
    const [assignment, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [answer, setAnswer] = useState("");
    const [submission, setSubmission] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    useEffect(() => {
        const fetchAssignment = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(
                    `/api/assignments/${assignmentId}`
                );
                setAssignment(response.data.assignment);
                try {
                    const submissionResponse = await axios.get(
                        `/api/assignments/${assignmentId}/submissions/me`
                    );
                    setSubmission(submissionResponse.data.submission);
                }
                catch (submissionError) {
                    if  (submissionError.response?.status === 404) {
                        setSubmission(null);
                    }
                }
            }
            catch (error) {
                setError(error.response?.data?.message ||"An error occurred while loading the assignment.");
            }
            finally {
                setLoading(false);
            }
        };
        fetchAssignment();
    }, [assignmentId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!answer.trim()) {
            setSubmitError("Please enter your answer before submitting.");
            return;
        }
        try {
            setSubmitting(true);
            setSubmitError(null);
            const response = await axios.post(
                `/api/assignments/${assignmentId}/submissions`,
                {
                    answer: answer.trim(),
                }
            );
            setSubmission(response.data.submission);
            setAnswer("");
        }
        catch (error) {
            setSubmitError(error.response?.data?.message ||"An error occurred while submitting your assignment.");
        }
        finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="assignment-details-page">
                <h1>Assignment</h1>
                <p>Loading assignment...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="assignment-details-page">
                <h1>Assignment</h1>
                <p>{error}</p>
            </div>
        );
    }

    if (!assignment) {
        return (
            <div className="assignment-details-page">
                <h1>Assignment</h1>
                <p>Assignment not found.</p>
            </div>
        );
    }

    return (
        <div className="assignment-details-page">
            <h1>{assignment.title}</h1>
            {assignment.description && (
                <p>{assignment.description}</p>
            )}
            <div className="assignment-info">
                {assignment.lesson?.title && (
                    <p>
                        <strong>Lesson:</strong> {assignment.lesson.title}
                    </p>
                )}
                {assignment.dueDate && (
                    <p>
                        <strong>Due Date:</strong>{" "}
                        {new Date(assignment.dueDate).toLocaleDateString()}
                    </p>
                )}
                <p>
                    <strong>Maximum Score:</strong> {assignment.maxScore}
                </p>
            </div>
            {submission ? (
                <div className="submission-section">
                    <h2>Your Submission</h2>
                    <p><strong>Answer:</strong></p>
                    <p>{submission.answer}</p>
                    {submission.score !== undefined && submission.score !== null && (
                        <p>
                            <strong>Score:</strong> {submission.score} /{" "}
                            {assignment.maxScore}
                        </p>
                    )}
                    {submission.feedback && (
                        <p>
                            <strong>Feedback:</strong> {submission.feedback}
                        </p>
                    )}
                </div>
            ) : (
                <div className="submission-section">
                    <h2>Submit Your Solution</h2>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={answer}
                            onChange={(event) => setAnswer(event.target.value)}
                            placeholder="Write your solution here..."
                            rows="8"
                        />
                        {submitError && <p>{submitError}</p>}
                        <button type="submit" disabled={submitting}>
                            {submitting ? "Submitting..." : "Submit Assignment"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AssignmentDetails;
