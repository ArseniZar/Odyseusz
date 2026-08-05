# Travel Safety Management System 

> Educational project for software engineering course (Projektowanie Oprogramowania)

## 📚 Project Overview

University project demonstrating software engineering principles through comprehensive system analysis, UML modeling, and partial implementation of a Travel Safety Management System.

**Focus Areas:**
- System analysis and requirements gathering
- UML assets/diagrams and modeling (Use Cases, Activity, Class, Component, Deployment assets/diagrams)
- API design with FastAPI
- Frontend prototype with React

**Note:** This is an educational project. Implementation covers core functionality and prototypes - not a production-ready application.

---

## 🎯 System Features

- **Travel Registration**: Register travel plans with multiple itineraries and dates
- **Country Profiles**: Manage country-specific travel information and warnings
- **Evacuation Management**: Coordinate evacuation procedures and communications
- **User Roles**: Different access levels (Traveler, Coordinator, Administrator, Editor, Support)
- **Travel Statistics**: View reports on registered travels with date/country filtering
- **External Warnings Integration**: Automatic updates from external threat systems (design only)

---

## 🏗️ System Architecture Overview

### Slownik 
![Slownik](assets/diagrams/Pasted%20image.png)

### Model Informacyjny Systemu
![Model informacyjny systemu](assets/diagrams/Model%20informacyjny%20systemu.jpg)

### Reguly Biznesowe
![Reguly biznesowe](assets/diagrams/Reguly%20biznesowe.jpg)

### Wymagania Funkcjonalne
![Wymagania funkcjonalne - Proces](assets/diagrams/Wymagania%20funkcjonalne%20-%20Proces.jpg)

### Diagram Komponentow
![Diagram komponentow](assets/diagrams/Diagram%20komponentow.jpg)

### Diagram Rozmieszczenia
![Diagram rozmieszczenia](assets/diagrams/Diagram%20rozmieszczenia.jpg)

---

## 👥 User Roles & Capabilities

### Use Case Hierarchia Aktorow
![Hierarchia aktorow](assets/diagrams/Hierarchia%20aktorow.jpg)

### Funkcjonalnosci Podroznika
![Funkcjonalnosci podroznika](assets/diagrams/Funkcjonalnosci%20podroznika.jpg)

### Funkcjonalnosci Koordynatora
![Funkcjonalnosci koordynatora](assets/diagrams/Funkcjonalnosci%20koordynatora.jpg)

### Funkcjonalnosci Administratora
![Funkcjonalnosci administratora](assets/diagrams/Funkcjonalnosci%20administratora.jpg)

### Funkcjonalnosci Redaktora
![Funkcjonalnosci redaktora](assets/diagrams/Funkcjonalnosci%20redaktora.jpg)

### Funkcjonalnosci Pracownika
![Funkcjonalnosci pracwonika](assets/diagrams/Funkcjonalnosci%20pracwonika.jpg)

### Funkcjonalnosci Pomocnika Ewakuacji
![Funkcjonalnosci pomocnika%20ewakuacji](assets/diagrams/Funkcjonalnosci%20pomocnika%20ewakuacji.jpg)

### Funkcjonalnosci Zegara
![Funkcjonalnosci zegara](assets/diagrams/Funkcjonalnosci%20zegara.jpg)

---

## 🖥️ User Interface Mockups

### Travel Management

#### Register New Travel
![Add Travel 1](assets/interfaces/Zarzadzanie%20podrozami/add_1.png)
![Add Travel 2](assets/interfaces/Zarzadzanie%20podrozami/add_2.png)

#### Edit Travel Information
![Edit Travel](assets/interfaces/Zarzadzanie%20podrozami/edit_1.png)

#### View & Delete Travels
![View Travel](assets/interfaces/Zarzadzanie%20podrozami/read_delete_cancel_1.png)
![Travel Details](assets/interfaces/Zarzadzanie%20podrozami/read_delete_cancel_2.png)

### Country Profile Management

#### View Country Information
![View Country Profile](assets/interfaces/Zarzadzanie%20pfolile%20kraju/read_1.png)

#### Edit Country Information
![Edit Country 1](assets/interfaces/Zarzadzanie%20pfolile%20kraju/edit_1.png)
![Edit Country 2](assets/interfaces/Zarzadzanie%20pfolile%20kraju/edit_2.png)

### Evacuation Management

#### Create Evacuation Plan
![Add Evacuation 1](assets/interfaces/Zarzadzanie%20ewakuacjami/add_1.png)
![Add Evacuation 2](assets/interfaces/Zarzadzanie%20ewakuacjami/add_2.png)
![Add Evacuation 3](assets/interfaces/Zarzadzanie%20ewakuacjami/add_3.png)
![Add Evacuation 4](assets/interfaces/Zarzadzanie%20ewakuacjami/add_4.png)
![Add Evacuation 5](assets/interfaces/Zarzadzanie%20ewakuacjami/add_5.png)

#### View Evacuations
![View Evacuation 1](assets/interfaces/Zarzadzanie%20ewakuacjami/read_active_delete_1.png)
![View Evacuation 2](assets/interfaces/Zarzadzanie%20ewakuacjami/read_active_delete_2.png)

#### Edit Country Information
![Edit Evacuation 1](assets/interfaces/Zarzadzanie%20ewakuacjami/edit_1.png)
![Edit Evacuation 2](assets/interfaces/Zarzadzanie%20ewakuacjami/edit_2.png)
![Edit Evacuation 3](assets/interfaces/Zarzadzanie%20ewakuacjami/edit_3.png)
![Edit Evacuation 4](assets/interfaces/Zarzadzanie%20ewakuacjami/edit_4.png)

