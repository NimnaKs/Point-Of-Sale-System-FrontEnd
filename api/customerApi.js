export class CustomerApi {

    // Function to handle common logic for HTTP requests
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
                const responseData = await response.json();
                return responseData;
            } else {
                throw new Error(`HTTP request failed with status ${response.status}`);
            }
        } catch (error) {
            throw new Error(`Error during HTTP request: ${error.message}`);
        }
    }

    // Updated getAllStudent using Fetch API
    async getAllStudent() {
        return handleHttpRequest("http://localhost:8080/poss/customer?action=getAllCustomers", "GET");
    }

    // Updated deleteStudent using Fetch API
    async deleteStudent(custId) {
        return handleHttpRequest(`http://localhost:8080/poss/customer?customerId=${custId}`, "DELETE");
    }

    // Updated generateCustomerId using Fetch API
    async generateCustomerId() {
        return handleHttpRequest("http://localhost:8080/poss/customer?action=getCustomerId", "GET");
    }

    // Updated updateCustomer using Fetch API
    async updateCustomer(customer) {
        return handleHttpRequest("http://localhost:8080/poss/customer", "PUT", customer);
    }

    // Updated saveCustomer using Fetch API
    async saveCustomer(customer) {
        return handleHttpRequest("http://localhost:8080/poss/customer", "POST", customer);
    }

    // Updated getStudent using Fetch API
    async getStudent(custId) {
        return handleHttpRequest(`http://localhost:8080/poss/customer?action=getCustomer&customerId=${custId}`, "GET");
    }

}

