import React, { useEffect, useState } from 'react';
import withAuthentication from '../../auth/withAuthentication';
import { Header } from '../../components/Header';
import axios from 'axios';
import { Select } from '../../components/Select';
import { Input } from '../../components/Inputs'
import './style.css';
import { PaginationButton } from '../../components/PaginationButton';

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
                <div className='wrapper-filter--medication-list'>
                    <Input label="Nome do Medicamento" value={search} placeholder="Pesquisar..." onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className='wrapper-table--medication-list'>
                    <table>
                        <thead>
                            <tr>
                                <th>Ingrediente Ativo</th>
                                <th>Número de Aplicação</th>
                                <th>Nome do Medicamento</th>
                                <th>Forma de Uso</th>
                                <th>Número do Produto</th>
                                <th>Referência do Medicamento</th>
                                <th>Padrão de Referência</th>
                                <th>Concentração</th>
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
                </div>
                <div className='wrapper-bottom-pagination'>
                    <PaginationButton
                        disabledBackButton={page === 1}
                        disabledNextButton={page === maxPages}
                        backButton={() => setPage(page - 1)}
                        nextButton={() => setPage(page + 1)}
                        currentPage={page}
                    />
                    <Select value={limit} onChange={(e) => setLimit(parseInt(e.target.value))}>
                        <option value={10}>10 por página</option>
                        <option value={20}>20 por página</option>
                        <option value={30}>30 por página</option>
                    </Select>
                </div>
            </div>
        </div>
    )
};

export default withAuthentication(MedicationList);