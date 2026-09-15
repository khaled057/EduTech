import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CreateAssignment = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [lessons, setLessons] = useState([]);
    const [loadingLessons, setLoadingLessons] = useState(true);
    const [formData, setFormData] = useState({
        lesson: "",
        title: "",
        description: "",
        dueDate: "",
        maxScore: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await axios.get(
                    `/api/courses/${courseId}/lessons`
                );
                const chapters = response.data.chapters || [];
                const courseLessons = chapters.flatMap(//all lessons in one array
                    (chapter) => chapter.lessons || []
                );
                setLessons(courseLessons);
            } 
            catch (error) {
                setError(error.response?.data?.message ||"An error occurred while loading lessons.");
            } 
            finally {
                setLoadingLessons(false);
            }
        };
        fetchLessons();
    }, [courseId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setSubmitting(true);
            setError(null);
            await axios.post(`/api/courses/${courseId}/assignments`, {
                lesson: formData.lesson,
                title: formData.title.trim(),
                description: formData.description.trim(),
                dueDate: formData.dueDate,
                maxScore: Number(formData.maxScore),
            });
            navigate(`/instructor/courses/${courseId}/assignments`);
        } 
        catch (error) {
            setError(error.response?.data?.message ||"An error occurred while creating the assignment.");
        } 
        finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="create-assignment-page">
            <h1>Create Assignment</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="6"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lesson">Lesson</label>
                    {loadingLessons ? (
                        <p>Loading lessons...</p>
                    ) : (
                        <select
                            id="lesson"
                            name="lesson"
                            value={formData.lesson}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a lesson</option>
                            {lessons.map((lesson) => (
                                <option key={lesson._id} value={lesson._id}>
                                    {lesson.title}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                <div>
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                        id="dueDate"
                        name="dueDate"
                        type="datetime-local"
                        value={formData.dueDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="maxScore">Maximum Score</label>
                    <input
                        id="maxScore"
                        name="maxScore"
                        type="number"
                        min="1"
                        value={formData.maxScore}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={submitting}>
                    {submitting ? "Creating..." : "Create Assignment"}
                </button>
            </form>
        </div>
    );
};

export default CreateAssignment;