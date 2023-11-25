// Importe as dependências necessárias para o teste
import { expect, test } from 'vitest';
import UserServices from '../services/users.services';

// Descreva o teste
test('Teste da função create', async () => {
    // Dados de exemplo para o teste
    const userData = {
        nome: 'Teste',
        email: 'teste@example.com',
        senha: 'senha123',
        telefones: [
            { ddd: '21', numero: '123456789' },
        ],
    };

    // Crie uma instância do UserService (ou ajuste conforme necessário)
    const userService = new UserServices();

    // Tente chamar a função create e capture o resultado
    const result = await UserServices.create(userData);

    // Verifique se o resultado contém as propriedades esperadas
    expect(result).to.be.an('object');
    expect(result).to.have.property('id');
    expect(result).to.have.property('data_criacao');
    expect(result).to.have.property('ultimo_login');
    expect(result).to.have.property('token');

    // Você também pode adicionar mais verificações conforme necessário
});
