import React from 'react';
import withAuthentication from '../../auth/withAuthentication';
import { Header } from '../../components/Header';

const MedicationList = () => {
    return <div><Header isLogged />Medication List Page</div>;
};

export default withAuthentication(MedicationList);