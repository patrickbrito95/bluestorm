import React, { useEffect, useState } from 'react';
import withAuthentication from '../../auth/withAuthentication';
import { Header } from '../../components/Header';
import axios from 'axios';

const MedicationList = () => {
    const [medications, setMedications] = useState([]);
    const [maxPages, setMaxPages] = useState();
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('')

    useEffect(() => {
        const getMedications = async () => {

            try {
                const token = localStorage.getItem('token');

                const response = await axios.get(`https://djbnrrib9e.execute-api.us-east-2.amazonaws.com/v1/medications?page=${page}&limit=${limit}${search.length >= 3 ? `&search=${search}` : ''}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data) {
                    console.log(response.data)
                    setMedications(response.data)
                    setMaxPages(response?.data.last_page)
                }
            } catch (error) {
                console.log(error)
            }
        };

        getMedications()
    }, [limit, page, search])


    return (
        <div>
            <Header isLogged />
            <div>
                <div>
                    <select value={limit} onChange={(e) => setLimit(parseInt(e.target.value))}>
                        <option value={10}>10 por página</option>
                        <option value={20}>20 por página</option>
                        <option value={30}>30 por página</option>
                    </select>
                    <input value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Active Ingredient</th>
                            <th>Application Number</th>
                            <th>Drug Name</th>
                            <th>Form</th>
                            <th>Product Number</th>
                            <th>Reference Drug</th>
                            <th>Reference Standard</th>
                            <th>Strength</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medications?.data?.map((medication, index) => (
                            <tr key={index}>
                                <td>{medication.active_ingredient}</td>
                                <td>{medication.application_number}</td>
                                <td>{medication.drug_name}</td>
                                <td>{medication.form}</td>
                                <td>{medication.product_number}</td>
                                <td>{medication.reference_drug}</td>
                                <td>{medication.reference_standard}</td>
                                <td>{medication.strength}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <button disabled={page === 1} onClick={() => setPage(page - 1)}>Voltar</button>
                    Página {page}
                    <button disabled={page === maxPages} onClick={() => setPage(page + 1)}>Próximo</button>
                </div>
            </div>
        </div>
    )
};

export default withAuthentication(MedicationList);