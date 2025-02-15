import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Box, Table, Text } from '@mantine/core'
import { DataTableColumn } from 'mantine-datatable'
import { useAppStore } from '../../../store/app.store'
import { useEffect, useState } from 'react'
import MantineOfflineDataTable from '../dataTable/MantineOfflineDataTable'

type Props = {
    apis: string[],
    columns: DataTableColumn<any>[]
}

export default function UrlArrayTable({ apis, columns }: Props) {
    const { startLoading, stopLoading } = useAppStore()
    const [data, setData] = useState<Record<string, any>[]>([])
    const promiseApis = apis.map(async (url) => {
        try {
            const res: Axios.AxiosXHR<any> = await axios.get(url)
            return res.data
        } catch (error) {
            throw error
        } finally { }
    })

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            startLoading()
            const res = await Promise.all(promiseApis)
            setData(res)
            return res
        } catch (error) {

        } finally { stopLoading() }

    }

    return (
        <div>
            {
                data.length ?
                    <MantineOfflineDataTable columns={columns} data={data} />
                    :
                    <Box><Text ta={'center'}>No Data</Text></Box>
            }

        </div>
    )
}