# Readlyst Project

Readlyst is a book listing and sharing platform that allows people to add book details, including a cover image, and browse available books online. It consists of a **frontend** built with React and a **backend** using Node.js, Express, and Firestore. All images are stored in a **Google Cloud Storage** bucket, making it ideal for a fully serverless and cloud-backed application.

## Features

*  Add a book with its cover, title, author, and price
*  Store book images securely in GCS
*  List available books with title, author, and cover image
*  Fully connected with Firestore for data storage
*  Responsive design built with React and hosted on GCS

## Architecture

* **Frontend**: React app (hosted on GCS)
* **Backend**: Node.js + Express server (hosted on a VM)
* **Database**: Firestore (Google Cloud)
* **Storage**: GCS Bucket for cover images

## Getting Started

### Install Dependencies

```bash
npm install
```

### Configure Service Account

* Put your `readlyst-svc.json` service account file in the server directory.

### Run the Server

```bash
node server.js
```

Server will run on `http://localhost:5000`

### Build and Upload the Frontend

```bash
npm run build
```

Upload `dist` directory to your GCS bucket:

```bash
gsutil cp -r dist/* gs://readlyst-frontend/
gsutil web set -m index.html -e index.html gs://readlyst-frontend/
```

### Usage

* Open the GCS site link for the frontend.
* Add a book from the form.
* Book details and cover image get stored in Firestore and GCS.

## Notes

* Ensure you have a valid GCP account and billing enabled.
* Always update IP addresses in the frontend for making API calls.
* Maintain `.env` and service account files securely.

## Technologies Used

* Node.js / Express
* React / Vite
* Firestore
* GCS

Thank you for checking out Readlyst! Enjoy listing and exploring books online!
