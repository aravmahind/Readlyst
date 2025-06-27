import { BigQuery } from '@google-cloud/bigquery';

const bigquery = new BigQuery();

export const logBookUpload = async (message, context) => {
  const data = JSON.parse(Buffer.from(message.data, 'base64').toString());

  const datasetId = 'readlyst_dataset';
  const tableId = 'book_uploads';

  const rows = [data]; 

  try {
    await bigquery.dataset(datasetId).table(tableId).insert(rows);
    console.log(`Inserted book log into BigQuery: ${data.title}`);
  } catch (err) {
    console.error('Error inserting into BigQuery:', err);
  }
};
