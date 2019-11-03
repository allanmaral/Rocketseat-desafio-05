import React, { Component } from 'react';
import { FaGithub, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/container';
import { Form, SubmitButton, List, TextInput } from './styles';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      loading: false,
      newRepo: '',
      repositories: [],
    };
  }

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(props, prevState) {
    const { repositories } = this.state;
    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { newRepo, repositories } = this.state;
    this.setState({ loading: true });

    try {
      if (repositories.find(repo => repo.name === newRepo)) {
        this.setState({ newRepo: '' });
        throw new Error('Repositório duplicado');
      }

      const response = await api.get(`/repos/${newRepo}`);
      const data = {
        name: response.data.full_name,
      };

      this.setState(state => ({
        loading: false,
        error: null,
        repositories: [...state.repositories, data],
        newRepo: '',
      }));
    } catch (err) {
      this.setState({
        error: err.message,
        loading: false,
      });
    }
  };

  handleInputChange = event => {
    this.setState({ newRepo: event.target.value });
  };

  render() {
    const { error, loading, newRepo, repositories } = this.state;

    return (
      <Container>
        <h1>
          <FaGithub />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <TextInput
            type="text"
            placeholder="Adicionar Repositório"
            error={error}
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

export default Main;
