# 📝 IntegriTest

### **Your Secure and Focused Online Quiz Platform**

IntegriTest is a **full-stack web application** designed for educators who need a **reliable, secure, and integrity-focused** platform to conduct online quizzes.
It minimizes cheating and distractions, offering a **focused testing environment** for students.

This project is **open-source** and welcomes contributions — especially for **Hacktoberfest 2025! 🎉**

---

## ✨ Key Features

### 👩‍🏫 For Teachers

* **Secure Authentication** – Sign up and log in to a personal dashboard.
* **Quiz Dashboard** – Create, view, edit, and delete quizzes easily.
* **Dynamic Quiz Creator**

  * Add titles, instructions, and duration-based time limits.
  * Include multiple-choice questions with designated correct answers.
* **Scheduled Quizzes** – Set specific start and end times for access control.
* **Anti-Cheating Controls** – Teachers can enable **tab-switch prevention** and **screenshot blocking** to maintain academic integrity during the quiz.
* **Result Analytics** – View submissions, scores, and detailed performance breakdowns.

### 🧑‍🎓 For Students

* **No Account Needed** – Join instantly via a quiz link.
* **Focused UI** – Minimal and distraction-free interface showing one question at a time.
* **Live Countdown Timer** – Auto-submits upon timeout.
* **Instant Feedback** – View score and correct answers right after submission.

---

## 🛡️ Security & Integrity Features

* **Tab Switch Detection** – The quiz automatically submits if a student switches tabs or minimizes the browser window. Teachers are instantly notified of the event.
* **Screenshot Protection** – When a student attempts to take a screenshot, the screen automatically turns black to prevent quiz content from being captured.
* **Content Protection** – Right-clicking, text selection, and copy-paste actions are disabled during the quiz to prevent cheating and content theft.

---

## 💻 Technology Stack

| Layer              | Technology                                         |
| ------------------ | -------------------------------------------------- |
| **Frontend**       | React (with React Router & Context API or Zustand) |
| **Backend**        | Node.js + Express.js                               |
| **Database**       | PostgreSQL or MySQL                                |
| **Authentication** | JSON Web Tokens (JWT)                              |
| **Styling**        | Tailwind CSS (or your preferred framework)         |

---

## 🚀 Getting Started

Follow these instructions to run the project locally for development and testing.

### 🧩 Prerequisites

* [Node.js](https://nodejs.org/) and npm (or yarn)
* [PostgreSQL](https://www.postgresql.org/) (or another SQL database)

---

### ⚙️ Installation

#### 1️⃣ Clone the repository

```bash
https://github.com/Student-Chapter-CSE/IntegriTest.git
cd integritest
```

#### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file (copy from `.env.example`) and fill in:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/integritest"
PORT=5000
JWT_SECRET="your_super_secret_key"
```

Run migrations if applicable, then start the backend:

```bash
npm run dev
```

#### 3️⃣ Frontend Setup

```bash
cd ../client
npm install
npm start
```

Now open:
👉 **[http://localhost:3000](http://localhost:3000)**

---

<details>
<summary>📂 API Endpoints Overview</summary>

| Method     | Endpoint                        | Description                                 |
| ---------- | ------------------------------- | ------------------------------------------- |
| **POST**   | `/api/auth/register`            | Register a new teacher                      |
| **POST**   | `/api/auth/login`               | Log in a teacher & receive JWT              |
| **GET**    | `/api/quizzes`                  | Fetch all quizzes for the logged-in teacher |
| **POST**   | `/api/quizzes`                  | Create a new quiz                           |
| **GET**    | `/api/quizzes/:id`              | Fetch details of a single quiz              |
| **PUT**    | `/api/quizzes/:id`              | Update a quiz                               |
| **DELETE** | `/api/quizzes/:id`              | Delete a quiz                               |
| **GET**    | `/api/session/:quizUrlId`       | Fetch quiz details for a student            |
| **POST**   | `/api/submissions`              | Submit student answers & calculate score    |
| **GET**    | `/api/submissions/quiz/:quizId` | View all submissions for a quiz             |

</details>

---

## 🙌 How to Contribute

We ❤️ contributions! Whether it’s fixing a bug, improving documentation, or adding new features — every bit helps!

1. **Fork** the repository
2. **Create a new branch**

   ```bash
   git checkout -b your_branch_name
   ```
3. **Commit your changes**

   ```bash
   git commit -m "Add AmazingFeature"
   ```
4. **Push to your branch**

   ```bash
   git push origin your_branch_name
   ```
5. **Open a Pull Request**

💡 Check issues tagged with `good first issue` or `hacktoberfest` to get started!

---


## 💬 Connect

💻 GitHub: [Students' Chapter CSE AOT](https://github.com/Student-Chapter-CSE)
🌐 Project Repo: [IntegriTest](https://github.com/Student-Chapter-CSE/integritest)

---
