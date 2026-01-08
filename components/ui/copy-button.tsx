'use client';

import * as React from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CopyButtonProps {
  value: string;
}

export function CopyButton({ value, ...props }: CopyButtonProps) {
  const [isCopied, setIsCopied] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <Button onClick={copyToClipboard} size="icon" {...props}>
      {isCopied ? <Check className="h-4 w-4 " /> : <Copy className="h-4 w-4" />}
    </Button>
  );
}
