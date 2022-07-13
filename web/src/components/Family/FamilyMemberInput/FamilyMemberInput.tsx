import { FC, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FamilyMember } from '../../../pages/FamilyMembers/FamilyMembers';
import axios from '../../../util/axios';
import { removeLastLetterS } from '../../Header/Header';

export type ActionType = 'add' | 'view' | 'update';

interface FamilyMemberInputProps {
  familyMember: FamilyMember;
  family_id?: number;
  pageAction?: string;
  actionType: ActionType;
  setActionType?: React.Dispatch<React.SetStateAction<ActionType>>;
}

interface MemberAction {
  type: keyof FamilyMember | 'initial';
  payload: string;
  initialState?: FamilyMember;
}

interface SuccessMessage {
  message: string;
  showMessage: boolean;
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

const FamilyMemberInput: FC<FamilyMemberInputProps> = ({
  familyMember,
  pageAction,
  actionType,
  family_id,
  setActionType,
}: FamilyMemberInputProps) => {
  const [memberInfo, dispatch] = useReducer(memberReducer, familyMember);

  const [disabledInputs, setDisabledInputs] = useState(actionType === 'view');
  const [successMessage, setSuccessMessage] = useState<SuccessMessage>({
    message: '',
    showMessage: false,
  });

  const navigate = useNavigate();

  return (
    <div>
      <p id='page-title'>
        {pageAction
          ? pageAction
          : `${disabledInputs ? 'View' : 'Update'} ${
              memberInfo.firstName
            }'${removeLastLetterS(memberInfo.firstName)} details`}
      </p>

      <form
        id='members-form'
        onSubmit={async (e) => {
          e.preventDefault();

          if (actionType === 'add') {
            await axios.post(`/family/${family_id}`, {
              firstName: memberInfo.firstName,
              middleName: memberInfo.middleName,
              relationship: memberInfo.relationship,
            });

            setSuccessMessage({
              showMessage: true,
              message:
                'New member added to the family. Redirecting back in 2 seconds.',
            });
          } else {
            await axios.patch('/family/member', {
              member_id: memberInfo.member_id,
              firstName: memberInfo.firstName,
              middleName: memberInfo.middleName,
              relationship: memberInfo.relationship,
            });

            setSuccessMessage({
              showMessage: true,
              message: 'Details successfully updated.',
            });
          }

          setTimeout(() => {
            setSuccessMessage((old) => ({ ...old, showMessage: false }));

            if (actionType === 'add') navigate(-1);
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

        {actionType === 'view' && (
          <button
            value='Edit Details'
            className='input-box'
            id='enable-input-btn'
            onClick={() => {
              setActionType!('update');
              setDisabledInputs(false);
            }}
          >
            Edit Details
          </button>
        )}

        {(actionType === 'update' || actionType === 'add') && (
          <div>
            <input
              type='submit'
              value='Submit'
              className='input-box'
              id='submit-btn'
            />
            {successMessage.showMessage && (
              <p id='success'>{successMessage.message}</p>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default FamilyMemberInput;
