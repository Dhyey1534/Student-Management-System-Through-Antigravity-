# 🎓 Student Management System

A full-stack **Student Management System** built with **React.js** (Frontend) and **Java Spring Boot** (Backend), using **MySQL** as the database.

---

## 📁 Project Structure

```
student-management-system/
├── backend/                         # Spring Boot Maven Project
│   ├── pom.xml
│   └── src/
│       └── main/
│           ├── java/com/sms/
│           │   ├── StudentManagementSystemApplication.java
│           │   ├── config/
│           │   │   └── CorsConfig.java
│           │   ├── controller/
│           │   │   └── StudentController.java
│           │   ├── entity/
│           │   │   └── Student.java
│           │   ├── exception/
│           │   │   ├── DuplicateResourceException.java
│           │   │   ├── GlobalExceptionHandler.java
│           │   │   └── ResourceNotFoundException.java
│           │   ├── repository/
│           │   │   └── StudentRepository.java
│           │   └── service/
│           │       ├── StudentService.java
│           │       └── impl/
│           │           └── StudentServiceImpl.java
│           └── resources/
│               └── application.properties
│
├── frontend/                        # React (Vite) Project
│   ├── package.json
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── App.css
│       ├── components/
│       │   ├── StudentList.jsx
│       │   ├── AddStudent.jsx
│       │   └── EditStudent.jsx
│       └── services/
│           └── StudentService.js
│
└── database/
    └── setup.sql                    # MySQL setup script
```

---

## ✅ Prerequisites

Make sure you have the following installed:

| Tool | Version | Link |
|------|---------|-------|
| Java JDK | 17+ | [Download](https://adoptium.net/) |
| Maven | 3.8+ | [Download](https://maven.apache.org/download.cgi) |
| MySQL Server | 8.0+ | [Download](https://dev.mysql.com/downloads/mysql/) |
| Node.js | 18+ | [Download](https://nodejs.org/) |
| npm | 9+ | (comes with Node.js) |

---

## 🗄️ Step 1: Database Setup

1. Open **MySQL Workbench** or the **MySQL CLI**.

2. Run the setup script:

```bash
mysql -u root -p < database/setup.sql
```

Or manually run the SQL inside **MySQL Workbench**:

```sql
CREATE DATABASE IF NOT EXISTS student_management_db;
USE student_management_db;
```

> **Note:** Hibernate's `ddl-auto=update` will automatically create the `students` table when you first start the backend.

3. **(Optional)** Update your MySQL credentials in `backend/src/main/resources/application.properties`:

```properties
spring.datasource.username=root
spring.datasource.password=your_password_here
```

---

## ⚙️ Step 2: Run the Backend (Spring Boot)

1. Open a terminal and navigate to the backend folder:

```bash
cd student-management-system/backend
```

2. Build and run the Spring Boot application:

```bash
mvn spring-boot:run
```

Or build a JAR and run it:

```bash
mvn clean package -DskipTests
java -jar target/student-management-system-1.0.0.jar
```

3. Verify the backend is running:

```
http://localhost:8080/api/students
```

You should see `[]` (empty array) or a list of students in JSON format.

---

## 💻 Step 3: Run the Frontend (React)

1. Open a **new terminal** and navigate to the frontend folder:

```bash
cd student-management-system/frontend
```

2. Install dependencies (if not already installed):

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit:

```
http://localhost:5173
```

---

## 🌐 REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/students` | Get all students |
| `GET` | `/api/students/{id}` | Get student by ID |
| `POST` | `/api/students` | Create a new student |
| `PUT` | `/api/students/{id}` | Update student by ID |
| `DELETE` | `/api/students/{id}` | Delete student by ID |

### Sample Request Body (POST / PUT)

```json
{
  "firstName": "Alice",
  "lastName": "Johnson",
  "email": "alice.johnson@example.com",
  "course": "Computer Science",
  "phoneNumber": "+1 555-0101"
}
```

---

## 🎨 Frontend Features

- **Student List** – table view with search/filter by name, email, or course
- **Add Student** – form with client-side validation and server error handling
- **Edit Student** – pre-populated form to update student details
- **Delete Student** – confirmation dialog before deletion
- **Success Toast** – auto-dismissing success message after add/edit
- **Loading Spinner** – shown while API calls are in progress
- **Responsive Design** – works on desktop and mobile

---

## 🔧 Backend Features

- **Layered Architecture**: Controller → Service → Repository → Entity
- **Bean Validation**: `@NotBlank`, `@Email` annotations on entity fields
- **Custom Exceptions**: `ResourceNotFoundException` (404), `DuplicateResourceException` (409)
- **Global Exception Handler**: `@RestControllerAdvice` for clean error responses
- **CORS Configuration**: Allows requests from `localhost:5173` and `localhost:3000`
- **Transactional Service Layer**: Proper `@Transactional` and `@Transactional(readOnly=true)`
- **Structured Logging**: `@Slf4j` with meaningful log messages

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Backend won't connect to MySQL | Check credentials in `application.properties` |
| `Access denied for user 'root'@'localhost'` | Verify MySQL password or reset it |
| CORS errors in browser | Ensure backend is running on port 8080 |
| Port 8080 already in use | Change `server.port` in `application.properties` |
| Port 5173 already in use | Vite will auto-select the next available port |
| `student_management_db` does not exist | Run `CREATE DATABASE student_management_db;` in MySQL |

---

## 📝 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Axios, React Router v6 |
| Backend | Java 17, Spring Boot 3.2, Spring Web, Spring Data JPA |
| Database | MySQL 8.0, Hibernate ORM |
| Build Tool | Maven (backend), npm (frontend) |
| Utilities | Lombok, Bean Validation |
