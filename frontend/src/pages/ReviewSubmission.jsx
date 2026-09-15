import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ReviewSubmission = () => {
  const { submissionId } = useParams();
  const location = useLocation(); //get the submission data passed from AssSub page
  const navigate = useNavigate();
  const submission = location.state?.submission;
  const maxScore = location.state?.maxScore;
  const [score, setScore] = useState(
    submission?.score !== null ? submission.score : "",
  );
  const [feedback, setFeedback] = useState(submission?.feedback || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (score === "") {
      setError("Please enter a score.");
      return;
    }

    const numericScore = Number(score);

    if (numericScore < 0 || numericScore > maxScore) {
      setError(`Score must be between 0 and ${maxScore}.`);
      return;
    }

    try {
      setSaving(true);
      setError(null);
      await axios.patch(`/api/submissions/${submissionId}`, {
        score: numericScore,
        feedback: feedback.trim(),
      });
      navigate(-1); //back to prev page (AssignmentSubmissions.jsx)
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred while saving the grade.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="review-submission-page">
      <h1>Review Submission</h1>
      <div className="submission-content">
        <h2>{submission.student?.name || "Student"}</h2>
        {submission.student?.email && <p>{submission.student.email}</p>}
        <p>
          <strong>Answer:</strong>
        </p>
        <p>{submission.answer}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="score">Score</label>
          <input
            id="score"
            type="number"
            min="0"
            max={maxScore}
            value={score}
            onChange={(event) => setScore(event.target.value)}
            required
          />
          <p>Maximum score: {maxScore}</p>
        </div>
        <div>
          <label htmlFor="feedback">Feedback</label>
          <textarea
            id="feedback"
            rows="6"
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
            placeholder="Write feedback for the student..."
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Grade"}
        </button>
      </form>
    </div>
  );
};

export default ReviewSubmission;
