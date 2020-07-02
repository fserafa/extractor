import React, { useEffect, useState } from 'react';
import { Table, Container } from 'react-bootstrap'
import data from './data.json'
import precos from './precos.json'

export default function Index() {
    const [formatedData, setFormatedData] = useState([]);


    useEffect(() => {
        let selected;
        data.shift();

        data.map(d => {
            switch (d.regiao) {
                case "capital":
                    [selected] = precos.filter(p => p.id === 'capital');
                    d.valores = selected.faixaPeso;
                    break;

                case "Interior 1":
                    [selected] = precos.filter(p => p.id === 'interior1');
                    d.valores = selected.faixaPeso;
                    break;

                case "Interior 2":
                    [selected] = precos.filter(p => p.id === 'interior2');
                    d.valores = selected.faixaPeso;
                    break;
                case "Interior 3":
                    [selected] = precos.filter(p => p.id === 'interior3');
                    d.valores = selected.faixaPeso;
                    break;
            }
        })
        setFormatedData(data);
    }, [])


    function tableRow(customer, index) {
        return (
            <tr key={index} className='even'>
                <td> {index + 1} </td>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.email}</td>
                <td>{customer.address}</td>
                <td>{customer.zipcode}</td>
            </tr>
        )
    }


    const tableHeader = <thead className='bgvi'>
        <tr>
            <th>Identificador da tabela (forma de envio)</th>
            <th>Faixa de CEP inicial</th>
            <th>Faixa de CEP final</th>
            <th>Prazo de Entrega minimo</th>
            <th>Prazo de Entrega máximo</th>
            <th>Peso inicial em kilos</th>
            <th>Peso final em kilos	</th>
            <th>Valor do frete</th>


        </tr>

    </thead>


    if (formatedData.length === 0) {
        return null;
    }
    return (
        <Container>
            <Table striped bordered hover>
                {tableHeader}
                <tbody>
                    {
                        formatedData.map((data, index) => (
                            data.valores.map((v, index) => (
                                <tr key={index.toString()} className='even'>
                                    <td>personalizada_cep_27</td>

                                    <td>{data.cep_inicial}</td>
                                    <td>{data.cep_final}</td>
                                    <td>{data.prazo}</td>
                                    <td>{data.prazo + 2}</td>
                                    <td>{v.pesoInicial}</td>
                                    <td>{v.pesoFinal}</td>
                                    <td>{v.valor}</td>

                                </tr>
                            ))


                        ))
                    }
                </tbody>
            </Table>
        </Container >
    )
}
