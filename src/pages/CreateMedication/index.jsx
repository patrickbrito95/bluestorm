import React, { useEffect, useState } from 'react';
import withAuthentication from '../../auth/withAuthentication';
import { Header } from '../../components/Header';
import './style.css';
import axios from 'axios';
import { Select } from '../../components/Select';
import { Input } from '../../components/Inputs';
import { Button } from '../../components/Button';

const CreateMedication = () => {
    const [manufacturers, setManufacturers] = useState([]);
    const [manufactureItem, setManufactureItem] = useState('');
    const [nameDrug, setNameDrug] = useState('');
    const [drugUnit, setDrugUnit] = useState(0);
    const [issuedOn, setIssuedOn] = useState(new Date());
    const [expiresOn, setExpiresOn] = useState(new Date());
    const [dateError, setDateError] = useState('')
    const [nameDrugError, setNameDrugError] = useState('')
    const [manufactureItemError, setManufactureItemError] = useState('')
    const [issuedOnError, setIssuedOnError] = useState('')
    const [expireOnError, setExpireOnError] = useState('')


    useEffect(() => {
        const getManufacturers = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.get(`https://djbnrrib9e.execute-api.us-east-2.amazonaws.com/v1/manufacturers`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data) {
                    setManufacturers(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        };

        getManufacturers()
    }, [])


    const createMedication = async () => {
        try {
            const token = localStorage.getItem('token');
            const issuedOnISO = new Date(issuedOn).toISOString();
            const expiresOnISO = new Date(expiresOn).toISOString();

            if (new Date(issuedOnISO) >= new Date(expiresOnISO)) {
                setDateError('A data de fabricação não pode ser maior ou no mesmo dia que a data de validade.');
            } else {
                setDateError('');
            }

            if (!nameDrug) {
                setNameDrugError("Campo obrigatório.");
            } else {
                setNameDrugError('');
            }

            if (!manufactureItem) {
                setManufactureItemError("Campo obrigatório");
            } else {
                setManufactureItemError('');
            }

            if (!issuedOn) {
                setIssuedOnError("Campo Obrigatório")
            } else {
                setIssuedOnError('')
            }

            if (!expiresOn) {
                setExpireOnError('Campo Obrigatório')
            } else {
                setExpireOnError('')
            }

            if (!manufactureItem || !nameDrug || !issuedOn || !expiresOn || new Date(issuedOnISO) >= new Date(expiresOnISO)) {
                return
            }

            const response = await axios.post('https://djbnrrib9e.execute-api.us-east-2.amazonaws.com/v1/medications', {
                drug_name: nameDrug,
                units_per_package: parseInt(drugUnit),
                issued_on: issuedOnISO,
                expires_on: expiresOnISO,
                manufacturers: [
                    manufactureItem
                ]
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );

            if (response.data) {
                console.log(response.data)
            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <div>
            <Header isLogged />
            <div className='container'>
                <h2 align="center">Preencha abaixo os dados do Medicamento:</h2>
            </div>
            <Input label="Nome do Medicamento" placeholder="Nome do Medicamento" value={nameDrug} onChange={(e) => setNameDrug(e.target.value)} />
            {nameDrugError && <div className='date-error'>{nameDrugError}</div>}
            <Select label="Fabricante" value={manufactureItem} onChange={(e) => setManufactureItem(e.target.value)}>
                <option value="">Selecione uma opção</option>
                {manufacturers?.data?.map((manufacture) => (
                    <option value={manufacture.name}>{manufacture.name}</option>
                ))}
            </Select>
            {manufactureItemError && <div className='date-error'>{manufactureItemError}</div>}
            <Input label="Quantidade de Unidades" placeholder="Quantidade de Unidades" type="number" value={drugUnit} onChange={(e) => setDrugUnit(e.target.value)} />
            <Input label="Data de Fabricação" value={issuedOn} type="date" placeholder="Data de Fabricação" onChange={(e) => setIssuedOn(e.target.value)} />
            {dateError && <div className='date-error'>{dateError}</div>}
            {issuedOnError && <div className='date-error'>{issuedOnError}</div>}
            <Input label="Data de Validade" value={expiresOn} type="date" placeholder="Data de Validade" onChange={(e) => setExpiresOn(e.target.value)} />
            {expireOnError && <div className='date-error'>{expireOnError}</div>}
            <Button primary onClick={createMedication}>Criar</Button>
        </div>)
};

export default withAuthentication(CreateMedication);