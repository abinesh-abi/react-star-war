import { Text } from '@mantine/core'
import { Species, Vehicle } from '../../types/global'
import UrlArrayTable from '../comon/urlArrayTable/UrlArrayTable'
import { DataTableColumn } from 'mantine-datatable'

type Props = {
    urls: string[]
}

export default function SpeciesTable({ urls }: Props) {


    const columns: DataTableColumn<Species>[] = [
        { accessor: 'name', sortable: true },
        { accessor: 'classification' },
        { accessor: 'designation' },
        { accessor: 'skin_colors' },
        { accessor: 'hair_colors' },
        { accessor: 'eye_colors' },
        { accessor: 'language' },
        { accessor: 'average_lifespan', title: 'Avg Lifespan' },
        { accessor: 'average_height', title: 'Avg Height' },
    ]

    return (
        <UrlArrayTable apis={urls} columns={columns} />
    )
}