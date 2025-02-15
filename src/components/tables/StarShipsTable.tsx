import { Starship } from '../../types/global'
import UrlArrayTable from '../comon/urlArrayTable/UrlArrayTable'
import { DataTableColumn } from 'mantine-datatable'

type Props = {
    urls: string[]
}

export default function StarShipsTable({ urls }: Props) {


    const columns: DataTableColumn<Starship>[] = [
        { accessor: 'name', sortable: true },
        { accessor: 'model', sortable: true },
        { accessor: 'manufacturer' },
        { accessor: 'max_atmosphering_speed' },
        { accessor: 'crew' },
        { accessor: 'cargo_capacity' }
    ]

    return (
        <UrlArrayTable apis={urls} columns={columns} />
    )
}