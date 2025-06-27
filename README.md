# Readlyst - Cloud-native Book Sharing Platform

Readlyst is a cloud-powered application that allows users to share, browse, and discover books uploaded by others. Users can upload a book with a cover image and details like title, author, and price. The platform stores and processes this data using modern Google Cloud services, ensuring scalability and real-time operations.

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

### Google Cloud Storage

Used to store cover images of books. When a user uploads a cover, it gets stored in a publicly accessible Cloud Storage bucket, and its URL is saved in Firestore.

### Firestore

Acts as our primary NoSQL database. It stores book metadata like title, author, price, description, owner info, and image URL. Firestore is serverless and scales automatically.

### Compute Engine (VM)

Used to host the Express backend server. It handles API requests, uploads images, saves book details, and triggers Pub/Sub messages.

### Pub/Sub

Used for decoupled, event-driven architecture. After a book is uploaded, the backend sends a message to the `book-uploaded` topic. This allows asynchronous processing, like logging or notifications, without blocking the main request.

### Cloud Functions

Subscribed to the Pub/Sub topic. Whenever a book is uploaded, the function is triggered with book metadata. It is responsible for processing tasks that don't need to happen in real-time, such as writing logs to BigQuery.

### BigQuery

Used for logging and analytics. The function logs each book upload as a new row in the `book_uploads` table in the `readlyst_dataset` dataset. This makes it easy to analyze trends, generate reports, or integrate with dashboards like Looker Studio.

---

## Credits

* **Arav Mahind** - Idea, development, and deployment of the full Readlyst project.
* **Google Cloud** - Providing the backend services powering the architecture.
* **ChatGPT (OpenAI)** - Assisted in designing architecture, debugging, and setting up cloud integrations.
