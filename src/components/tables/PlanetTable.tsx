import { Text } from '@mantine/core'
import { Film, People, Planet } from '../../types/global'
import { DataTableColumn } from 'mantine-datatable'
import UrlArrayTable from '../comon/urlArrayTable/UrlArrayTable'

type Props = {
    urls: string[]
}

export default function PlanetTable({ urls }: Props) {

    const columns: DataTableColumn<Planet>[] = [
        { accessor: 'name', sortable: true },
        { accessor: 'terrain' },
        { accessor: 'climate' },
        { accessor: 'gravity' },
        { accessor: 'population' },
        { accessor: 'diameter' },
        { accessor: 'orbital_period' },
        { accessor: 'rotation_period' },
    ]

    return (
        <UrlArrayTable apis={urls} columns={columns} />
    )
}