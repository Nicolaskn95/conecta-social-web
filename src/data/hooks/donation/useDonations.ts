import { useContext } from 'react';
import DonationContext from '../../context/DonationContext';

const useDonations = () => useContext(DonationContext);

export { useDonations };

