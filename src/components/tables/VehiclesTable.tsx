import { Text } from '@mantine/core'
import { Vehicle } from '../../types/global'
import UrlArrayTable from '../comon/urlArrayTable/UrlArrayTable'
import { DataTableColumn } from 'mantine-datatable'

type Props = {
    urls: string[]
}

export default function VehiclesTable({ urls }: Props) {


    const columns: DataTableColumn<Vehicle>[] = [
        { accessor: 'name', sortable: true },
        { accessor: 'model', sortable: true },
        { accessor: 'manufacturer' },
        { accessor: 'max_atmosphering_speed', title: 'Speed' },
    ]

    return (
        <UrlArrayTable apis={urls} columns={columns} />
    )
}