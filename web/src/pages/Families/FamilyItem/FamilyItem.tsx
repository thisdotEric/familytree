import { FC } from 'react';
import { Family } from '../Families';
import './FamilyItem.css';

interface FamilyItemProps {
  family: Family;
}

const FamilyItem: FC<FamilyItemProps> = ({
  family: { family_name, address, family_id },
}: FamilyItemProps) => {
  return (
    <div key={family_id} id='family-item-wrapper'>
      <p className='family-name'>{family_name}</p>
      <p className='address'>{address}</p>
      <button id='view-btn'>View Family Members</button>
    </div>
  );
};

export default FamilyItem;
