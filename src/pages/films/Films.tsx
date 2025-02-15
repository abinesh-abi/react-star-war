import { Card, Title } from '@mantine/core'
import MantineDataTable from '../../components/comon/dataTable/MantineDataTable'
import { filmsCrud } from '../../api/apis'
import { useAppStore } from '../../store/app.store';
import { DataTableColumn } from 'mantine-datatable';

export default function Films() {
    const { setFilms } = useAppStore((state) => state);

    const columns: DataTableColumn<any>[] = [
        { accessor: 'title', sortable: true },
        { accessor: 'director', sortable: true },
        { accessor: 'release_date', sortable: true },
        { accessor: 'opening_crawl' },
        {
            accessor: 'action',
            render(record, index) {
                return <>hi</>
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
