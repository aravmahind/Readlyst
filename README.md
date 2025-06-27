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
- Google Cloud Storage (GCS)
- Firestore (NoSQL DB)
- Pub/Sub (Event-based messaging)
- Cloud Functions (Serverless processing)
- BigQuery (Analytics & logging)

---

## Project Workflow Summary

1. User uploads a book along with the cover image using the web frontend.
2. The frontend sends the data to the backend API hosted on a Virtual Machine (VM).
3. The backend:

   * Uploads the image to Google Cloud Storage.
   * Stores book details in Firestore.
   * Publishes a message to a Pub/Sub topic for further processing.
4. A Cloud Function subscribed to the topic receives the message asynchronously.
5. The Cloud Function logs the uploaded book details to BigQuery for analytics and monitoring.

---

## Application Architecture Diagram

![image](https://github.com/user-attachments/assets/4571a47f-4260-4f47-abd7-85c958227ee6)

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

## Credits

* **Arav Mahind** - Idea, development, and deployment of the full Readlyst project.
* **Google Cloud** - Providing the backend services powering the architecture.
* **ChatGPT (OpenAI)** - Assisted in designing architecture, debugging, and setting up cloud integrations.
