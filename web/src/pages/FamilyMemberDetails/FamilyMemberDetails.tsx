import { FC, useState } from 'react';
import { FamilyMember } from '../FamilyMembers/FamilyMembers';
import './FamilyMemberDetails.css';

interface FamilyMemberDetailsProps {}

const FamilyMemberDetails: FC<
  FamilyMemberDetailsProps
> = ({}: FamilyMemberDetailsProps) => {
  const [memberInfo, setMemberInfo] = useState<FamilyMember>({
    first_name: 'John Eric',
    middle_name: 'Mendoza',
    last_name: 'Siguenza',
    member_id: 1,
    relationship: 'child',
  });

  const [disabledInputs, setDisabledInputs] = useState(true);

  return (
    <div>
      <p id='page-title'>Update John Eric's details</p>

      <form
        id='members-form'
        onSubmit={(e) => {
          e.preventDefault();

          console.log(memberInfo);
        }}
      >
        <label>Relationship</label>
        <select className='input-box' disabled={disabledInputs}>
          <option>Mother</option>
          <option>Father</option>
          <option>Child</option>
        </select>
        <label>First Name</label>
        <input
          type='text'
          name='first_name'
          className='input-box'
          value={memberInfo.first_name}
          disabled={disabledInputs}
        />

        <label>Middle Name</label>
        <input
          type='text'
          name='middle_name'
          className='input-box'
          value={memberInfo.middle_name}
          disabled={disabledInputs}
        />

        <label>Last Name</label>
        <input
          type='text'
          name='last_name'
          className='input-box'
          disabled={disabledInputs}
          value={memberInfo.last_name}
        />

        {disabledInputs ? (
          <button
            value='Edit Details'
            className='input-box'
            id='enable-input-btn'
            onClick={() => {
              setDisabledInputs(!disabledInputs);
            }}
          >
            Edit Details
          </button>
        ) : (
          <input
            type='submit'
            value='Submit'
            className='input-box'
            id='submit-btn'
          />
        )}
      </form>
    </div>
  );
};

export default FamilyMemberDetails;
