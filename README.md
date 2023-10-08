# anedya-task

## Installation

To get started with this project, follow these steps:

1. Clone the repository locally:

2. Install project dependencies using the following command:
   ```bash
   npm install
   ```

## Usage

After installing the dependencies, you can start the server using the following command:

```bash
node index.js
```

## API Testing

To test the API using Postman, use the following details:

- API Endpoint: `localhost:3000/scheduleJob`
- Payload:

```json
{
  "executionTime": "YYYY-MM-DD HH:mm",
  "webhookUrl": "your_webhook_url_here"
}
```

Replace `"YYYY-MM-DD HH:mm"` with the desired execution time in the specified format (ex. 2023-10-08 23:57) and `"your_webhook_url_here"` with your actual webhook URL.

## Sample API Test

I've tested this API with a webhook URL and execution time. Attached screenshot
