import { useEffect, useState } from 'react';

export function useExternalCheck() {
  const [isExternal, setIsExternal] = useState(false);

  useEffect(() => {
    const ref = document.referrer;
    setIsExternal(ref.length === 0 && !ref.startsWith(window.location.origin));
  }, []);

  return isExternal;
}
