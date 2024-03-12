import type { FC } from 'react';
import Button from '~/components/ui/Button';
import { useToggle } from '~/hooks/useToggle';
import Check from '~/icons/Check';
import ShareIcon from '~/icons/Share';

const Share: FC = () => {
  const [copied, toggleCopied] = useToggle();

  const handleCopy = async () => {
    if (copied) {
      return;
    }

    try {
      await navigator.clipboard.writeText(location.href);
      toggleCopied.on();
    } finally {
      setTimeout(() => toggleCopied.off(), 2000);
    }
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      title="Copy sharable URL"
      onClick={handleCopy}
    >
      {copied
        ? <Check className="size-5 text-green-600" />
        : <ShareIcon className="size-5" />}
    </Button>
  );
};

export default Share;
