import styled from 'styled-components';
import LoginForm from '../components/Auth/LoginForm';
import { authPagesStyles } from '../styles/globalStyles';

const Root = styled.div`
  ${authPagesStyles}
`;

const login = () => (
  <Root>
    <LoginForm />
  </Root>
);

export default login;
