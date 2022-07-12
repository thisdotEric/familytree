import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Family } from '../Families';
import './FamilyItem.css';

interface FamilyItemProps {
  family: Family;
}

const FamilyItem: FC<FamilyItemProps> = ({
  family: { family_name, address, family_id },
}: FamilyItemProps) => {
  const navigate = useNavigate();

  return (
    <div key={family_id} id='family-item-wrapper'>
      <p className='family-name'>{family_name}</p>
      <p className='address'>{address}</p>
      <button
        id='view-btn'
        onClick={() => {
          navigate(`/family/${family_name}`, {
            state: {
              family_id,
            },
          });
        }}
      >
        View Family Members
      </button>
    </div>
  );
};

export default FamilyItem;
