import { FC } from 'react';
import './Header.css';

interface HeaderProps {
  banner?: string;
}

const Header: FC<HeaderProps> = ({ banner }: HeaderProps) => {
  return (
    <div className='header-wrapper'>
      <p id='app-name'>
        family<span id='tree'>tree</span>
      </p>
      {banner && (
        <p id='inner-text'>
          of the <span id='family-name'>{banner}</span>'s
        </p>
      )}
    </div>
  );
};

export default Header;
