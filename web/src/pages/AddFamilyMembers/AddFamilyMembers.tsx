import { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import FamilyMemberInput from '../../components/Family/FamilyMemberInput';
import { useSetHeader } from '../../hooks';
import axios from '../../util/axios';
import { FamilyMember } from '../FamilyMembers/FamilyMembers';

interface AddFamilyMembersProps {}

const AddFamilyMembers: FC<
  AddFamilyMembersProps
> = ({}: AddFamilyMembersProps) => {
  const { family_name } = useParams();
  useSetHeader(family_name);

  const location = useLocation();

  const [familyMember, setFamilyMember] = useState<FamilyMember | null>(null);
  const [family_id] = useState((location as any).state.family_id);

  const getFamilyDetails = async () => {
    const { data } = await axios.get(`/family/${family_id}/details`);

    setFamilyMember({
      relationship: 'child',
      member_id: -1,
      firstName: '',
      middleName: '',
      lastName: data.family_name,
      address: data.address,
    });
  };

  useEffect(() => {
    getFamilyDetails();
  }, []);

  return familyMember !== null ? (
    <FamilyMemberInput
      pageAction='Add new family member'
      actionType='add'
      familyMember={familyMember!}
      family_id={family_id}
    />
  ) : (
    <p></p>
  );
};

export default AddFamilyMembers;
