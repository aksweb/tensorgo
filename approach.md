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
