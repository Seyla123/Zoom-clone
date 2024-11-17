# **Zoom Clone - Video Call Application**  

This is a video call application inspired by Zoom, built step-by-step using a detailed tutorial from JavaScript Mastery. It's a beginner-friendly project that introduces the latest web technologies to build a fully functional video conferencing tool.  

---

## 📋 Table of Contents  
- 🤖 [Introduction](#-introduction)  
- ⚙️ [Tech Stack](#%EF%B8%8F-tech-stack)  
- 🔋 [Features](#-features)  
- 🤸 [Quick Start](#-quick-start)  
- 🕸️ [Code Snippets](#%EF%B8%8F-code-snippets)  
- 🚀 [More Resources](#-more-resources)  

---

## 🤖 Introduction  

This application replicates Zoom's core functionality, allowing users to:  
- Securely log in.  
- Start, join, and schedule meetings.  
- Access real-time video/audio functionalities, including recording, screen sharing, and participant management.  

The project utilizes modern frameworks and tools like **Next.js**, **TypeScript**, and **Clerk** for authentication.  

For detailed guidance on building this project, check out the in-depth tutorial on [JavaScript Mastery YouTube](https://www.youtube.com/@javascriptmastery).  

If you encounter bugs or need assistance, join the [JavaScript Mastery Discord](https://discord.gg/) with over 30k members—a supportive community for developers.  

---

## ⚙️ Tech Stack  
- **Frontend Framework**: Next.js  
- **Language**: TypeScript  
- **Authentication**: Clerk  
- **Real-time Features**: getstream  
- **UI Components**: ShadCN, Tailwind CSS  

---

## 🔋 Features  

### **Core Functionalities**  
- **Authentication**: Secure login and user management using Clerk.  
- **Instant Meetings**: Start meetings immediately with adjustable camera/microphone settings.  
- **Meeting Controls**:  
  - Record meetings.  
  - Share screens.  
  - Manage participants (mute, unmute, pin, block, or allow video sharing).  
  - React with emojis during calls.  
- **Exit Options**: Leave a meeting or end it for all participants.  

### **Additional Features**  
- **Schedule Meetings**: Plan future meetings with date and time.  
- **Past Meetings**: Access metadata and recordings of previous meetings.  
- **Personal Room**: Unique link for quick meetings, shareable with others.  
- **Responsive Design**: Optimized for desktop and mobile users.  

---

## 🤸 Quick Start  

### **Prerequisites**  
Ensure the following tools are installed:  
- **Git**  
- **Node.js**  
- **npm**  

### **Setup Instructions**  

1. **Clone the Repository**:  
   ```bash  
   git clone https://github.com/adrianhajdin/zoom-clone.git  
   cd zoom-clone
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Set Up Environment Variables
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=

   # Stream
   NEXT_PUBLIC_STREAM_API_KEY=
   STREAM_SECRET_STREAM=

   NEXT_PUBLIC_BASE_URL =
   ```
4. **Run the Development Server
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 to view the application in your browser.
## 🕸️ Code Snippets

### **Styles**
- **`app/globals.css`**: Global styles for the application.

### **Configuration**
- **`tailwind.config.ts`**: Tailwind CSS configuration.

### **Components**
- **`components/MeetingCard.tsx`**: UI component for meeting cards.

---

## 🚀 More Resources
- **Tutorial**: [JavaScript Mastery YouTube](https://www.youtube.com/@javascriptmastery)
---

## 📧 Contact

If you have any questions, feel free to reach out:

- **Email**: [mrrseyla.758@gmail.com]
- **GitHub**: [Seyla123](https://github.com/seyla123)

