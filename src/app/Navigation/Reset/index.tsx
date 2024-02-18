import type { FC } from 'react';
import Button from '~/components/ui/Button';
import Clean from '~/icons/Clean';

const Reset: FC = () => (
  <Button title="Reset to default" variant="ghost" size="icon">
    <Clean className="w-5 h-5" />
  </Button>
);

export default Reset;
