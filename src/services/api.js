import CONFIG from "../config";

export const generateNotes = async (file) => {
  if (!file) throw new Error("No file selected");

  const formData = new FormData();
  formData.append("file", file);

  console.log("📤 Posting data to n8n...", {
    url: CONFIG.BASE_URL,
    fileName: file.name,
    fileSize: file.size,
  });

  try {
    const response = await fetch(CONFIG.BASE_URL, {
      method: "POST",
      body: formData,
    });

    console.log(`📥 Received response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(
          "n8n Webhook not found (404). \n1. Check if n8n is running.\n2. If workflow is not 'Active', check if you are using 'webhook-test' in config.js."
        );
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Server error: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Data received successfully:", data);
    return data;
  } catch (error) {
    if (error.message === "Failed to fetch") {
      throw new Error("Could not reach n8n. Please ensure n8n is running on port 5678.");
    }
    console.error("🚨 API Error:", error);
    throw error;
  }
};
