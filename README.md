# 🎭 Sentio AI – Frontend

A modern, responsive frontend for **Sentio AI**, a deep learning-based system that detects human emotions from facial images.

---

## 🚀 Features

- 📤 Upload facial images
- 🧠 Real-time emotion prediction via API
- 🖼️ Image preview before submission
- 🎯 Clean modal displaying predicted emotion
- 🌙 Dark/light theme support
- ⚡ Fast and responsive UI

---

## 🧩 Tech Stack

- Next.js / React
- NextUI
- Tailwind CSS
- Axios
- FontAwesome Icons

---

## 🔗 Backend Integration

The frontend connects to a Flask-based API endpoint:

```
http://127.0.0.1:5000/predict
```

### Expected API Response

```json
{
  "emotion": "Happy"
}
```

---

## 🖥️ How It Works

1. Upload a facial image
2. Click **Analyze Emotion**
3. Image is sent to backend API
4. Model predicts emotion
5. Result is displayed in a modal

---

## 📁 Project Structure

```
frontend/
│── public/
│── components/
│── pages/
│── styles/
│── package.json
│── README.md
```

---

## ⚙️ Installation & Run

```bash

# Clone repository

git clone https://github.com/your-username/sentio-ai-frontend.git

# Navigate to project

cd sentio-ai-frontend

# Install dependencies

npm install

# Run development server

npm run dev
```

---

## 🌐 Deployment

You can deploy this frontend using:

- Vercel (Recommended)
- Netlify

⚠️ Make sure to update API URL in code before deployment:

```ts
http://127.0.0.1:5000/predict
```

➡️ Replace with your backend URL:

```ts
https://your-backend-url/predict
```

---

## 🧠 Project Context

This frontend is part of a **Full-Stack Deep Learning System**:

- CNN Model (ResNet50)
- Flask Backend API
- Docker Deployment (planned)

---

## 📌 Future Improvements

- Real-time webcam emotion detection
- Multi-face detection
- Emotion probability visualization
- Cloud deployment

---

## 👨‍💻 Author

Developed as part of a course-based project focused on building end-to-end AI systems.

---