---

## 🔄 Activity Diagrams (Process Flows)

### Travel Activity Diagram
![Travel Activity Diagram](assets/diagrams/Zarzadzanie%20podrozami%20Activity%20Diagram.jpg)

### Threat System Diagram
![Threat System Diagram](assets/diagrams/Obsluga%20zewnetrznego%20systemu%20zagrozen.jpg)

### Evacuation Activity Diagram
![Evacuation Activity Diagram](assets/diagrams/Zarzadzanie%20ewakuacjami%20Activity%20Diagram.jpg)

---

## 🚀 Getting Started

### Backend Setup

1. **Navigate to backend directory**
```bash
   cd backend
```

2. **Create Python virtual environment**
```bash
   python -m venv venv
```

3. **Activate virtual environment**
```bash
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
```

4. **Copy environment configuration**
```bash
   cp .env.example .env
```

5. **Install uv package manager**
```bash
   pip install uv
```

6. **Install dependencies and run server**
```bash
   uv run server
```

   The backend API will be available at: **`http://localhost:8000`**

   - **Swagger API Docs**: `http://localhost:8000/docs`
   - **ReDoc**: `http://localhost:8000/redoc`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
   cd frontend
```

2. **Install dependencies**
```bash
   npm install
```

3. **Build the project**
```bash
   npm run build
```

4. **Preview the build**
```bash
   npm run preview
```

   The frontend will be available at: **`http://localhost:4173`**

---
---

## 🔧 Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation
- **SQLAlchemy** - ORM for database operations
- **SQLite** - Lightweight database

### Frontend
- **React** - UI library
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework

### Authentication
- **JWT (JSON Web Tokens)** - Stateless authentication

---

## 📝 Environment Setup

### Backend (.env)
```env
# Database
DATABASE_URL=sqlite:///./database.db

# API Configuration
API_PORT=8000
DEBUG=True

# JWT Authentication
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
```

---

## 🔐 Authentication

The system uses **JWT (JSON Web Tokens)** for user authentication:

1. User logs in with credentials
2. Backend issues a JWT token
3. Frontend stores token (localStorage/sessionStorage)
4. All subsequent requests include the token in `Authorization: Bearer <token>` header
5. Backend validates token before processing requests

**Implementation Status:** Designed and partially implemented

---

## 📖 API Documentation

Interactive API documentation is automatically generated by FastAPI:

- **Swagger UI**: Visit `http://localhost:8000/docs` while backend is running
---

## 📊 Database

**Type:** SQLite (file-based, no external database needed)

**Schema Overview:**
- `users` - User accounts with roles
- `travels` - Travel records with itineraries
- `countries` - Country information and warnings
- `evacuations` - Evacuation plans and status
- `consultates` - Diplomatic missions and their countries

**Note:** Database is automatically created on first run. No migrations needed.

---

## ⚠️ Project Status

### ✅ Completed
- System analysis and requirements gathering
- Comprehensive UML assets/diagrams (Use Cases, Class, Component, Deployment, Activity)
- FastAPI backend with JWT authentication
- React frontend with UI mockups
- API endpoint design
- Swagger documentation

### 🚧 Partially Implemented
- Core API endpoints
- Frontend components
- Database models
- Authentication flow

### ❌ Not Implemented
- Complete frontend-backend integration
- Email/SMS notifications
- External threat system integration
- Deployment configuration
- Unit and integration tests

**Why?** This was an educational project focused on software engineering principles (analysis, modeling, design) rather than a complete implementation. The main deliverables were the design artifacts and architectural decisions.

---

## 📚 Documentation Files

Detailed project documentation:
- `docs/PO_projekt_Instrukcja.pdf` - Complete project instructions and requirements
- `docs/SWZ.pdf` - Specification of requirements (SWZ)
- `docs/SWZ_z_załącznikami.pdf` - Specification with all attachments

---

## 🎓 Learning Outcomes

This project demonstrates:
- **Requirements Analysis**: Gathering and documenting system needs
- **UML Modeling**: Creating assets/diagrams to visualize system architecture
- **API Design**: Designing RESTful API with FastAPI
- **Frontend Architecture**: Building responsive UI with React
- **Database Design**: Creating normalized data models

---

## 🔗 Key Technologies Explained

### FastAPI
Modern framework for building APIs with automatic validation, serialization, and documentation.

### React + Vite
Vite provides lightning-fast development server with Hot Module Replacement (HMR). React manages UI state and components.

### Tailwind CSS
Utility-first CSS framework for styling without writing custom CSS.

### SQLite
Serverless, file-based SQL database perfect for development and educational projects.

### JWT Authentication
Stateless authentication mechanism where tokens are issued by server and verified by both server and client.

---

## 📝 Notes for Future Development

If continuing this project:

1. **Complete the implementation** of remaining API endpoints
2. **Add comprehensive error handling** and validation
3. **Implement tests** (unit and integration)
4. **Add logging and monitoring** capabilities
5. **Implement the external threat system integration**
6. **Complete all frontend pages** and forms
7. **Add email/SMS notifications** functionality
8. **Create deployment configuration** (Docker, etc.)
9. **Add data export** functionality (reports, statistics)
10. **Implement role-based access control** more comprehensively

---

## 📄 License

Educational project for university software engineering course.

---

## 📧 Project Information

- **Course:** Projektowanie Oprogramowania (Software Engineering)
- **Type:** Monolithic Repository (Monorepo)
- **Academic Project:** Yes
- **Production Ready:** No (Educational purposes)
