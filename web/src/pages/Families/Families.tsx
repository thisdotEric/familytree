import { FC, useCallback, useEffect, useState } from 'react';
import { useSetHeader } from '../../hooks';
import axios from '../../util/axios';
import FamilyItem from './FamilyItem';

interface FamiliesProps {}

export interface Family {
  family_id: number;
  family_name: string;
  address: string;
}

const Families: FC<FamiliesProps> = ({}: FamiliesProps) => {
  useSetHeader('');

  const [families, setFamilies] = useState<Family[]>([]);
  const getAllFamilies = useCallback(async () => {
    const { data } = await axios.get('/family');

    setFamilies(data);
  }, []);

  useEffect(() => {
    getAllFamilies();
  }, []);

  return (
    <div>
      {families.map((family) => (
        <FamilyItem family={family} />
      ))}
    </div>
  );
};

export default Families;
