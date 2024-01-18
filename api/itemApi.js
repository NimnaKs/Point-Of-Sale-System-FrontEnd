export class ItemApi {

    async handleHttpRequest(url, method, data = null) {
        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: data ? JSON.stringify(data) : null,
            });

            if (response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const responseData = await response.json();
                    return responseData;
                } else {
                    return await response.text();
                }
            } else {
                throw new Error(`HTTP request failed with status ${response.status}`);
            }
        } catch (error) {
            throw new Error(`Error during HTTP request: ${error.message}`);
        }
    }
    
    async getAllItems() {
        return this.handleHttpRequest("http://localhost:8080/poss/item?action=getAllItems", "GET");
    }

    async deleteItem(itemCode) {
        return this.handleHttpRequest(`http://localhost:8080/poss/item?itemCode=${itemCode}`, "DELETE");
    }

    async generateProductId() {
        return this.handleHttpRequest("http://localhost:8080/poss/item?action=getItemCode", "GET");
    }

    async updateItem(item) {
        return this.handleHttpRequest("http://localhost:8080/poss/item", "PUT", item);
    }

    async saveItem(item) {
        console.log(item.file);
        return this.handleHttpRequest("http://localhost:8080/poss/item", "POST", item);
    }

    async getItem(itemCode) {
        return this.handleHttpRequest(`http://localhost:8080/poss/item?action=getItem&itemCode=${itemCode}`, "GET");
    }

}
