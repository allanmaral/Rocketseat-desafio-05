import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { GoIssueClosed, GoIssueOpened } from 'react-icons/go';

import api from '../../services/api';

import Container from '../../components/container';
import {
  Loading,
  Owner,
  IssueList,
  PageNavigator,
  StateSelector,
  IssueState,
} from './styles';

class Repository extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repository: {},
      issues: [],
      loading: true,
      page: 1,
      issueState: 'open',
    };
  }

  componentDidMount = () => {
    this.loadIssues();
  };

  componentDidUpdate = (_, prevState) => {
    const { page, issueState } = this.state;
    if (prevState.page !== page || prevState.issueState !== issueState) {
      this.loadIssues();
    }
  };

  loadIssues = async () => {
    const { match } = this.props;
    const { page, issueState } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: issueState,
          per_page: 5,
          page,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  };

  handlePageChange = value => {
    const { page } = this.state;
    if (!(value === -1 && page === 1)) {
      this.setState({ page: page + value });
    }
  };

  handleChangeIssueState = event => {
    this.setState({ issueState: event.target.value });
  };

  render() {
    const { repository, issues, loading, page, issueState } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssueList>
          <StateSelector
            onChange={this.handleChangeIssueState}
            value={issueState}
          >
            <option value="all">Todos</option>
            <option value="open">Abertos</option>
            <option value="closed">Fechados</option>
          </StateSelector>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <IssueState closed={issue.state !== 'open'}>
                {issue.state === 'open' ? (
                  <GoIssueOpened size={16} color="#fff" />
                ) : (
                  <GoIssueClosed size={16} color="#fff" />
                )}
              </IssueState>
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
          <PageNavigator>
            <button
              type="button"
              disabled={page === 1}
              onClick={() => this.handlePageChange(-1)}
            >
              ◄
            </button>
            <span>{page}</span>
            <button
              type="button"
              disabled={issues.length < 5}
              onClick={() => this.handlePageChange(1)}
            >
              ►
            </button>
          </PageNavigator>
        </IssueList>
      </Container>
    );
  }
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};

export default Repository;
