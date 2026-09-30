# 📸 24-Hour Story

A modern and interactive **24-Hour Story web application** built using **HTML, CSS, and JavaScript**.

The project allows users to create and view temporary stories containing images and text. Each story is designed to automatically expire after **24 hours**, similar to story features found in modern social media applications.

---

## 🚀 Project Overview

The **24-Hour Story** project demonstrates how frontend technologies can be used to build an interactive story-sharing interface.

Users can:

* Add a new story
* View stories in fullscreen
* Navigate between stories
* Track story progress
* Pause and resume stories
* See when a story was created
* Automatically remove stories after 24 hours
* Use the application on desktop and mobile devices

---

## ✨ Features

### 📱 Responsive Design

Works across:

* Desktop
* Laptop
* Tablet
* Mobile

### ⏱️ 24-Hour Expiration

Stories are automatically removed after 24 hours.

### ▶️ Automatic Story Playback

Stories automatically move to the next story after a few seconds.

### ⏸️ Pause & Resume

Users can pause a story and continue viewing it later.

### ⬅️ Previous / Next Navigation

Users can manually move between stories.

### 👁️ Story Viewed Status

Viewed and unviewed stories are visually differentiated.

### ➕ Add Story

Users can create a new story with:

* Name
* Image URL
* Story text
* Background color

### ⌨️ Keyboard Controls

| Key     | Action         |
| ------- | -------------- |
| `→`     | Next story     |
| `←`     | Previous story |
| `Space` | Pause / Resume |
| `Esc`   | Close story    |

---

## 🛠️ Technologies Used

* **HTML5** – Structure of the application
* **CSS3** – Styling, animations, responsive design
* **JavaScript** – Story functionality and interactions
* **DOM Manipulation** – Dynamic story rendering
* **JavaScript Timers** – Story progress and expiration
* **Responsive CSS** – Mobile-friendly interface

---

## 📂 Project Structure

```text
24-hour-story/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## ⚙️ How to Run

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the project

```bash
cd 24-hour-story
```

### 3. Run the application

Open:

```text
index.html
```

in your browser.

You can also use **VS Code + Live Server**.

---

## 🎯 How It Works

The application stores story information using JavaScript objects.

Example:

```javascript
{
    id: 1,
    name: "Alex",
    image: "image-url",
    text: "My story",
    createdAt: Date.now(),
    viewed: false
}
```

The application compares the story's creation time with the current time.

If the story is older than **24 hours**, it is removed from the active story list.

---

## 🧠 Concepts Demonstrated

* HTML semantic structure
* CSS Flexbox
* CSS responsive design
* CSS gradients
* CSS animations and transitions
* JavaScript arrays and objects
* Functions
* Event listeners
* DOM manipulation
* Timers
* Date and time calculations
* Modal components
* Keyboard events
* Touch events
* Dynamic UI rendering
* Frontend state management

---

## 🔮 Future Improvements

* 🔐 User authentication
* ☁️ Cloud image uploads
* 🗄️ Database integration
* 👥 Multiple users
* ❤️ Story reactions
* 💬 Story replies
* 👁️ Story viewer count
* 🎥 Video stories
* 🔔 Notifications
* 🌐 Backend API
* 💾 Persistent story storage
* 🔒 User privacy controls

---

## 📌 Current Limitation

This version is a **frontend-only project**.

Stories are managed using JavaScript in the browser. A production version would require a backend, database, authentication, and cloud storage to permanently manage users and stories across different devices.

---

## 💼 Skills Demonstrated

```text
HTML5
CSS3
JavaScript
Responsive Web Design
DOM Manipulation
Event Handling
Frontend Development
UI/UX Design
Date & Time Handling
Interactive Web Applications
```

---

## 👨‍💻 Author

**Naga Durga Lakshmi Metti**

GitHub:
`https://github.com/NagaDurgaM`

LinkedIn:
`https://www.linkedin.com/in/nagadurgalakshmimetti/`

---

## ⭐ Support

If you found this project useful, consider giving the repository a ⭐ on GitHub.
