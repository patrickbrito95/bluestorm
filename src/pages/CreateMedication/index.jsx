import React from 'react';
import withAuthentication from '../../auth/withAuthentication';

const CreateMedication = () => {
    return <div>Create Medication Page</div>;
};

export default withAuthentication(CreateMedication);