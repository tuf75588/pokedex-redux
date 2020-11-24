import { useCallback, useState } from 'react';

function useTrigger() {
  const [listener, setListener] = useState<number>(0);
  const trigger = useCallback(() => setListener((l) => l + 1), []);
  return { listener, trigger };
}

export default useTrigger;
