import { Box, Button, IconButton, Stack, Tooltip } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import React, { useCallback, useMemo, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';

interface ShoppingCartItem {
  productId: number,
  productDescription: string,
  productName: string,
  productPrice: number,
  numProducts: number
}

interface Props {
  shoppingCartItems: ShoppingCartItem[]
  homepage: () => void
}
const ShoppingCart = (props: Props) => {

  const [tableData, setTableData] = useState<ShoppingCartItem[]>(() => props.shoppingCartItems);

  const handleDeleteRow = useCallback(
    (row: MRT_Row<ShoppingCartItem>) => {
      if (
        !confirm(`Are you sure you want to delete ${row.getValue('firstName')}`)
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData],
  );

  const getTotal = () => {
    let Total = 0
    for (let i = 0; i < props.shoppingCartItems.length; i++) {
      if(props.shoppingCartItems[i].productPrice !== undefined){
        Total += props.shoppingCartItems[i].productPrice
      }
    }
    return Total
  }
  const columns = useMemo<MRT_ColumnDef<ShoppingCartItem>[]>(
    () => [
      {
        accessorKey: 'productName',
        header: 'Name',
      },
      {
        accessorKey: 'productDescription',
        header: 'Description',
      },
      {
        accessorKey: 'numProducts',
        header: 'Quantity'
      },
      {
        accessorKey: 'productPrice',
        header: 'productPrice',
        Footer: () => (
          <Stack>
            Total: {Math.round(getTotal())}
          </Stack>
        )
      },
    ],
    [],
  );

  return (
    <div style={{ paddingLeft: "4.00%", paddingTop: "4.00%" }}>
      <Button variant="text" sx={{ color: "black", fontSize: "38px" }} onClick={() => props.homepage()}>One Karoo</Button>
      <MaterialReactTable
        columns={columns}
        data={tableData}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            size: 250, //set custom width
            muiTableHeadCellProps: {
              align: 'center', //change head cell props
            },
          },
          'mrt-row-numbers': {
            enableColumnOrdering: true, //turn on some features that are usually off
            enableResizing: true,
            muiTableHeadCellProps: {
              sx: {
                fontSize: '1.4rem',
              },
            },
          },
          'mrt-row-select': {
            enableColumnActions: true,
            enableHiding: true,
            size: 100,
          },
        }}
        enableColumnActions={false}
        enableColumnFilters={false}
        enablePagination={false}
        enableSorting={false}
        enableBottomToolbar={false}
        enableTopToolbar={false}
        muiTableBodyRowProps={{ hover: false }}
        muiTableProps={{
          sx: {
            border: '2px solid rgba(81, 81, 10, 40)',
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            border: '4px solid rgba(81, 10, 81, 1)',
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            border: '6px solid rgba(10, 81, 81, 1)',
          },
        }}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />
    </div>
  );
}

export default ShoppingCart