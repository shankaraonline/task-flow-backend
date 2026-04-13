TaskFlow SaaS Backend

TaskFlow is a multi-tenant SaaS task management backend built using Node.js, TypeScript, Express, and MongoDB.
The system supports tenant isolation, employee hierarchy, task assignment, client task requests, and notifications.

It is designed as a production-ready layered architecture suitable for scalable SaaS applications.

Architecture

The backend follows a strict layered architecture:

routes → handlers → services → schemas
Layer Responsibilities
Layer	Purpose
Routes	API endpoints and middleware binding
Handlers	Request/response handling
Services	Business logic
Schemas	MongoDB data models

This structure ensures:

maintainability
separation of concerns
scalable codebase
Core Features
Multi-Tenant Architecture

The system isolates data per tenant.

Super Admin creates tenants
Tenant Admin manages users
Users can only access data belonging to their tenant
Tenant → Users → Projects → Tasks
Role-Based Access Control

Supported roles:

super_admin
admin
employee
client
Responsibilities
Role	Capabilities
Super Admin	Create tenants
Admin	Manage users, services, projects
Employee	Work on assigned tasks
Client	Request tasks for assigned projects
Employee Hierarchy

Employees have levels.

Level 2 → can assign tasks to Level 1 and Level 0
Level 1 → can assign tasks to Level 0
Level 0 → cannot assign tasks

Validation is enforced during task assignment.

Project & Service Management

Admins can create:

services
projects
assign services to projects

Example:

Project: Website Development
Services:
• UI Design
• Backend Development
• Deployment
Task Management

Tasks are grouped by:

project
date

Each task contains entries.

Example:

Task
 └ entries
    ├ title
    ├ description
    ├ employeeIds
    ├ serviceIds
    └ status
Task Status
gray
yellow
green
red
Client Task Requests

Clients can request tasks for projects assigned to them.

Flow:

Client
   ↓
POST /task-requests
   ↓
Admin reviews request
   ↓
Approve / Reject
   ↓
Task creation

Clients can track progress using:

GET /task-requests/my-requests
Notifications

The system supports two types of notifications.

In-App Notifications

Stored in database.

Notification
 ├ userId
 ├ tenantId
 ├ title
 ├ message
 ├ type
 └ read

Triggered when:

tasks are assigned
requests are processed
Push Notifications

Browser push notifications are supported using Web Push.

Example event:

Task Assigned
     ↓
Push notification sent to employees
Pagination & Filtering

GET APIs support:

?page=1
&limit=10
&sort=-createdAt

This is implemented via a shared utility.

API Documentation

Interactive API documentation is available through Swagger.

http://localhost:5000/docs

Swagger is generated from:

docs/swagger.yaml
Technology Stack
Layer	Technology
Runtime	Node.js
Language	TypeScript
Framework	Express.js
Database	MongoDB
ODM	Mongoose
Authentication	JWT
Documentation	Swagger
Security	Helmet, Rate Limit
Logging	Pino
Project Structure
src
 ├ app.ts
 ├ server.ts

 ├ config
 │   ├ database.ts
 │   └ env.ts

 ├ routes
 │   ├ auth.routes.ts
 │   ├ tenant.routes.ts
 │   ├ user.routes.ts
 │   ├ project.routes.ts
 │   ├ tasks.routes.ts
 │   ├ notifications.routes.ts
 │   └ taskRequest.routes.ts

 ├ handlers
 │   ├ auth.handler.ts
 │   ├ tenant.handler.ts
 │   ├ user.handler.ts
 │   ├ project.handler.ts
 │   ├ tasks.handler.ts
 │   ├ notification.handler.ts
 │   └ taskRequest.handler.ts

 ├ services
 │   ├ auth.service.ts
 │   ├ tenant.service.ts
 │   ├ user.service.ts
 │   ├ project.service.ts
 │   ├ tasks.service.ts
 │   ├ notification.service.ts
 │   └ taskRequest.service.ts

 ├ schemas
 │   ├ tenant.schema.ts
 │   ├ user.schema.ts
 │   ├ project.schema.ts
 │   ├ task.schema.ts
 │   ├ service.schema.ts
 │   ├ notification.schema.ts
 │   └ taskRequest.schema.ts

 ├ middleware
 │   ├ auth.middleware.ts
 │   ├ role.middleware.ts
 │   ├ validation.middleware.ts
 │   └ error.middleware.ts

 ├ utils
 │   ├ jwt.ts
 │   ├ password.ts
 │   ├ push.ts
 │   └ queryBuilder.ts

 └ docs
     └ swagger.yaml
Installation

Clone the repository.

git clone <repository-url>

Install dependencies.

npm install
Environment Variables

Create a .env file.

PORT=5000
MONGO_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=supersecret

VAPID_PUBLIC_KEY=xxxx
VAPID_PRIVATE_KEY=xxxx
VAPID_EMAIL=mailto:admin@example.com
Running the Application

Development mode:

npm run dev

Production build:

npm run build
npm start
Authentication

JWT authentication is used.

Login endpoint:

POST /auth/login

Authorization header:

Authorization: Bearer <token>
Example Workflow
Tenant Setup
Super Admin
    ↓
Create Tenant
User Setup
Admin
   ↓
Create Employees
   ↓
Create Client
Project Setup
Admin
   ↓
Create Services
   ↓
Create Project
Task Flow
Admin
   ↓
Assign Task
   ↓
Employee works
   ↓
Status updated
Client Workflow
Client
   ↓
Request Task
   ↓
Admin Review
   ↓
Task Execution
Security

Implemented security mechanisms:

Helmet security headers
API rate limiting
JWT authentication
Tenant data isolation
Password hashing (bcrypt)
Future Improvements

Potential enhancements:

Email notifications
WebSocket real-time updates
Task approval workflows
Billing and subscription module
Background job queue
License

This project is licensed under the MIT License.

Author

TaskFlow Backend SaaS Architecture.