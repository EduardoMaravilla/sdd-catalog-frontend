# sdd-catalog-backend

## Project: SDD-Catalog

Currently, video game enthusiasts, particularly players of [**Need for Speed Unbound**](https://www.ea.com/es-es/games/need-for-speed/need-for-speed-unbound), lack a centralized platform where they can create, save, and share personalized configurations for their vehicles. This includes specific features such as the engine, suspension, wheels, and other modifications that are part of their game strategies.

Players often rely on unorganized notes or screenshots, making it challenging to manage and share ideas with other users.

---

## Proposed Solution

We propose developing a web application called [**SDD-Catalog**](https://sdd-catalog.netlify.app/home), which will allow users to:

### 1. Manage Vehicle Configurations

Users will be able to create, save, and update configurations for their vehicles, defining technical aspects like the engine, suspension, turbo, and more. These configurations will be accessible for consultation at any time.

### 2. Explore Other Users' Configurations

A gallery will be available where users can browse and explore configurations shared by other players, fostering collaborative learning and inspiration.

### 3. Authentication and Security

Users will have personal accounts secured with robust authentication to ensure only they can manage their configurations.

### 4. User Interaction

The platform will include a feature to contact the administrator and eventually communicate with other users, fostering a collaborative community.

---

## Main Objective

Provide a practical, accessible, and secure tool that facilitates the creation, management, and collaboration among [**Need for Speed Unbound**](https://www.ea.com/es-es/games/need-for-speed/need-for-speed-unbound) players, enhancing the gaming experience and fostering an active community.

---

This project is a web application built using **React**, **Vite**, **TypeScript**, and **SWC**. The application provides a fast and scalable frontend that interacts with the backend via APIs.

1. **React:** A JavaScript library for building user interfaces, used for creating reusable components and handling the application’s state.

2. **Vite:** A build tool that aims to provide a faster and leaner development experience. It serves as the bundler for the frontend code.

3. **TypeScript:** A typed superset of JavaScript that adds static types, helping developers catch errors early and improve the development experience.

4. **SWC:** A fast JavaScript/TypeScript compiler that is used for transforming and minifying the code.

## 🗃️ **Table of Contents**

- [📦 Prerequisites](#-prerequisites)
- [🚀 Installation](#-installation)
- [⚙️ Configuration](#-configuration)
- [🗂 Project Structure](#-project-structure)
- [🛠️ Technologies Used](#-technologies-used)
- [👎 License](#-license)
- [📞 Contact](#-contact)

---

## 📦 **Prerequisites**

 Before setting up the project, ensure that you have the following software installed:
 - **Node.js** (LTS version recommended): [Download Node.js](https://nodejs.org/en)
 - **npm** or **Yarn**: Used for managing dependencies.

 ---

## ⚙️ **Configuration**

Install the dependencies using npm or Yarn:
```
npm install
or
yarn install
```

After installing the dependencies, you can start the development server using Vite.

```
npm run dev
# or
yarn dev
```
The application will be available at `http://localhost:5173`.

## 🗂 **Project Structure**

```
/public              # Static files (images, icons, etc.)
/src                 # Source code
  /assets            # Assets like images, fonts, etc.
  /components        # React components
  /context           # Variables for context and shared for all components
  /hooks             # Custom hooks
  /languages         # Different languages for application
  /pages             # React pages
  /services          # API services and utils
  /types             # TypeScript types and interfaces
  /utils             # TypeScript functions
  App.tsx            # Main entry point of the app
  main.tsx          # Main rendering file
  vite-env.d.ts      # Environment variables configuration
/vite.config.ts      # Vite configuration
/tsconfig.json       # TypeScript configuration
/package.json        # Project dependencies and scripts
```

---

## 🛠️ **Technologies Used**

- **React**
- **React Router Dom**
- **Typescript**
- **Javascript**
- **SWC**
- **Bootstrap**
- **React Bootstrap**  
- **HCaptcha**

---

## 👎 **License**

[Apache License](LICENSE)

---

## 📞 **Contact**

- **Email:** eduardomaravilladev@hotmail.com