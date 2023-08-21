## Software Requirement Document

### 1. System Architecture

#### Web Stack

The application will be built using the MERN (MongoDB, Express.js, React, Node.js) stack. This stack has been chosen due to its efficiency in developing modern web applications, its flexibility, and its capability to handle real-time interactions. MongoDB will serve as the database, Express.js will manage the server-side logic, React will handle the front-end interface, and Node.js will provide the runtime environment.

#### Deployment

The application will be deployed using a cloud service provider (e.g. Heroku) for scalability, ease of management, and accessibility. This choice ensures reliable performance, automated scaling, and easy deployment.

#### Styling

For styling, the application will use CSS and Bootstrap. Bootstrap is chosen for its responsive design components and grid system, allowing for consistent styling across different devices and screen sizes. This ensures a user-friendly experience.

#### High-Level Overview of System Architecture

The system architecture will consist of several key components:

Client (React): Responsible for rendering the user interface, handling user interactions, and making API requests to the back-end.

Back-End (Node.js and Express): Manages the server-side logic, authentication, and communication with the database. Utilizes Passport strategies for user authentication.

Database (MongoDB): Stores user accounts, appointment details, and other relevant data.

APIs: RESTful APIs will be exposed to handle user actions such as appointment creation, retrieval, and updates.

Admin Panel: A secure admin panel allows administrators to manage user behavior, update Doctor role requests, and access appointment/user data.

Doctor Panel: Manages appointment requests by accepting or rejecting them.

User Panel: Requests appointments with Doctors, benefits from simplified appointment scheduling.

Authentication (Passport): Integrates with Google and also supports traditional username/password authentication.

### Reused Architectural Components

Layout.js for consistent layout.
PrivateRoutes.js will secure routing by veryfying token in the backend.
DoctoForm.js will render a form which will be reused to capture/edit doctor's profile.

### 2. System Requirements Specification

The appointment scheduling application aims to provide a user-friendly platform for clients to book appointments with Doctors. The system will cater to clients, Doctors and administrators.

#### Client/User Functionality

1. **User Authentication:**

   - Users can log in or register using Google or a username and password combination.
   - Authentication ensures secure access to the application and user data.

2. **Appointment Booking:**

   - Clients can fill in a form to create an appointment based on availability.
   - Users can select a Doctor from a list in the Home page.
   - The appointment request will notify the chosen Doctor for them to approve or reject.

3. **Appointment Tracking:**

   - Notifications will be sent to users for approved and rejected appointments.

4. **User Profile:**

   - User can update personal details.
   - User can apply for Doctor role and will be notified when Admin responds.

#### Doctor Functionality

1. **Doctor Role:**

   - After login authentication, user can apply for Doctor role which will notify Admin.

2. **Appointment Tracking:**

   - Doctor role can approve and reject appointment request.

3. **Doctor Profile:**

   - Doctor can update personal and professional details, such as work hours and fee.

#### Admin Functionality

1. **User Behavior Monitoring:**

   - Admins can monitor users and doctor details.
   - Approves and blocks Doctor role requests.

2. **Data Retrieval:**
   - Admins can pull a list of all doctors,users and appointment history for analysis and reporting.
   
   NB* Update isAdmin value to "true" in order to have Admin access.

### Similar Applications

Similar applications include online appointment scheduling tools like Calendly and Zocdoc. However, this application differentiates itself in the following ways:

- **Simplicity:** The application focuses on a specific niche, offering a more streamlined and specialized experience.
- **User Control:** Clients can choose specific doctors and view their appointment times, enhancing user engagement.

### Functional Requirements

- User registration and login using Google or Email/Password.
- User role application form.
- Admin role approval and rejection functionality.
- Doctor role ability to accept or reject appointment requests.
- Notification system for Admin, Doctor, and User actions.
- User-friendly appointment creation form.
- Profile management for clients.

### Non-Functional Requirements

- **Usability:** The application should be intuitive and easy to navigate for both clients and admins.
- **Security:** User data, including personal and appointment details, should be securely stored and transmitted.
- **Performance:** The system should handle multiple concurrent users and appointment requests without significant performance degradation.
- **Scalability:** The application should easily accommodate increasing user and appointment loads.
- **Reliability:** The application should be available and responsive, minimizing downtime and errors.

### User stories

#### User Story 1: New Client Registration

As a potential client, I want to create a new account on the appointment scheduling platform so that I can book a session. I can use my Google to quickly register, or I can choose to create a unique username and password combination. After registration, I should be able to log in and start browsing available doctors and appointment slots.

#### User Story 2: Booking an Appointment

As a returning client, I want to book a session with my preferred doctor. I log in to the application and navigate to the appointment booking section. I can see my doctor's availability and select a suitable date and time. After confirming the appointment, I receive a notification confirming my booking and reminding me of the upcoming session.

#### User Story 3: Admin Management

As an Admin, I want to receive notifications for Doctor role applications and have the ability to approve or reject them.

#### User Story 4: Doctor Role

As a Doctor, I want to be notified of appointment requests and be able to accept or reject them.

#### User Story 5: Admin User Monitoring

As an admin, I want to monitor user activities to enhance the application's performance. I use this data to adjust Doctor schedules and improve the user experience.

These user stories provide insights into different scenarios and interactions users might have with the appointment scheduling application. They help shape the application's features and functionalities to cater to the needs of both clients and administrators.

### 3. Wireframe

https://www.figma.com/file/C62TQVFzvkt29brEou3pRN/Capstone?type=design&node-id=0%3A1&mode=design&t=50dtwSNXS5kaCrHY-1

# Installation and Setup Instructions

Download or clone the repository.
You will need node and npm installed globally on your machine.

## Installation:

cd backend
npm install
cd client
npm install

Create an .env file in the backend directory and provide following details:

PORT=
DB_CONNECTION_STRING=
JWT_SECRET=
GOOGLE_CLIENT_ID = visit https://console.developers.google.com/ to setup
GOOGLE_CLIENT_SECRET =

## To Run Test Suite:

Back end test:
cd backend
npm run test

Front end test:
cd client
npm test

## To Start Application:

cd backend
npm start

cd client
npm start

## Security Measures

 - User passwords are securely hashed using bcrypt before storing in the database.

 - JWT is used for user authentication, ensuring secure access to various features.

 - Google login users will be authenticated through Passport.js framework. Upon successful login, JWT token is created for accessing private routes.

 - Sensitive configuration details are stored in environment variables to prevent exposure.


## Third-Party APIs

Google API is used to enable quick and secure user registration and login.


