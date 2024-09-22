import type { FC } from 'react';
import Container from '~/components/Container';
import Error from '~/icons/Error';
import { clearMessage } from './store';

const { Action } = Container;

const Clear: FC = () => (
  <Action title="Clear console" onClick={clearMessage}>
    <Error className="w-5 h-5 rotate-90" />
  </Action>
);

export default Clear;
