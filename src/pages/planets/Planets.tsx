import { Card, Title } from '@mantine/core'
import MantineDataTable from '../../components/comon/dataTable/MantineDataTable'
import { planetCrud } from '../../api/apis'
import { useAppStore } from '../../store/app.store';
import { DataTableColumn } from 'mantine-datatable';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

export default function Planets() {
    const { setPlanets } = useAppStore((state) => state);

    const columns: DataTableColumn<any>[] = [
        { accessor: 'name', sortable: true },
        { accessor: 'terrain' },
        { accessor: 'climate' },
        { accessor: 'gravity' },
        { accessor: 'population' },
        { accessor: 'diameter' },
        { accessor: 'orbital_period' },
        { accessor: 'rotation_period' },
        {
            accessor: 'action',
            render(record, index) {
                const split = record.url.split('/')
                const id = split[split.length - 2]
                return <Link to={`/planets/${id}`}><FaEye color='blue' /></Link>
            },
        },
    ]
    return (
        <Card h={'100%'} px={'50px'} pt={'20px'} >
            <Title order={4} ta={'start'} pt={1}> Planets </Title>
            <MantineDataTable
                columns={columns}
                stateKey='planets'
                getApi={planetCrud.get}
                setState={setPlanets} />
        </Card>
    )
}
