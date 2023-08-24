import React from 'react';
import withAuthentication from '../../auth/withAuthentication';
import { Header } from '../../components/Header';

const CreateMedication = () => {
    return <div><Header isLogged />Create Medication Page</div>;
};

export default withAuthentication(CreateMedication);