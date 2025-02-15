import React, { useCallback, useEffect, useState } from 'react'
import { DataTable, DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import { useAppStore } from '../../../store/app.store';
import { useQuery } from '@tanstack/react-query';
import { PaginationResponse, Store } from '../../../types/global';
import { CrudOperations } from '../../../api/AxiosInstance';
import urlUtils from '../../../utils/urlUtils';
import _, { sortBy } from 'lodash';
import { Box, Flex, Input } from '@mantine/core';

type Props = {
    stateKey: keyof Store,
    // getApi: () => Promise<PaginationResponse<Record<string, any>>>,
    getApi: CrudOperations['get'],
    setState: (value: PaginationResponse<any>) => void,
    columns: DataTableColumn<any>[]
}

export default function MantineDataTable({ getApi, setState, stateKey, columns }: Props) {
    const { startLoading, stopLoading } = useAppStore((state) => state);
    const state: PaginationResponse<any> = useAppStore((state) => state?.[stateKey] as PaginationResponse<any>);
    // const [records, setRecords] = useState([])
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: columns[0].accessor, direction: 'asc' });
    const [records, setRecords] = useState(sortBy(state.results || [], columns[0].accessor));

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: [stateKey],
        queryFn: () => fetchData(),
        // onSuccess: (data) => {
        //     if (data) {
        //         setState(data);
        //     }
        // }
    })

    function sortData(sortStatus: DataTableSortStatus) {
        const data = sortBy(state.results, sortStatus.columnAccessor)
        setRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setSortStatus(sortStatus)
    }

    function resetSort(data: Record<string, any>[]) {
        setSortStatus({ columnAccessor: columns[0].accessor, direction: 'asc' })
        setRecords(data)
    }

    const debouncedSearch = useCallback(
        _.debounce(async (text) => {
            try {
                startLoading();
                let params = urlUtils.updateQueryParam('', 'search', text);
                params = urlUtils.updateQueryParam(params, 'page', 1);
                const data: PaginationResponse<any> = await getApi(params);
                setState(data);
                setPage(1);
                resetSort(data.results)
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                stopLoading();
            }
        }, 300), []
    );

    useEffect(() => {
        debouncedSearch(search);
        return () => {
            debouncedSearch.cancel();
        };
    }, [search, debouncedSearch]);


    async function fetchData() {
        try {
            startLoading()
            return await getApi()
        } catch (error) {

        } finally { stopLoading() }
    }
    async function getPage(page: number) {
        try {
            startLoading()
            let params = urlUtils.updateQueryParam('', 'page', page)
            if (search) {
                params = urlUtils.updateQueryParam(params, 'search', search)
            }
            const data:PaginationResponse<any> = await getApi(params)
            setState(data)
            setPage(page)
            resetSort(data.results)
        } catch (error) {

        } finally { stopLoading() }
    }
    return (
        <Box>
            <Flex justify={'end'} mb={'sm'}>
                <Input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder='Search'
                    sx={{ alignSelf: 'end', borderRadius: '10px' }}
                />
            </Flex>
            <DataTable
                withBorder
                shadow="sm"
                striped
                height={'90%'}
                withColumnBorders
                highlightOnHover
                horizontalSpacing="xs"
                verticalSpacing="xs"
                fontSize="sm"
                verticalAlignment="center"
                columns={columns}
                records={records || []}
                //pagination
                totalRecords={state?.count || 0}
                recordsPerPage={10}
                page={page}
                onPageChange={(page) => getPage(page)}
                //sort
                sortStatus={sortStatus}
                onSortStatusChange={sortData}
            />
        </Box>

    )
}
