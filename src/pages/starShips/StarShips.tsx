import { Card, Title } from '@mantine/core'
import MantineDataTable from '../../components/comon/dataTable/MantineDataTable'
import { starShipCrud } from '../../api/apis'
import { useAppStore } from '../../store/app.store';
import { DataTableColumn } from 'mantine-datatable';
import { Starship } from '../../types/global';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

export default function StarShips() {
    const { setStarShips } = useAppStore((state) => state);

    const columns: DataTableColumn<Starship>[] = [
        { accessor: 'name', sortable: true },
        { accessor: 'model', sortable: true },
        { accessor: 'manufacturer', sortable: true },
        { accessor: 'max_atmosphering_speed'},
        { accessor: 'crew' },
        { accessor: 'cargo_capacity' },
        {
            accessor: 'action',
            render(record, index) {
                const split = record.url.split('/')
                const id = split[split.length - 2]
                return <Link to={`/star-ships/${id}`}><FaEye color='blue' /></Link>
            },
        },
    ]
    return (
        <Card h={'100%'} px={'50px'} pt={'20px'} >
            <Title order={4} ta={'start'} pt={1}> Star Ships </Title>
            <MantineDataTable
                columns={columns}
                stateKey='starShips'
                getApi={starShipCrud.get}
                setState={setStarShips} />
        </Card>
    )
}
