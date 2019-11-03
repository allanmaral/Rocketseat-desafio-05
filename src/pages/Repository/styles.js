import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    border: 2px solid #eee;
    width: 100%;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          display: flex;
          flex-direction: row;
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600px;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const PageNavigator = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  &::before {
    width: 100%;
    text-align: center;
    content: 'Página';
    margin-top: 10px;

    font-size: 16px;
    font-weight: bold;
  }

  span {
    font-size: 16px;
  }

  button {
    background: none;
    border: 0;
    outline: none;
    color: #7159c1;
    margin: 5px 10px;
  }

  button:disabled {
    cursor: not-allowed;
    color: #eee;
  }
`;

export const StateSelector = styled.select`
  margin-bottom: 30px;
  max-width: 100px;
`;

export const IssueState = styled.div`
  margin-top: 6px;
  margin-right: 8px;
  padding: 4px;
  border-radius: 4px;
  width: 24px;
  height: 24px;

  flex: 0 !important;

  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ closed }) => (closed ? '#cb2431' : '#2cbe4e')};
`;
