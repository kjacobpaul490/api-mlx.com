# YLIMS - Yodha Laboratory Information Management System (LIMS)
## Complete Project Architecture & Design Patterns Analysis

---

##  PROJECT OVERVIEW

**Project Name:** ylims.ms.webapi (Yodha LIMS Microservice Web API)  
**Framework:** ASP.NET Core 6.0  
**Architecture Type:** Layered Architecture with Handler Pattern  
**Primary Purpose:** Web API for a Laboratory Information Management System

---

##  PROJECT STRUCTURE

### Four Main Projects:

```
ylims.ms.webapi/
├── ylims.ms.webapi/              # Main API project (Controllers, Handlers)
├── ylims.ms.webapi.models/       # DTOs, Models, Response classes
├── ylims.ms.webapi.services/     # Business Logic Layer
└── ylims.ms.webapi.repository/   # Data Access Layer
```

### Directory Structure:

```
ylims.ms.webapi/
├── Controllers/                   # ASP.NET Core Controllers (HTTP endpoints)
├── Handler/
│   ├── Command/                   # Command Handlers (for Create/Update/Delete operations)
│   └── Query/                     # Query Handlers (for Read operations)
├── ServiceCollectionExtensions/   # Dependency Injection configuration
├── FluentValidationCollectionExtensions/  # Fluent Validation setup
├── Validator/
│   ├── Commands/                  # Validators for Commands
│   └── Query/                     # Validators for Queries
└── Properties/
    └── launchSettings.json        # Launch configuration

ylims.ms.webapi.models/
├── DTO/                           # Data Transfer Objects (Response & Request DTOs)
└── Models/
    ├── Commands/                  # Command Models
    └── Query/                     # Query Models

ylims.ms.webapi.services/
├── Commands/                      # Command Services (Business logic for mutations)
│   └── Interface/                 # Service interfaces
└── Query/                         # Query Services (Business logic for reads)
    └── Interface/                 # Service interfaces

ylims.ms.webapi.repository/
├── Commands/                      # Command Repositories (DB operations for mutations)
│   └── Interface/                 # Repository interfaces
└── Query/                         # Query Repositories (DB operations for reads)
    └── Interface/                 # Repository interfaces
```

---

##  DESIGN PATTERNS USED

### 1. **CQRS (Command Query Responsibility Segregation)**
   - **Location:** Handler/ folder separation, Services/ separation, Repository/ separation
   - **Implementation:**
     - Commands: Handle write operations (Create, Update, Delete)
     - Queries: Handle read operations (Get, List, Filter)
   - **Example:**
     - Command: `SaveSupplierDetailsHandler` → writes supplier data
     - Query: `GetAllReportsHandler` → retrieves report data
   - **Benefits:** Separation of concerns, scalability, independent optimization

### 2. **Handler Pattern / Mediator-like Pattern**
   - **Location:** `Handler/` folder
   - **Implementation:**
     - Each operation has a dedicated handler (Handler classes)
     - Handlers implement specific interfaces (`IGetXHandler`, `ISaveXHandler`)
     - Controllers inject and use these handlers
   - **Example:**
     ```csharp
     public class GetCateogoryHandler : IGetCateogoryHandler
     {
         public Task<List<GetCateogoryResponse>> HandleAsync(CancellationToken cancellationToken = default)
     }
     ```
   - **Benefits:** Single responsibility, reusability, testability

### 3. **Layered Architecture (N-Tier)**
   - **Layers:**
     1. **Presentation Layer:** Controllers (HTTP endpoints)
     2. **Handler Layer:** Handlers (Orchestration)
     3. **Service Layer:** Business logic services
     4. **Repository Layer:** Data access layer
     5. **Models Layer:** DTOs and domain models
   - **Flow:** Controller → Handler → Service → Repository → Database

