import { Text } from '@mantine/core'
import { Film, People } from '../../types/global'
import { DataTableColumn } from 'mantine-datatable'
import UrlArrayTable from '../comon/urlArrayTable/UrlArrayTable'

type Props = {
    urls: string[]
}

export default function PeopleTable({ urls }: Props) {

    const columns: DataTableColumn<People>[] = [
        { accessor: 'name', sortable: true },
        { accessor: 'height', },
        { accessor: 'birth_year' },
        { accessor: 'mass' },

    ]

    return (
        <UrlArrayTable apis={urls} columns={columns} />
    )
}