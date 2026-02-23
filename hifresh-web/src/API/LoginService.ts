const API_URL: string = import.meta.env.VITE_USER_API_BASE_URL;


export const UserService = {

    async login(username: string, password: string) {

        const credentials = btoa(`${username}:${password}`);

        const response = await fetch(`${API_URL}/me`, {
            method: "GET",
            headers: {
                "Authorization": `Basic ${credentials}`,
            },
            credentials: "include",
        });

        if (!response.ok) throw new Error("Inloggning misslyckades");

        return response.text();
    },

    // Logga ut
    async logout() {
        const response = await fetch("http://localhost:8080/logout", {
            method: "POST",
            credentials: "include",
        });
        return response.ok;
    },


    async checkAuth() {
        const response = await fetch(`${API_URL}/me`, {
            method: "GET",
            credentials: "include",
        });

        if (response.ok) {
            return await response.text(); // Returnera namnet istället för bara 'true'
        }
        return null;
    }
}