### 4. **Dependency Injection (DI) Pattern**
   - **Location:** `ServiceCollectionExtensions/ServiceCollectionExtensions.cs`
   - **Implementation:**
     - All dependencies registered as `AddScoped<Interface, Implementation>`
     - Fluent validation setup in `FluentValidationCollectionExtensions.cs`
   - **Benefits:** Loose coupling, testability, flexibility
   - **Example:**
     ```csharp
     services.AddScoped<IGetCateogoryHandler, GetCateogoryHandler>()
             .AddScoped<IItemQueryService, ItemQueryService>()
             .AddScoped<IItemQueryRepository, ItemQueryRepository>()
     ```

### 5. **Repository Pattern**
   - **Location:** `ylims.ms.webapi.repository/Commands/` and `Query/`
   - **Implementation:**
     - Abstraction over data access logic
     - Separate Command and Query repositories
   - **Purpose:** Decouple business logic from data access
   - **Examples:**
     - `SupplierCommandRepository` - Write operations
     - `QuotationsQueryRepository` - Read operations

### 6. **Service Layer Pattern**
   - **Location:** `ylims.ms.webapi.services/Commands/` and `Query/`
   - **Implementation:**
     - Business logic orchestration
     - Services use repositories
     - Implements interfaces for abstraction
   - **Examples:**
     - `SupplierCommandService` - Supplier business logic
     - `QuotationsQueryService` - Quotation query logic

### 7. **DTO (Data Transfer Object) Pattern**
   - **Location:** `ylims.ms.webapi.models/DTO/`
   - **Implementation:**
     - Response DTOs: Models used in API responses
     - Request Models: Models used in API requests
     - Separation from domain models
   - **Purpose:** Avoid exposing internal domain models, control API contract

### 8. **Fluent Validation Pattern**
   - **Location:** `ylims.ms.webapi/Validator/` and `FluentValidationCollectionExtensions.cs`
   - **Implementation:**
     - Command validators: `SaveSupplierDetailsCommandValidator`, `SavePurchaseOrderCommandValidator`
     - Query validators: `GetAllSuppliersValidator`, `GetAllItemsQueryValidator`
     - Registered in Startup via DI
   - **Purpose:** Declarative validation rules, separation of validation logic

### 9. **Facade Pattern (Implicit)**
   - **Location:** Controllers using Handlers
   - **Implementation:**
     - Handlers act as facades wrapping complex operations
     - Controllers delegate to handlers
   - **Purpose:** Simplify client interaction with complex subsystems

### 10. **Strategy Pattern**
   - **Location:** Different service implementations
   - **Implementation:**
     - Multiple implementations of same interface (swappable algorithms)
     - Example: Different query services for different entities
   - **Purpose:** Runtime selection of different behaviors

### 11. **Async/Await Pattern**
   - **Location:** Throughout all handlers, services, repositories
   - **Implementation:**
     - All I/O operations are async (`Task<T>`)
     - Cancellation tokens passed through the call chain
   - **Purpose:** Non-blocking operations, scalability
   - **Example:**
     ```csharp
     public async Task<List<GetCateogoryResponse>> HandleAsync(CancellationToken cancellationToken = default)
     ```

---

##  KEY PROJECTS & FILES

### **ylims.ms.webapi (Main Web API)**

#### Controllers (15 controllers):
- `AllReportsController` - Report generation and retrieval
- `DashBoardController` - Dashboard data endpoints
- `EmailController` - Email sending functionality
- `GoodReceiptNotesController` / `GoodsReceiptNotesController` - GRN management
- `IndentController` - Indent (requisition) management
- `ItemsController` - Item/Product management
- `ManufactureController` - Manufacturing data
- `POPaymentHistoryController` - Purchase order payment tracking
- `PurchaseOrderController` - Purchase order management
- `QuotationController` - Quotation management
- `SaveIndenXlController` - Bulk indent import from Excel
- `StoreController` - Store/Location management
- `SupplierController` - Supplier management
- `UploadController` - File upload to AWS S3
- `UserManagementController` - User management
- `WeatherForecastController` - Sample controller

