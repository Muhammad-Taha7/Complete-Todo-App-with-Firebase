# Firebase Todo App

A simple React Todo application integrated with **Firebase Realtime Database**.  
This project allows you to add, fetch, and delete tasks with a title, priority, timestamp, and status (done/undo).

---

## 🚀 Features
- Add tasks with priority (High, Medium, Low).
- Save tasks to **Firebase Realtime Database**.
- Fetch all tasks from Firebase on page load.
- Delete tasks from Firebase in real time.
- Mark tasks as **Done/Undo** (local update).

---

## 🛠️ Technologies Used
- React (Hooks: useState, useEffect)
- Firebase Realtime Database (REST API)
- Tailwind CSS (for styling)

---

## ⚡ How to Run
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/firebase-todo.git
Navigate to project folder:

bash
Copy code
cd firebase-todo
Install dependencies:

bash
Copy code
npm install
Start development server:

bash
Copy code
npm run dev
Open browser at http://localhost:5173/

🔑 Firebase Setup
Create a Firebase project at Firebase Console.

Enable Realtime Database and set rules to:

json
Copy code
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
Copy your database URL and replace it inside App.js:

js
Copy code
const firebaseUrl = "https://your-app-id-default-rtdb.firebaseio.com/tasks"
✅ Future Improvements
Update "Done/Undo" status directly in Firebase.

Add Edit feature for tasks.

User Authentication with Firebase Auth.

📸 Screenshot
(Add screenshot of your Todo UI here)

👨‍💻 Author
Developed with ❤️ by Taha
