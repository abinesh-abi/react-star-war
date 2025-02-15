import { Card, Title } from '@mantine/core'
import MantineDataTable from '../../components/comon/dataTable/MantineDataTable'
import { filmsCrud } from '../../api/apis'
import { useAppStore } from '../../store/app.store';
import { DataTableColumn } from 'mantine-datatable';
import { Film } from '../../types/global';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

export default function Films() {
    const { setFilms } = useAppStore((state) => state);

    const columns: DataTableColumn<Film>[] = [
        { accessor: 'title', sortable: true },
        { accessor: 'director', sortable: true },
        { accessor: 'release_date', sortable: true },
        { accessor: 'opening_crawl' },
        {
            accessor: 'action',
            render(record, index) {
                const split = record.url.split('/')
                const id = split[split.length - 2]
                return <Link to={`/films/${id}`}><FaEye color='blue' /></Link>
            },
        },
    ]
    return (
        <Card h={'100%'} px={'50px'} pt={'20px'} >
            <Title order={4} ta={'start'} pt={1}> Films </Title>
            <MantineDataTable
                columns={columns}
                stateKey='films'
                getApi={filmsCrud.get}
                setState={setFilms} />
        </Card>
    )
}
