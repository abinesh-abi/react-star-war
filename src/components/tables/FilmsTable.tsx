import { Text } from '@mantine/core'
import { Film } from '../../types/global'
import { DataTableColumn } from 'mantine-datatable'
import UrlArrayTable from '../comon/urlArrayTable/UrlArrayTable'

type Props = {
    urls: string[]
}

export default function FilmsTable({ urls }: Props) {

    const columns: DataTableColumn<Film>[] = [
        { accessor: 'title', sortable: true },
        { accessor: 'director', sortable: true },
        { accessor: 'release_date', sortable: true },
        { accessor: 'opening_crawl' },
    ]

    return (
            <UrlArrayTable apis={urls} columns={columns} />
    )
}