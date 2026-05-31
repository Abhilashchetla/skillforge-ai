# SkillForge AI - AI Quiz Generator

SkillForge AI is a full-stack AI-powered quiz generation platform that creates multiple-choice quizzes dynamically based on user-selected topics, difficulty levels, and question counts.

## Features

- User Registration and Login Authentication
- AI-Powered Quiz Generation
- Topic-Based Quiz Creation
- Difficulty Selection (Easy, Medium, Hard)
- Custom Number of Questions
- One Question Per Page Navigation
- Score Calculation and Results
- Responsive User Interface
- Secure API Key Management using Environment Variables

## Tech Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Axios

### Backend
- Python
- Django
- Django REST Framework (DRF)

### Database
- SQLite

### AI Integration
- OpenAI API
- OpenRouter API

### Tools
- Git
- GitHub
- Postman
- VS Code

## Project Workflow

1. User registers an account.
2. User logs in.
3. User selects:
   - Topic
   - Difficulty
   - Number of Questions
4. AI generates quiz questions.
5. User answers questions.
6. System calculates score.
7. Final result is displayed.

## Installation

### Clone Repository

```bash
git clone https://github.com/Abhilashchetla/skillforge-ai.git
cd skillforge-ai
```

### Backend Setup

```bash
cd backendpro

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

### Frontend Setup

```bash
cd frontendpro

npm install

npm start
```

## Environment Variables

Create a `.env` file in the project root:

```env
OPENAI_API_KEY=YOUR_API_KEY
```

## Future Enhancements

- Quiz History
- Leaderboard
- Timer-Based Quiz
- Certificate Generation
- Admin Dashboard
- PDF Export

## Author

Abhilash Chetla

GitHub:
https://github.com/Abhilashchetla