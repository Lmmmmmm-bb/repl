import type { FC } from 'react';
import Button from '~/components/ui/Button';
import ShareIcon from '~/icons/Share';

const Share: FC = () => (
  <Button title="Copy sharable URL" variant="ghost" size="icon">
    <ShareIcon className="w-5 h-5" />
  </Button>
);

export default Share;
