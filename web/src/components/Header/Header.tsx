import { FC } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  banner?: string;
}

export function removeLastLetterS(name: string) {
  return name[name.length - 1] === 's' ? '' : 's';
}

const Header: FC<HeaderProps> = ({ banner }: HeaderProps) => {
  return (
    <div className='header-wrapper'>
      <Link to={'/'} id='home-link'>
        <p id='app-name'>
          family<span id='tree'>tree</span>
        </p>
      </Link>
      {banner && (
        <p id='inner-text'>
          of the <span id='family-name'>{banner}</span>'
          {removeLastLetterS(banner)}
        </p>
      )}
    </div>
  );
};

export default Header;
