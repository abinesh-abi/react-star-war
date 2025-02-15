import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Box, LoadingOverlay, Table, Text } from '@mantine/core'
import { DataTableColumn } from 'mantine-datatable'
import { useAppStore } from '../../../store/app.store'
import { useEffect, useState } from 'react'
import MantineOfflineDataTable from '../dataTable/MantineOfflineDataTable'

type Props = {
    apis: string[],
    columns: DataTableColumn<any>[]
}

export default function UrlArrayTable({ apis, columns }: Props) {
    const [data, setData] = useState<Record<string, any>[]>([])
    const [loading, setLoading] = useState(false)
    const promiseApis = apis.map(async (url) => {
        try {
            const res: Axios.AxiosXHR<any> = await axios.get(url)
            return res.data
        } catch (error) {
            throw error
        } finally { }
    })

    useEffect(() => {
        if (apis.length) {
            fetchData()
        }
    }, [apis.length])

    async function fetchData() {
        try {
            setLoading(true)
            const res = await Promise.all(promiseApis)
            setData(res)
            return res
        } catch (error) {

        } finally { setLoading(false) }

    }

    return (
        <Box>
            <LoadingOverlay
                visible={Boolean(loading)}
                // zIndex={1000}
                overlayBlur={2}
                loaderProps={{ color: 'pink', type: 'bars' }}
            />
            {
                data.length ?
                    <MantineOfflineDataTable columns={columns} data={data} />
                    :
                    <Box><Text ta={'center'}>No Data</Text></Box>
            }

        </Box>
    )
}