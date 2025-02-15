import { DataTable, DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import _, { sortBy } from 'lodash';
import { useState } from 'react';
import { Box } from '@mantine/core';

type Props = {
    columns: DataTableColumn<any>[]
    data: Record<string, any>[],
}

export default function MantineOfflineDataTable({ columns, data }: Props) {
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: columns[0].accessor, direction: 'asc' });
    const [records, setRecords] = useState(sortBy(data || [], columns[0].accessor));

    function sortData(sortStatus: DataTableSortStatus) {
        const sortData = sortBy(data, sortStatus.columnAccessor)
        setRecords(sortStatus.direction === 'desc' ? sortData.reverse() : sortData);
        setSortStatus(sortStatus)
    }
    return (
        <Box>
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
                // //pagination
                // totalRecords={state?.count || 0}
                // recordsPerPage={10}
                // page={page}
                // onPageChange={(page) => getPage(page)}
                //sort
                sortStatus={sortStatus}
                onSortStatusChange={sortData}
            />
        </Box>

    )
}
