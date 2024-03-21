# Vaccination Management System

The Vaccination Management System is a web application designed to streamline the process of scheduling and recording vaccinations for patients by nurses. It provides a user-friendly interface for both patients and nurses to manage vaccination appointments efficiently.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## About

The Vaccination Management System allows patients to schedule vaccination appointments and view their vaccination records. Nurses can manage their schedules, record vaccinations, and track vaccine availability. The system helps healthcare facilities efficiently manage their vaccination operations.

## Features

- Patient registration and profile management
- Nurse registration and profile management
- Scheduling vaccination appointments
- Recording vaccination details
- Tracking vaccine availability and schedules
- Managing nurse schedules

## Technologies Used

- Flask (Backend framework)
- SQLAlchemy (ORM for database interaction)
- React (Frontend library)
- Bootstrap (CSS framework)
- MySQL (Database)
- Flask-Bcrypt (Password hashing)
- React Router (Routing in React)

## Getting Started

To run the Vaccination Management System locally, follow these instructions:

### Prerequisites

- Python 3.x
- Node.js
- npm (Node Package Manager)
- MySQL

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/vaccination-management-system.git

2. Navigate to the backend directory and install Python dependencies:
cd vaccination-management-system/backend
pip install -r requirements.txt



3. Set up the MySQL database and configure the database URI in `config.py`.

4. Run the Flask backend:
python app.py

5. Navigate to the frontend directory and install npm dependencies:

cd ../frontend
npm install

6. Run the React frontend:

npm start


## Usage

1. Open your web browser and go to `http://localhost:3000` to access the application.
2. Register as a patient or nurse and log in to your account.
3. Schedule vaccination appointments or record vaccinations as a nurse.
4. Manage your profile and view vaccination records.

## API Endpoints

The backend provides the following API endpoints:

- **POST /register/patient**: Register a new patient.
- **POST /register/nurse**: Register a new nurse.
- **POST /login**: Log in as a patient or nurse.
- **POST /schedule/vaccination**: Schedule a vaccination appointment.
- **POST /record/vaccination**: Record a vaccination.
- **DELETE /cancel/scheduled-time**: Cancel a scheduled vaccination appointment and release an on-hold vaccine.

For detailed request and response formats, refer to the backend code or API documentation.

## Contributing

Contributions are welcome! If you'd like to contribute to the Vaccination Management System, please fork the repository, make your changes, and submit a pull request.

If you encounter any bugs or have suggestions for improvements, please open an issue on GitHub.

