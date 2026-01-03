// 🛠️ CONFIGURATION
// ---------------------------------------------------------
// 1. Set to FALSE if you are clicking "Execute Workflow" in n8n (Testing)
// 2. Set to TRUE if you have toggled the workflow to "Active" (Production)
const IS_PRODUCTION = false;

const CONFIG = {
    // n8n Webhook URL parts
    BASE_URL: `http://localhost:5678/${IS_PRODUCTION ? "webhook" : "webhook-test"}/ai-notes`,

    // App constraints
    MAX_FILE_SIZE_MB: 10,
    SUPPORTED_TYPES: ["application/pdf"],
};

export default CONFIG;
