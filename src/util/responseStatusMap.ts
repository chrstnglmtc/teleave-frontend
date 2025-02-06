export const responseStatusMap: Record<string, number> = {
    "Code sent to Telegram": 200,
    "Already logged in": 200,
    "Login successful.": 200,
    "Two-factor authentication is required.": 400,
    "Invalid code": 400,
    "User is not authorized. Please login first.": 400,
    "No groups or channels found.": 400,
    "Session not found. Please start the login process.": 400,
    "Failed to store session on Xano": 500,
    "Failed to fetch groups after multiple retries": 500,
    "Successfully left selected groups": 200,
    "User not authenticated": 401,
    "Failed to fetch groups: The key is not registered in the system (caused by GetDialogsRequest)": 401
};
