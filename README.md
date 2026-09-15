# EduTech — Project Documentation

## 1. Project Overview

**EduTech** is a full-stack learning platform designed to connect students with educational courses and learning resources.

The platform provides a student-focused learning experience together with instructor functionality for managing courses and assignments.

## 2. Objectives

The main objectives of EduTech are to:

* Provide an organized online learning environment.
* Allow students to browse and enroll in courses.
* Provide access to educational content.
* Allow students to complete and submit assignments.
* Allow instructors to manage learning content and submissions.
* Demonstrate collaborative full-stack development.

## 3. Technology Stack

### Frontend

* React
* JavaScript
* HTML/CSS

### Backend

* Node.js
* Express.js
* REST API

### Database

* MongoDB
* Mongoose

### Development

* Git
* GitHub
* Postman

## 4. System Architecture

EduTech follows a client-server architecture:

```text
┌─────────────────────┐
│   React Frontend    │
└──────────┬──────────┘
           │ HTTP / REST API
           ▼
┌─────────────────────┐
│  Express Backend    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      Mongoose       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      MongoDB        │
└─────────────────────┘
```

## 5. Project Structure

```text
EduTech/
│
├── backend/
│   └── src/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│   └── server.js 
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── features/
│       ├── services/
│       └── routes/
│
├── .gitignore
├── LICENSE
└── README.md
```

## 6. Main Features

### Authentication

* User registration
* Login and logout
* Authentication state
* Protected functionality
* Role-based access

### Courses

* Browse courses
* Search and filter courses
* View course information
* Instructor information
* Course management
* Course enrollment

### Assignments

* Create assignments
* Submit assignments
* View submissions
* Grade submissions
* Provide feedback

## 7. User Roles

### Student

Students can:

* Register and log in.
* Browse courses.
* Enroll in courses.
* Access enrolled content.
* Complete assignments.
* Submit answers.
* View grades and feedback.

### Instructor

Instructors can:

* Manage their courses.
* Create and manage assignments.
* View student submissions.
* Grade assignments.
* Provide feedback.

## 8. Backend

The backend is built with Node.js and Express.

The backend follows a basic separation of responsibilities:

```text
Routes
  ↓
Middleware
  ↓
Controllers
  ↓
Models
  ↓
MongoDB
```

### Models

The project includes models for the main learning-platform resources, including:

* User
* Course
* Enrollment
* Assignment
* Assignment Submission

### API

The API is organized using RESTful endpoints under the `/api/v1` namespace.

Examples:

```text
POST /api/auth/register
POST /api/auth/login

GET  /api/courses
GET  /api/courses/:courseId

POST /api/courses/:courseId/enroll
GET  /api/enrollments/me

POST /api/courses/:courseId/assignments
GET  /api/courses/:courseId/assignments

POST /api/assignments/:assignmentId/submissions
GET  /api/assignments/:assignmentId/submissions/me
```

## 9. Database Relationships

The main relationships are:

```text
User
 │
 ├────────── Course
 │             │
 │             └──── Assignment
 │                       │
 │                       └──── AssignmentSubmission
 │
 └────────── Enrollment ───── Course
```

An enrollment connects a student to a course.

An assignment belongs to a course.

An assignment submission connects a student to an assignment.

## 10. Authorization

The system uses authentication and role-based authorization to restrict functionality.

For example:

* Students can enroll in courses and submit assignments.
* Instructors can manage assignments.
* Students cannot perform instructor-only management operations.

The backend also checks ownership where necessary, such as ensuring an instructor manages assignments belonging to their own course.

## 11. Development Workflow

The project was developed collaboratively using Git and GitHub.

The general workflow was:

```text
Task
 ↓
Feature Branch
 ↓
Development
 ↓
Testing
 ↓
Pull Request
 ↓
Review
 ↓
Merge
```

This allowed the team to work on different features independently while maintaining a shared codebase.

## 12. Team Contributions

| Member       | Contribution                         |
| ------------ | ------------------------------------ |
| **Hazem Emam** | Authentication & users & Courses (Backend)   |
| **Arwa Abdullah** | Lessons & enrollment UI (Frontend)        | 
| **Anas Ashraf** | Admin Users & Admin Dashboard + Courses (Frontend)        |
| **Youssef Mahmoud** | Authentication UI (Frontend)            |
| **Khaled Mohamed** | Enrollment and Assignments Features (Backend) & Github repo maintainer |
| **Ahmed Islam** | Assignments UI (Frontend) |
| **Youssef Wael** | Shared UI / Form Components & Courses UI (Frontend) |


## 13. Conclusion

EduTech demonstrates the development of a complete full-stack learning platform using React, Node.js, Express, and MongoDB.

The project combines authentication, course management, enrollment, assignments, submissions and authorization into one collaborative application.

GitHub Repo URL: https://github.com/khaled057/EduTech
