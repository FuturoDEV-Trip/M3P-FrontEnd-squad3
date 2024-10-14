export async function destiny(cep) {
    try {
        const response = await fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
        if (!response.ok) {
            throw new Error('Erro na solicitação para a API');
        }
        const data = await response.json();
        if (data) {

            const { lat, lng, address_type, address_name, address, district, city, state } = data;

            const destinyLocation = `${address}, ${district}, ${city} - ${state}`;

            return { lat, lng, address_type, address_name, address, district, city, state, destinyLocation };

        } else {
            throw new Error('CEP not found');
        }
    } catch (error) {
        throw new Error('Error in the request to the API');
    }
}