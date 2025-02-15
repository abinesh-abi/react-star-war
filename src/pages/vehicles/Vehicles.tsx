import { Card, Title } from '@mantine/core'
import MantineDataTable from '../../components/comon/dataTable/MantineDataTable'
import { filmsCrud, vehicleCrud } from '../../api/apis'
import { useAppStore } from '../../store/app.store';
import { DataTableColumn } from 'mantine-datatable';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

export default function Vehicles() {
    const { setVehicles } = useAppStore((state) => state);

    const columns: DataTableColumn<any>[] = [
        { accessor: 'name', sortable: true },
        { accessor: 'model' },
        { accessor: 'manufacturer' },
        { accessor: 'cost_in_credits' },
        { accessor: 'max_atmosphering_speed',title:'Speed' },
        { accessor: 'passengers' },
        { accessor: 'cargo_capacity' },
        {
            accessor: 'action',
            render(record, index) {
                const split = record.url.split('/')
                const id = split[split.length - 2]
                return <Link to={`/vehicles/${id}`}><FaEye color='blue' /></Link>
            },
        },
    ]
    return (
        <Card h={'100%'} px={'50px'} pt={'20px'} >
            <Title order={4} ta={'start'} pt={1}> Vehicles </Title>
            <MantineDataTable
                columns={columns}
                stateKey='vehicles'
                getApi={vehicleCrud.get}
                setState={setVehicles} />
        </Card>
    )
}
