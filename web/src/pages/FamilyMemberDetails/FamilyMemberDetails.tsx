import { FC, useEffect, useReducer, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FamilyMember } from '../FamilyMembers/FamilyMembers';
import './FamilyMemberDetails.css';
import axios from '../../util/axios';
import { removeLastLetterS } from '../../components/Header/Header';

interface FamilyMemberDetailsProps {}

interface MemberAction {
  type: keyof FamilyMember | 'initial';
  payload: string;
  initialState?: FamilyMember;
}

function memberReducer(
  state: FamilyMember,
  action: MemberAction
): FamilyMember {
  switch (action.type) {
    case 'initial':
      return { ...action.initialState! };
    case 'firstName':
      return { ...state, firstName: action.payload };
    case 'middleName':
      return { ...state, middleName: action.payload };
    case 'lastName':
      return { ...state, lastName: action.payload };
    case 'address':
      return { ...state, address: action.payload };
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
    firstName: '',
    middleName: '',
    lastName: '',
    member_id: -1,
    relationship: 'child',
  });

  const { state } = useLocation();
  const [disabledInputs, setDisabledInputs] = useState(
    (state as any).editDetails
  );
  const [successUpdate, setSucessUpdate] = useState(false);

  const getFamilyMemberDetails = async () => {
    const member_id = (state as any).member_id;

    const { data } = await axios.get(`/family/member/${member_id}`);
    dispatch({ type: 'initial', payload: '', initialState: data });
  };

  useEffect(() => {
    getFamilyMemberDetails();
  }, []);

  return (
    <div>
      <p id='page-title'>
        {disabledInputs ? 'View' : 'Update'} {memberInfo.firstName}'
        {removeLastLetterS(memberInfo.firstName)} details
      </p>

      <form
        id='members-form'
        onSubmit={async (e) => {
          e.preventDefault();

          await axios.patch('/family/member', {
            member_id: memberInfo.member_id,
            firstName: memberInfo.firstName,
            middleName: memberInfo.middleName,
            relationship: memberInfo.relationship,
          });

          setSucessUpdate(true);

          setTimeout(() => {
            setSucessUpdate(false);
          }, 2000);
        }}
      >
        <label>Relationship</label>
        <select
          className='input-box'
          disabled={disabledInputs}
          value={memberInfo.relationship}
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
          className='input-box'
          value={memberInfo.firstName}
          disabled={disabledInputs}
          onChange={(e) =>
            dispatch({ type: 'firstName', payload: e.target.value })
          }
        />

        <label>Middle Name</label>
        <input
          type='text'
          className='input-box'
          value={memberInfo.middleName}
          disabled={disabledInputs}
          onChange={(e) =>
            dispatch({ type: 'middleName', payload: e.target.value })
          }
        />

        <label>Last Name</label>
        <input
          type='text'
          className='input-box'
          disabled
          value={memberInfo.lastName}
          onChange={(e) =>
            dispatch({ type: 'lastName', payload: e.target.value })
          }
        />

        <label>Address</label>
        <input
          type='text'
          className='input-box'
          disabled
          value={memberInfo.address}
          onChange={(e) =>
            dispatch({ type: 'address', payload: e.target.value })
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
          <div>
            <input
              type='submit'
              value='Submit'
              className='input-box'
              id='submit-btn'
            />
            {successUpdate && <p id='success'>Details successfully updated.</p>}
          </div>
        )}
      </form>
    </div>
  );
};

export default FamilyMemberDetails;
