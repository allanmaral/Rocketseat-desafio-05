import React, { Component } from 'react';
import { FaGithub, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import { Container, Form, SubmitButton } from './styles';

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

  handleSubmit = async event => {
    event.preventDefault();
    const { newRepo } = this.state;
    this.setState({ loading: true });

    try {
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
        error: err,
        loading: false,
      });
    }
  };

  handleInputChange = event => {
    this.setState({ newRepo: event.target.value });
  };

  render() {
    const { error, loading, newRepo } = this.state;

    return (
      <Container>
        <h1>
          <FaGithub />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar Repositório"
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
          {error && <h1>Error</h1>}
        </Form>
      </Container>
    );
  }
}

export default Main;
