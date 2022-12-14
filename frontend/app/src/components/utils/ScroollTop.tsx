import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const ScrollTop = () => {
  const history = useHistory();

  useEffect(() => {
    const scrollTop = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => scrollTop();
  }, [history]);

  return null;
}