#### Handler Architecture:
- **Command Handlers:** Handle mutations (Create, Update, Delete)
  - `SaveSupplierDetailsHandler`
  - `UpdateSupplierHandler`
  - `DeleteLocationHandler`
  - `UpdatePurchaseOrderStatusHandler`
  - `SaveManufactureCommandHandler`
  - `SaveCentreDetailsCommandHandler`
  - `SaveEmployeeDetailsHandler`
  - `SaveCustomPurchaseUnitHandler`
  - `SaveIndentFromXlHandler`
  - `EmailHandler`
  
- **Query Handlers:** Handle reads
  - `GetCateogoryHandler`
  - `GetAllItemsForIndentHandler`
  - `GetindentitemsHandler`
  - `GetAllItemTypesHandler`
  - `GetIndentConsumeReportsHandler`
  - `GetDashboardDataHandler`
  - Multiple report handlers

#### Dependency Injection:
- `ServiceCollectionExtensions.cs` - Registers 100+ service dependencies
- `FluentValidationCollectionExtensions.cs` - Registers 25+ validators

#### Validation:
- `Validator/Commands/` - Command validators
- `Validator/Query/` - Query validators
- Using FluentValidation library

#### Configuration:
- `Program.cs` - Application startup (older format)
- `Startup.cs` - Service configuration and middleware setup
- Multiple `appsettings.*.json` files for different environments
  - Development
  - Production
  - QA
  - Staging

---

### **ylims.ms.webapi.models (Models & DTOs)**

- **DTOs:** Response and request models
  - Response models ending in `Response` or `Responses`
  - Request models as command/query objects
- **Models/Commands:** Commands representing write operations
- **Models/Query:** Query models for read operations
- **DTO/Helper:** Helper classes like `SuccessResponse`

---

### **ylims.ms.webapi.services (Business Logic)**

#### Command Services (15+ services):
- `EmailCommandService`
- `GRNCommandService`
- `IndentCommandService`
- `IndentFromXlCommandService`
- `ItemCommandService`
- `ManufactureCommandService`
- `PurchaseOrderCommandService`
- `SaveQuotationsCommandService`
- `StoreCommandService`
- `SupplierCommandService`
- `UserManagementCommandService`

#### Query Services (12+ services):
- `EmailTemplatesQueryService`
- `GetAllReportsService`
- `GetDashboardDataService`
- `GetGRNService`
- `GetManufacturesQueryService`
- `GetPurchaseOrderQueryService`
- `IndentService`
- `ItemQueryService`
- `QuotationsQueryService`
- `SupplierService`
- `UserManagementService`

---

### **ylims.ms.webapi.repository (Data Access)**

#### Command Repositories (10+ repositories):
- `CentreDetailsCommandRepository`
- `GRNCommandRepository`
- `IndentCommandRepository`
- `IndentSaveFromXlCommandRepository`
- `ItemCommandRepository`
- `ManufactureCommandRepository`
- `PurchaseOrderCommandRepository`
- `SaveQuotationsCommandRepository`
- `SupplierCommandRepository`
- `UserManagementCommandRepository`

#### Query Repositories:
- Corresponding query repositories for each entity

---

##  REQUEST/RESPONSE FLOW

```
HTTP Request
    ↓
Controller (HTTP endpoint handler)
    ↓
Handler (Interface: IXXXHandler)
    ↓
Service (Interface: IXXXService/IXXXCommandService/IXXXQueryService)
    ↓
Repository (Interface: IXXXRepository/IXXXCommandRepository/IXXXQueryRepository)
    ↓
Database
    ↑
Response flows back through the same layers
    ↓
DTO/Response Model
    ↓
Controller returns ActionResult
    ↓
HTTP Response
```

---

##  EXTERNAL DEPENDENCIES

