export async function viaCep(cep) {
    try {
        const response = await fetch(`/api/ws/${cep}/json/`);

        if (!response.ok) throw new Error('CEP não encontrado');

        const data = await response.json();

        if (data.erro) throw new Error('CEP não encontrado');

        return data;

    } catch (error) {
        console.error('Erro ao buscar CEP:', error.message)
    }
}