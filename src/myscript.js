// Set your Discord user ID
let userID = "410888180796227598";

// Fetches data from Lanyard
async function getLanyard() {
    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userID}`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching Lanyard data:", error);
        throw error;
    }
}

// Update the Discord card based on Discord status
async function updateDiscordCard() {
    try {
        const userData = await getLanyard();
        const { discord_status } = userData;
        const discordCard = document.querySelector(".discord");

        // Reset text to just "Discord"
        discordCard.querySelector(".title").textContent = "Discord";

        // Append status text based on Discord status
        if (discord_status === "online") {
            discordCard.querySelector(".title").textContent += " (Online)";
        } else if (discord_status === "dnd") {
            discordCard.querySelector(".title").textContent += " (Do Not Disturb)";
        } else if (discord_status === "idle") {
            discordCard.querySelector(".title").textContent += " (Idle)";
        } else {
            discordCard.querySelector(".title").textContent += " (Offline)";
        }
    } catch (error) {
        console.error("Error updating Discord card:", error);
    }
}

// Call updateDiscordCard initially
updateDiscordCard();

// Update Discord card periodically using setInterval
setInterval(updateDiscordCard, 60000); // Update every minute (adjust interval as needed)
