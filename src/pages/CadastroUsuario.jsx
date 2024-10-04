import { useState } from 'react';
import './CadastroPasseio'; // Arquivo CSS personalizado
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { salvarUsuario } from '../services/userService';

const CadastroUsuario = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    nomeCompleto: '',
    email: '',
    senha: '',
    tipoUsuario: '',
  });

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
 // Função para lidar com as mudanças nos campos do formulário
 const handleChange = (e) => {
  setFormValues({
    ...formValues,
    [e.target.name]: e.target.value,
  });

  // Limpar o erro do campo atual
  setErrors({
    ...errors,
    [e.target.name]: '',
  });

      // Limpar erros gerais
      setGeneralError('');
      setSuccessMessage('');
    };

    // Função para validar o formulário
  const validateForm = () => {
    const newErrors = {};

    // Validar Nome Completo
    if (!formValues.nomeCompleto.trim()) {
      newErrors.nomeCompleto = 'O nome completo é obrigatório.';
    }

    // Validar E-mail
    if (!formValues.email) {
      newErrors.email = 'O e-mail é obrigatório.';
    } else {
      // Regex para validar o formato do e-mail
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formValues.email)) {
        newErrors.email = 'Formato de e-mail inválido.';
      }
    }

    // Validar Senha
    if (!formValues.senha) {
      newErrors.senha = 'A senha é obrigatória.';
    } else {
      if (formValues.senha.length < 8) {
        newErrors.senha = 'A senha deve ter no mínimo 8 caracteres.';
      }
      const hasLetters = /[a-zA-Z]/.test(formValues.senha);
      const hasNumbers = /[0-9]/.test(formValues.senha);
      if (!hasLetters || !hasNumbers) {
        newErrors.senha = 'A senha deve conter letras e números.';
      }
    }

    // Validar Tipo de Usuário
    if (!formValues.tipoUsuario) {
      newErrors.tipoUsuario = 'Selecione o tipo de usuário.';
    }

    setErrors(newErrors);

    // Retorna true se não houver erros
    return Object.keys(newErrors).length === 0;
  };


  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    setGeneralError('');
    setSuccessMessage('');

    if (validateForm()) {
      try {
        salvarUsuario(formValues);
        setSuccessMessage('Usuário cadastrado com sucesso!');

        // Redirecionar para a página de login após cadastro bem-sucedido
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error) {
        setGeneralError(error.message);
      }
    }
  };

  return (
    <div className="cadastro-background">
      <div className="container-cadastro">
        <h2>Cadastro de Usuário</h2>
        {generalError && <Alert variant="danger">{generalError}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="nomeCompleto">
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control
              type="text"
              name="nomeCompleto"
              value={formValues.nomeCompleto}
              onChange={handleChange}
              isInvalid={!!errors.nomeCompleto}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nomeCompleto}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="email" className="mt-3">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="senha" className="mt-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              name="senha"
              value={formValues.senha}
              onChange={handleChange}
              isInvalid={!!errors.senha}
            />
            <Form.Control.Feedback type="invalid">
              {errors.senha}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="tipoUsuario" className="mt-3">
            <Form.Label>Tipo de Usuário</Form.Label>
            <Form.Select
              name="tipoUsuario"
              value={formValues.tipoUsuario}
              onChange={handleChange}
              isInvalid={!!errors.tipoUsuario}
            >
              <option value="">Selecione</option>
              <option value="guia">Guia Turístico</option>
              <option value="turista">Turista</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.tipoUsuario}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-4">
            Cadastrar
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CadastroUsuario;