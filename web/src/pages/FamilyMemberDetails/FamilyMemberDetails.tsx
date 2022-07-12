import { FC, useReducer, useState } from 'react';
import { FamilyMember } from '../FamilyMembers/FamilyMembers';
import './FamilyMemberDetails.css';

interface FamilyMemberDetailsProps {}

interface MemberAction {
  type: keyof FamilyMember;
  payload: string;
}

function memberReducer(
  state: FamilyMember,
  action: MemberAction
): FamilyMember {
  switch (action.type) {
    case 'first_name':
      return { ...state, first_name: action.payload };
    case 'middle_name':
      return { ...state, middle_name: action.payload };
    case 'last_name':
      return { ...state, last_name: action.payload };
    case 'relationship':
      return { ...state, relationship: action.payload };
    default:
      return state;
  }
}

const FamilyMemberDetails: FC<
  FamilyMemberDetailsProps
> = ({}: FamilyMemberDetailsProps) => {
  const [memberInfo, dispatch] = useReducer(memberReducer, {
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
        <select
          className='input-box'
          disabled={disabledInputs}
          onChange={(e) =>
            dispatch({ type: 'relationship', payload: e.target.value })
          }
        >
          <option value={'mother'}>Mother</option>
          <option value={'father'}>Father</option>
          <option value={'child'}>Child</option>
        </select>

        <label>First Name</label>
        <input
          type='text'
          name='first_name'
          className='input-box'
          value={memberInfo.first_name}
          disabled={disabledInputs}
          onChange={(e) =>
            dispatch({ type: 'first_name', payload: e.target.value })
          }
        />

        <label>Middle Name</label>
        <input
          type='text'
          name='middle_name'
          className='input-box'
          value={memberInfo.middle_name}
          disabled={disabledInputs}
          onChange={(e) =>
            dispatch({ type: 'middle_name', payload: e.target.value })
          }
        />

        <label>Last Name</label>
        <input
          type='text'
          name='last_name'
          className='input-box'
          disabled={disabledInputs}
          value={memberInfo.last_name}
          onChange={(e) =>
            dispatch({ type: 'last_name', payload: e.target.value })
          }
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
