export class CustomerApi {

    async generateCustomerId() {
        try {
            const response = await fetch("http://localhost:8080/poss/customer?action=getCustomerId");
            const custId = await response.json();
            return custId;
        } catch (error) {
            throw new Error('Error generating student ID',error);
        }
    }
}
