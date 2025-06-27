# Readlyst - Cloud-native Book Sharing Platform

Readlyst is a cloud-powered application that allows users to share, browse, and discover books uploaded by others. Users can upload a book with a cover image and details like title, author, and price. The platform stores and processes this data using modern Google Cloud services, ensuring scalability and real-time operations.

---

## Tech Stack

### Frontend
- React.js (with Vite)
- React Router DOM
- Tailwind CSS

### Backend
- Node.js with Express.js
- Multer (for file uploads)

### Cloud Services
- Google Cloud Storage (GCS)
- Firestore (NoSQL DB)
- Compute Engine (VM)
- Pub/Sub (Event-based messaging)
- Cloud Functions (Serverless processing)
- BigQuery (Analytics & logging)

---

## Project Workflow Summary

1. The user logs in or registers via the frontend (authentication powered by Firebase).
2. Once authenticated, the user can:
   - Browse books uploaded by others (fetched from Firestore).
   - Or upload their own book for sale or donation.
3. When uploading a book:
   - The frontend sends book details and the cover image to the backend (running on a VM).
   - The backend:
     - Uploads the image to Google Cloud Storage.
     - Stores metadata in Firestore.
     - Publishes a message to a Pub/Sub topic for asynchronous processing.
4. A Cloud Function subscribed to the topic receives the message.
5. That function logs the book upload data to BigQuery for future analytics and reporting.

---

## Application Architecture Diagram

![Readlyst Architecture](https://github.com/user-attachments/assets/4571a47f-4260-4f47-abd7-85c958227ee6)

This diagram visualizes the entire flow from user upload to data processing in the cloud. It includes the frontend hosted on Cloud Storage, the backend running on Compute Engine, and the cloud-native services used for data handling and logging.

---

## Cloud Services Used and Their Roles

- **Cloud Storage**  
  Used to store cover images of books. When a user uploads a cover, it gets stored in a publicly accessible Cloud Storage bucket, and its URL is saved in Firestore.

- **Firestore**  
  Acts as the primary NoSQL database. It stores book metadata like title, author, price, description, owner info, and the image URL. Firestore is serverless and scales automatically.

- **Compute Engine (VM)**  
  Hosts the Express backend server. It handles API requests, uploads images to Cloud Storage, saves book details to Firestore, and publishes messages to Pub/Sub.

- **Pub/Sub**  
  Enables an event-driven architecture. After a book is uploaded, the backend publishes a message to the `book-uploaded` topic. This allows asynchronous processing such as logging or future notifications, without blocking the user's request.

- **Cloud Functions**  
  Subscribed to the Pub/Sub topic. Every time a book is uploaded, the Cloud Function is triggered and receives the metadata. It's responsible for backend tasks that don't require real-time execution, such as storing logs in BigQuery.

- **BigQuery**  
  Used for logging and analytics. The Cloud Function logs each book upload into the `book_uploads` table within the `readlyst_dataset`. This enables data analysis, dashboard integration (e.g., Looker Studio), and insights on user activity or platform usage.

---

## Getting Started (Local Development)

1. Clone the repository:
   ```bash
   git clone https://github.com/aravmahind/Readlyst.git
   cd Readlyst

2. Install Frontend and Backend Dependencies
bash
Copy
Edit
# For frontend
npm install

# For backend
cd server
npm install

3. Add Google Cloud Service Account Key
Place your readlyst-svc.json in the project root or inside /server.

Ensure it’s included in .gitignore so it doesn't get pushed to GitHub.

4. Start the Backend
bash
Copy
Edit
node server/server.js

5. Run the Frontend
bash
Copy
Edit
npm run dev

---

## Contributors
Arav Mahind – Idea, development, and deployment of the full Readlyst project.

Google Cloud – Providing the backend services powering the architecture.

ChatGPT (OpenAI) – Assisted in designing architecture, debugging, and setting up cloud integrations.
