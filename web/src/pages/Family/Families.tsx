import { FC, useCallback, useEffect, useState } from 'react';
import axios from '../../util/axios';

interface FamiliesProps {}

interface Family {
  family_id: number;
  family_name: string;
  address: string;
}

const Families: FC<FamiliesProps> = ({}: FamiliesProps) => {
  const [families, setFamilies] = useState<Family[]>([]);

  const getAllFamilies = useCallback(async () => {
    const { data } = await axios.get('/family');

    setFamilies(data);
  }, []);

  useEffect(() => {
    getAllFamilies();
  }, []);

  return families.length ? (
    <div>
      {families.map(() => (
        <p>sdf</p>
      ))}
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Families;
