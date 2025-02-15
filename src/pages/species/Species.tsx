import { Card, Title } from '@mantine/core'
import MantineDataTable from '../../components/comon/dataTable/MantineDataTable'
import {  speciesCrud } from '../../api/apis'
import { useAppStore } from '../../store/app.store';
import { DataTableColumn } from 'mantine-datatable';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

export default function Species() {
    const { setSpecies } = useAppStore((state) => state);

    const columns: DataTableColumn<any>[] = [
        { accessor: 'name', sortable: true },
        { accessor: 'classification' },
        { accessor: 'designation'},
        { accessor: 'skin_colors' },
        { accessor: 'hair_colors' },
        { accessor: 'eye_colors' },
        { accessor: 'language' },
        { accessor: 'average_lifespan',title:'Avg Lifespan' },
        { accessor: 'average_height',title:'Avg Height' },
        {
            accessor: 'action',
            render(record, index) {
                const split = record.url.split('/')
                const id = split[split.length - 2]
                return <Link to={`/species/${id}`}><FaEye color='blue' /></Link>
            },
        },
    ]
    return (
        <Card h={'100%'} px={'50px'} pt={'20px'} >
            <Title order={4} ta={'start'} pt={1}> Species </Title>
            <MantineDataTable
                columns={columns}
                stateKey='species'
                getApi={speciesCrud.get}
                setState={setSpecies} />
        </Card>
    )
}
