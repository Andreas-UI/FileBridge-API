# Project Structure

Hey there! 👋 This document explains the folder structure of the project. It's organized to keep things clean, modular, and easy to work with. Whether you're new to the project or just need a refresher, this guide will help you navigate the codebase.

---

## **Folder Overview**

Here’s a breakdown of the main folders and what they do:

### **`src/`**

This is where all the source code lives. It’s divided into layers to keep things organized and maintainable.

#### **`domain/`**

This folder contains the core business logic and entities. Think of it as the heart of the application.

- **`entities/`**: Business objects like `User`, `Product`, etc.
- **`repositories/`**: Interfaces for data access (e.g., `UserRepository`). These define how data should be accessed, but not the actual implementation.

#### **`application/`**

This is where the application-specific logic lives. It connects the domain layer with the outer layers.

- **`use-cases/`**: Business logic for specific actions (e.g., `CreateUser`, `GetUser`).
- **`services/`**: Shared services like `AuthService` or `EmailService`.

#### **`interfaces/`**

This layer adapts data between the inner layers (domain and application) and the outer world (HTTP requests, databases, etc.).

- **`controllers/`**: Express.js controllers that handle HTTP requests.
- **`presenters/`**: Formats data for responses (e.g., shaping API responses).
- **`gateways/`**: Adapters for external services (e.g., payment gateways).
- **`middleware/`**: Custom middleware for things like authentication, validation, and error handling.

#### **`infrastructure/`**

This is where the "plumbing" of the application lives—things like databases, web frameworks, and utilities.

- **`database/`**: Database configurations and implementations.
- **`web/`**: Express.js setup (e.g., `app.js`, routes).
- **`third-party/`**: Integrations with external APIs or services.
- **`utils/`**: Utility functions (e.g., logging, validation helpers).

#### **`config/`**

Configuration files for environment variables, database connections, etc.

---

### **`tests/`**

This folder contains all the tests for the application. It’s split into two subfolders:

- **`unit/`**: Unit tests for individual components (e.g., use cases, services).
- **`integration/`**: Integration tests for things like API endpoints or database interactions.

---

## **How It All Fits Together**

1. **Domain Layer**: Defines the core business logic and entities.
2. **Application Layer**: Implements use cases and services that use the domain layer.
3. **Interface Adapters Layer**: Connects the application to the outside world (e.g., HTTP requests, databases).
4. **Infrastructure Layer**: Handles the technical details (e.g., databases, utilities).

This structure keeps the code modular, testable, and easy to maintain. If you need to change something, you’ll know exactly where to look!

---

## **Example Workflow**

Let’s say you want to add a new feature, like creating a user:

1. **Domain Layer**: Define the `User` entity and the `UserRepository` interface.
2. **Application Layer**: Create a `CreateUser` use case that uses the `UserRepository`.
3. **Interface Adapters Layer**: Add a `UserController` to handle HTTP requests and a `authMiddleware` to protect the route.
4. **Infrastructure Layer**: Implement the `UserRepository` with your database of choice.

---

## **Running the Project**

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the server:

   ```bash
   npm start
   ```

3. Run tests:

   ```bash
   npm test
   ```
