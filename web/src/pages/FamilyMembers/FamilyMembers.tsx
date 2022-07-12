import { FC, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './FamilyMembers.css';

interface FamilyMembersProps {}

export interface FamilyMember {
  member_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  relationship: string;
}

const FamilyMembers: FC<FamilyMembersProps> = ({}: FamilyMembersProps) => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      member_id: 1,
      first_name: 'Alfonso Jr.',
      middle_name: 'Babay',
      last_name: 'Siguenza',
      relationship: 'Father',
    },
    {
      member_id: 2,
      first_name: 'John Eric',
      middle_name: 'Mendoza',
      last_name: 'Siguenza',
      relationship: 'child',
    },
    {
      member_id: 3,
      first_name: 'Mark Adrian',
      middle_name: 'Mendoza',
      last_name: 'Siguenza',
      relationship: 'child',
    },
  ]);

  const params = useParams();
  const location = useLocation();

  console.log(params, location);

  return (
    <div id='family-member-wrapper'>
      {familyMembers.map(
        ({ last_name, middle_name, first_name, member_id, relationship }) => (
          <div className='family-member' key={member_id}>
            {/* <span id='relationship'>{relationship} </span> */}
            <p>
              {last_name}, {first_name} {middle_name} &nbsp;
              <span id='relationship'>{relationship}</span>
            </p>

            <div className='actions'>
              <button className='action-btn' id='details'>
                Details
              </button>
              &nbsp;&nbsp;
              <button className='action-btn'>Update</button>
              &nbsp;&nbsp;
              <button className='action-btn' id='delete'>
                Delete
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default FamilyMembers;