From `ylims.ms.webapi.csproj`:
- **FluentValidation** (v11.5.1) - Validation framework
- **FluentValidation.AspNetCore** (v11.2.2) - AspNetCore integration
- **Swashbuckle.AspNetCore** (v6.2.3) - Swagger/OpenAPI documentation
- **HtmlAgilityPack** (v1.11.46) - HTML parsing (likely for email templates)
- **AWSSDK.Core** (v3.7.106.9) - AWS SDK core
- **AWSSDK.S3** (v3.7.103.39) - AWS S3 for file uploads
- **Microsoft.AspNetCore.Mvc.NewtonsoftJson** (v6.0.14) - JSON serialization
- **Microsoft.IdentityModel.Logging** (v6.27.0) - Identity/Security logging

---

##  KEY ARCHITECTURAL PRINCIPLES APPLIED

1. **Single Responsibility Principle (SRP)**
   - Each handler, service, and repository has one reason to change
   - Handlers orchestrate, Services contain business logic, Repositories handle data access

2. **Dependency Inversion Principle (DIP)**
   - Code depends on abstractions (interfaces), not concrete implementations
   - All services and repositories use interfaces

3. **Open/Closed Principle (OCP)**
   - Open for extension (new handlers/services), closed for modification
   - Handler and service patterns enable adding new features without modifying existing code

4. **Separation of Concerns (SoC)**
   - CQRS separates reads from writes
   - Layered architecture separates presentation, business logic, and data access
   - Validators separate validation logic

5. **DRY (Don't Repeat Yourself)**
   - Shared handlers, services, validators
   - Base classes and interfaces for common patterns

---

##  SECURITY FEATURES OBSERVED

- **Authorization:** `[AllowAnonymous]` and `[Authorize]` attributes on controllers
- **CORS:** CORS configuration in Startup
- **Identity:** Microsoft.IdentityModel.Logging for identity management
- **AWS Integration:** Secure AWS S3 integration for file uploads

---

##  STATISTICS

- **Controllers:** 15 total
- **Handlers:** 40+ handlers (Commands + Queries)
- **Services:** 25+ services
- **Repositories:** 20+ repositories
- **DTOs:** 100+ DTO classes
- **Validators:** 25+ validators
- **API Endpoints:** 50+ endpoints

---

##  DESIGN PATTERN SUMMARY TABLE

| Pattern | Location | Purpose | Benefits |
|---------|----------|---------|----------|
| CQRS | Handler, Service, Repository layers | Separate read/write | Scalability, clarity |
| Handler/Mediator | Handler/ folder | Orchestrate operations | Single responsibility |
| Layered Architecture | 4 projects | Organize code by concern | Maintainability |
| Dependency Injection | ServiceCollectionExtensions | Manage dependencies | Loose coupling |
| Repository | repository/ folder | Abstract data access | Testability |
| Service | services/ folder | Contain business logic | Reusability |
| DTO | models/DTO/ | Transfer data | API contract control |
| Fluent Validation | Validator/ folder | Declarative validation | Maintainability |
| Async/Await | Throughout | Non-blocking I/O | Scalability |
| Facade | Handlers/Controllers | Simplify interface | Ease of use |
| Strategy | Multiple implementations | Runtime selection | Flexibility |

---

##  KEY TECHNOLOGIES

- **Framework:** ASP.NET Core 6.0
- **Language:** C#
- **API Documentation:** Swagger/OpenAPI (Swashbuckle)
- **Validation:** FluentValidation
- **Cloud Storage:** AWS S3
- **Database:** Connected to database (specific DB not visible in this analysis)
- **Authentication:** Identity Server integration indicated

---

##  CONCLUSION

This is a well-architected, enterprise-grade ASP.NET Core Web API for a Laboratory Information Management System. It demonstrates:

1. **Strong separation of concerns** through layered architecture
2. **Modern design patterns** (CQRS, Handler, Repository, DI)
3. **Scalability** through async operations and proper abstraction
4. **Maintainability** through clear responsibility boundaries
5. **Testability** through interface-based design
6. **Extensibility** through handler/service/repository patterns

The project is ready for:
- Easy feature additions (new handlers/services)
- Testing (mockable dependencies)
- Scaling (async operations, separation of concerns)
- Team development (clear patterns and structure)

