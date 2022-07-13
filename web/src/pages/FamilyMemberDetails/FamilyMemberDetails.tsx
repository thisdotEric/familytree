import { FC, useEffect, useReducer, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FamilyMember } from '../FamilyMembers/FamilyMembers';
import './FamilyMemberDetails.css';
import axios from '../../util/axios';
import FamilyMemberInput from '../../components/Family/FamilyMemberInput';
import { removeLastLetterS } from '../../components/Header/Header';
import { ActionType } from '../../components/Family/FamilyMemberInput/FamilyMemberInput';

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

const initialState: FamilyMember = {
  firstName: '',
  middleName: '',
  lastName: '',
  member_id: -1,
  relationship: 'child',
};

const FamilyMemberDetails: FC<
  FamilyMemberDetailsProps
> = ({}: FamilyMemberDetailsProps) => {
  const [memberInfo, dispatch] = useReducer(memberReducer, initialState);

  const { state } = useLocation();
  const [disabledInputs] = useState((state as any).editDetails);
  const [actionType, setActionType] = useState<ActionType>(
    disabledInputs ? 'view' : 'update'
  );

  const getFamilyMemberDetails = async () => {
    const member_id = (state as any).member_id;

    const { data } = await axios.get(`/family/member/${member_id}`);
    dispatch({ type: 'initial', payload: '', initialState: data });
  };

  useEffect(() => {
    getFamilyMemberDetails();
  }, []);

  return memberInfo !== initialState ? (
    <FamilyMemberInput
      actionType={actionType}
      setActionType={setActionType}
      familyMember={memberInfo}
    />
  ) : (
    <p></p>
  );
};

export default FamilyMemberDetails;
