import { FC } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './NotFound.css';

interface NotFoundProps {}

const NotFound: FC<NotFoundProps> = ({}: NotFoundProps) => {
  return (
    <div id='not-found-wrapper'>
      <p id='not-found'>404 Page not found.</p>
      <Link to={'/'} id='link'>
        Go to home
      </Link>
    </div>
  );
};

export default NotFound;
