# 💼 Resume System – Frontend Development Trial Task

This project was developed as part of the **Resume System Trial Task** — a challenge to build a modern, functional resume-building interface that aligns with the vision of a next-generation **Career & Resume Ecosystem**.

---

## 🎯 Task Objective

The goal of this trial was to design and implement one **core component** of the larger Resume System ecosystem.

I chose the **Frontend Development** category, which focuses on creating a **modern Resume Preview & Customization UI** using **React.js** and **Tailwind CSS**.

---

## 🧠 Project Overview

The Resume System is designed to dynamically generate and update a user's professional resume based on their real-world achievements from:

- Internships & Training Platforms  
- Hackathon Platforms  
- Online Learning & Course Platforms  
- Project & Skill Verification Modules  

Each user activity in the ecosystem automatically updates their professional resume in real-time.

---

## 🧩 My Implementation — Frontend Resume Builder (React + Tailwind)

This implementation demonstrates the **Resume Preview & Customization** interface that would serve as a key frontend component of the Resume System.

### ✨ Key Features

- 🎨 **Modern UI/UX:** Built using **React 19** and **Tailwind CSS** for a clean, responsive design.  
- 🧾 **Live Resume Editing:** Real-time preview updates as users enter details.  
- 📄 **Smart Import Support:** Import `.json`, `.pdf`, or `.docx` resumes.  
  - Automatically extracts **Name, Title, Email, Website, Summary, Work, Project, and Skills**.  
- 💾 **Local Save & Load:** Uses `localStorage` to preserve user data.  
- 🖨️ **Print & Export:** Generates a **PDF-ready preview** of the right-side resume section only.  
- ⚙️ **Dynamic Sections:** Users can add, rename, and remove custom sections easily.

---

## 🏗️ Tech Stack

| Technology | Purpose |
|-------------|----------|
| **React 18 + Vite** | Core frontend framework |
| **Tailwind CSS** | Styling and layout |
| **pdfjs-dist** | Extract text from PDF resumes |
| **mammoth.js** | Convert Word (.docx) files to text |
| **jsPDF** | Print/export functionality |
| **LocalStorage API** | Persist resume data locally |