# Invoice Management and Mailing System
   ``` by Abhishekh Singh (https://github.com/aksweb/tensorgo)```
   
This project is an Invoice Management and Mailing System that provides a comprehensive solution for managing invoices and sending automated email reminders for due payments. The project is divided into **Frontend** and **Backend** sections to ensure clarity and maintainability.

---
# Solution Approach:

1. **Backend API Development:**
   - Developed backend API endpoints to handle:
     - **Authentication** using Google OAuth and JWT tokens.
     - **Invoice management** to fetch, filter, and process invoice data.
     - **Automated email workflows** integrated with Zapier.

2. **Frontend Integration:**
   - Designed a user-friendly interface to display invoices.
   - Implemented features to:
     - Fetch invoice data from the backend via API calls.
     - Filter invoices based on their status (Paid/Due).
     - Display customer details like name, email, purchase date, due date, amount, and payment status.

3. **Zapier Zap Configuration:**
   - Created a Zapier workflow to handle automated emails:
     1. **Step 1:** Set up a webhook in Zapier to receive dynamic email details like recipient name, amount due, and invoice ID.
     2. **Step 2:** Linked the Zapier Gmail service to send automated email reminders using the received data.

4. **Zap Execution Workflow:**
   - Trigger the zap from the frontend:
     1. When the user clicks the **Send Due Alert** button, send a `POST` request to the backend server.
     2. The backend:
        - Filters invoices based on their **Due** status.
        - Prepares the required data (e.g., recipient details and invoice information).
        - Sends the filtered data to the Zapier webhook.
     3. Zapier processes the webhook data and triggers automated email alerts.


## Frontend
### Features:
1. **Google OAuth Login:**
   - Implemented Google OAuth for user authentication.
   - Uses JWT tokens to manage user sessions and control scope throughout the web app.
   - Upon successful login:
     - A code is generated and sent to the backend for authentication via `GET http://localhost:5000/auth/`.
     - The token is saved in `localStorage` as `user-info`.
   - Easy login for existing users and signup for new users.
   - Logic to retain the token on page refresh:
     - The token is checked in `localStorage` and verified for validity.
     - The token expires after the predefined expiration time.
2. **Dashboard:**
   - After logging in, users are redirected to the dashboard (`localhost:5713/dashboard`).
   - Fetch invoices using `GET http://localhost:5000/invoices`:
     - Implemented using the `useEffect` hook for real-time updates.
   - Filter invoices based on **Paid** or **Due** status.
   - Display customer details:
     - Name, email, purchase date, due date, amount, and status.
3. **Persistent User Data:**
   - User information is stored in a MongoDB database for persistent storage.

### Token Retention Logic:
```javascript
const token = localStorage.getItem('user-info');
if (token) {
    // Validate the token (optional call to backend for verification).
    // If valid, set the user session.
}
```
# Backend
## Features:

### 1. **Authentication:**
- **Endpoint:** `GET localhost:5000/auth/google`  
  Handles Google OAuth authentication.
- Uses JWT to issue tokens to authenticated users.
---

### 2. **Invoice Management:**
- **Endpoint:** `GET localhost:5000/invoices`  
  Retrieves all invoice details.
- Filters invoices based on their status (Paid/Due).
- Invoice data is stored in MongoDB for reliability and scalability.
---

### 3. **Automated Email Alerts:**
- Built using **Zapier** for seamless integration:
  1. **Step 1:** Created a webhook in Zapier to receive dynamic email details (recipient name, amount due, invoice ID).
  2. **Step 2:** Integrated Zapier's Gmail service to send automated emails using this webhook.
- **Flow:**
  1. Manager clicks the **Send Due Alert** button.
  2. Sends a `POST` request to `http://localhost:5000/exezap` to execute the `sendDueInvoicesToZapier` function.
  3. Filters due customers and sends their details to the Zapier webhook.
  4. Zapier triggers the Gmail service to send email reminders.
---

## API Endpoints:
### Authentication:
- **Endpoint:** `GET localhost:5000/auth/google`  
  For user authentication.
### Invoice Management:
- **Endpoint:** `GET localhost:5000/invoices`  
  Fetch invoice details.
### Zapier Workflow Execution:
- **Endpoint:** `POST localhost:5000/exezap`  
  Trigger Zapier workflow for email alerts.
---

## Code Structure:
The backend follows **MVC Architecture** to ensure separation of concerns and better maintainability:
- **Model:** Handles database schemas and interactions with MongoDB.
- **View:** Manages data presentation (integrates with the frontend).
- **Controller:** Manages business logic and API endpoints.
---

## Usage Instructions:
### 1. **Clone the Repository:**
```bash
git clone <repository-url>
cd invoice-management-system
npm install
```
### 2. **Set up Environment Variables:**
Ensure the following environment variables are configured in your `.env` file:
- **Database URI for MongoDB**  
  Example: `MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/myDatabase`  
- **Zapier Webhook URL**  
  Example: `ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/<your-webhook-id>/` 
- **Google OAuth Credentials**  
  Example:  `GOOGLE_CLIENT_ID=<your-client-id> GOOGLE_CLIENT_SECRET=<your-client-secret>`
### 3. **Run the Application:**
backend: npm start
frontend: npm run dev



