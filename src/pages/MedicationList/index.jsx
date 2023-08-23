import React from 'react';
import withAuthentication from '../../auth/withAuthentication';

const MedicationList = () => {
    return <div>Medication List Page</div>;
};

export default withAuthentication(MedicationList);