import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './FamilyMembers.css';
import axios from '../../util/axios';
import { useSetHeader } from '../../hooks';

interface FamilyMembersProps {}

export interface FamilyMember {
  member_id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  relationship: string;
  address?: string;
}

const FamilyMembers: FC<FamilyMembersProps> = ({}: FamilyMembersProps) => {
  useSetHeader('Siguenza');
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);

  const location = useLocation();
  const navigate = useNavigate();

  const memberAction = (
    editDetails: boolean,
    member_id: number,
    firstName: string
  ) => {
    navigate(`${location.pathname}/${firstName}`, {
      state: {
        editDetails,
        member_id,
      },
    });
  };

  const getAllFamilyMembers = async () => {
    const family_id = (location.state as any).family_id;
    const { data } = await axios.get(`/family/${family_id}`);

    setFamilyMembers(data);
  };

  useEffect(() => {
    getAllFamilyMembers();
  }, []);

  return (
    <div id='family-member-wrapper'>
      {familyMembers.map(
        ({
          lastName: last_name,
          middleName: middle_name,
          firstName: first_name,
          member_id,
          relationship,
        }) => (
          <div className='family-member' key={member_id}>
            <p>
              {last_name}, {first_name} {middle_name} &nbsp;
              <span id='relationship'>{relationship}</span>
            </p>

            <div className='actions'>
              <button
                className='action-btn'
                id='details'
                onClick={() => {
                  memberAction(true, member_id, first_name);
                }}
              >
                Details
              </button>
              &nbsp;&nbsp;
              <button
                className='action-btn'
                onClick={() => {
                  memberAction(false, member_id, first_name);
                }}
              >
                Update
              </button>
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
