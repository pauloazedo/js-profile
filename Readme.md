# User Profile Manager

[![Node.js](https://img.shields.io/badge/Node.js-v16+-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v4+-yellow)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Learning%20Project-orange)](https://github.com/your-username/js-app-profile)

A **learning project** to sharpen JavaScript skills, explore Node.js, and experiment with containerization (Docker) and orchestration (Kubernetes). This web app manages user profiles with CRUD operations, random user generation, and a simple EJS-based UI.

![Demo Screenshot](https://simp6.jpg5.su/images3/SCR-20250223-qibq84d3c314aade4c76.png)  


## 📜 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Docker Setup](#-docker-setup)
- [Kubernetes Deployment](#-kubernetes-deployment-upcoming)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

## 🚀 Features

- **Profile Management**:  
  - Create, view, edit, and delete user profiles (name, email, interests, picture).  
  - Bulk delete profiles via checkboxes.  
- **Random User Generation**:  
  - Seed 50 fake profiles with one click using `@faker-js/faker`.  
- **User Interface**:  
  - EJS templates with light/dark mode toggle (saved in local storage).  
  - Interactive features like bulk deletion and confirmations via JavaScript.  
- **File Uploads**:  
  - Upload profile pictures, stored in `public/images/` with a default fallback.  
- **Docker & Kubernetes**:  
  - Containerization and orchestration support in progress.

## 🛠️ Tech Stack

- **Frontend**: EJS, CSS, vanilla JavaScript  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB with Mongoose  
- **Dependencies**:  
  - `@faker-js/faker`: Fake data generation  
  - `cors`: Cross-origin resource sharing  
  - `dotenv`: Environment variables  
  - `ejs`: Templating  
  - `express`: Web framework  
  - `mongoose`: MongoDB ORM  
  - `multer`: File uploads  
- **Containerization**: Docker (In progress)  
- **Orchestration**: Kubernetes (In progress)

## 📋 Prerequisites

- **Node.js**: v16 or higher ([Download](https://nodejs.org/))  
- **MongoDB**: v4 or higher, running locally or in a Docker Container ([Setup](https://www.mongodb.com/docs/manual/installation/))  
- **npm**: Included with Node.js  
- **Docker**: Optional, for containerization (coming soon)  
- **kubectl**: Optional, for Kubernetes (coming soon)

## 📦 Installation

1. **Clone the Repository**:  

   ```bash
   git clone https://github.com/your-username/js-app-profile.git  
   cd js-app-profile  
   ```

2. **Install Dependencies**:

   ```bash
   npm install  
   ```

3. **Set Up Environment Variables**:  

   Create a `.env` file in the root directory:

   ```bash
   MONGO_URI=mongodb://username:password@localhost:27017/profile?authSource=admin  
   ```

   For a local MongoDB without authentication:

   ```bash
   MONGO_URI=mongodb://localhost:27017/userProfiles  
   ```

4. **Start MongoDB**:  

   Ensure MongoDB is running locally:

   ```bash
   mongod  
   ```

5. **Run the Application**:  

   ```bash
   npm start  
   ```

6. **Visit the App**:  
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

- **Home Page (`/`)**:  
  - View all profiles, edit/delete individually, or bulk delete with checkboxes.  
  - Click "Create New Profile" or "Add 50 Aleatory Users".  
- **Create Profile (`/create`)**:  
  - Submit a form with name, email, interests (comma-separated), and an optional image.  
- **Edit Profile (`/edit/:id`)**:  
  - Update profile details and save.  
- **Theme Toggle**:  
  - Switch between light/dark mode in the top-right corner.  

## 📂 Project Structure

```
js-app-profile/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── profileController.js  # Profile CRUD logic
│   └── userSeederController.js  # Random user API
├── models/
│   └── Profile.js         # Mongoose schema
├── public/
│   ├── images/            # Uploaded pictures
│   └── style.css          # Custom styles
├── views/
│   ├── index.ejs          # Profile list
│   ├── createProfile.ejs  # New profile form
│   └── editProfile.ejs    # Edit profile form
├── .env                   # Environment variables (gitignored)
├── app.js                 # Main server
├── create_aleatory_users.js  # Fake profile generator
├── compose.yaml           # Docker Compose (WIP)
├── package.json           # Dependencies & scripts
└── README.md              # This file
```

## 🌐 API Endpoints

| Method | Endpoint          | Description                |
|--------|------------------|----------------------------|
| GET    | `/`              | List all profiles          |
| GET    | `/create`        | Show create profile form   |
| POST   | `/create`        | Add a new profile          |
| GET    | `/edit/:id`      | Show edit profile form     |
| POST   | `/edit/:id`      | Update a profile          |
| GET    | `/delete/:id`    | Delete a profile          |
| POST   | `/bulk-delete`   | Delete selected profiles  |
| POST   | `/api/seed-users` | Seed 50 random profiles |

## 🐳 Docker Setup

The project now supports **Docker Compose**, making it easy to set up the application along with MongoDB and Mongo Express.

### 🏗 Build and Start the Containers

1. **Ensure Docker and Docker Compose are installed** on your system.
2. **Run the following command** to build and start all services in detached mode:

   ```bash
   docker-compose up --build -d
   ```

3. **Verify that all containers are running**:

   ```bash
   docker ps
   ```

   Example output:

   ```
   CONTAINER ID   IMAGE                COMMAND                  CREATED        STATUS        PORTS                      NAMES
   269f8820eea8   js-app-profile-app   "docker-entrypoint.s…"   13 hours ago   Up 13 hours   0.0.0.0:3000->3000/tcp     js-app-profile-app-1
   a410c7e1df8e   mongo                "docker-entrypoint.s…"   13 hours ago   Up 13 hours   0.0.0.0:27017->27017/tcp   js-app-profile-mongodb-1
   abb5a2e5b460   mongo-express        "/sbin/tini -- /dock…"   13 hours ago   Up 13 hours   0.0.0.0:8081->8081/tcp     js-app-profile-mongo-express-1
   ```

4. **Access the application** in your browser:

   - **User Profile Manager**: [http://localhost:3000](http://localhost:3000)
   - **Mongo Express (MongoDB UI)**: [http://localhost:8081](http://localhost:8081)

### 🛑 Stopping and Removing Containers

To stop the running containers:

```bash
docker-compose down
```

To remove all stopped containers, networks, and volumes:

```bash
docker-compose down -v
```

### 🛠 Understanding the Containers

- **`js-app-profile-app`**: The Node.js application running on port `3000`
- **`js-app-profile-mongodb`**: The MongoDB database running on port `27017`
- **`js-app-profile-mongo-express`**: A web-based MongoDB admin UI running on port `8081`

### 📂 Files Related to Docker

- **`Dockerfile`**: Defines the application’s Docker image.
- **`docker-compose.yaml`**: Configures multi-container setup with MongoDB and Mongo Express.
- **`.dockerignore`**: Lists files and directories to exclude from the Docker image.

---

Docker is now fully integrated, making it easier to deploy and manage the application with minimal setup. 🚀

## ☸ Kubernetes Deployment (Upcoming)

Kubernetes integration is under development. Instructions will include:

- Deployment YAML for the app and MongoDB.
- Steps to deploy with `kubectl`.

## 🤝 Contributing

This is a learning project—contributions are welcome!

1. Fork the repo.  
2. Create a branch (`git checkout -b feature/your-feature`).  
3. Commit changes (`git commit -m "Add your feature"`).  
4. Push (`git push origin feature/your-feature`).  
5. Open a pull request.  

## 📜 License

Licensed under the MIT License. This project is for learning purposes only and not intended for production use.

## 🙏 Acknowledgments

Built as a hands-on way to learn JavaScript, Node.js, and DevOps tools.  
Thanks to the open-source community for libraries like `@faker-js/faker`, `express`, and `mongoose`.
