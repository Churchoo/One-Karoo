import { Box, Button, Grid, IconButton, Stack, Tooltip } from '@mui/material';
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
  deliveryPage: () => void
  aboutUs: () => void
}
const ShoppingCart = (props: Props) => {

  const [tableData, setTableData] = useState<ShoppingCartItem[]>(() => props.shoppingCartItems);

  const handleDeleteRow = useCallback(
    (row: MRT_Row<ShoppingCartItem>) => {
      if (
        !window.confirm(`Are you sure you want to delete ${row.getValue('productName')}`)
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      console.log(tableData)
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData],
  );

  const getTotal = () => {
    let Total = 0
    for (let i = 0; i < props.shoppingCartItems.length; i++) {
      if (props.shoppingCartItems[i].productPrice !== undefined) {
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
      <Grid container spacing={{ xs: 4, md: 4 }} columns={{ xs: 6, sm: 8, md: 12 }} >
        <Button variant="text" sx={{ color: "black", fontSize: "38px" }} onClick={() => props.homepage()}>One Karoo</Button>
        <Button variant="text" sx={{ color: "black", fontSize: "20px" }}>Catagories</Button>
        <Button variant="text" sx={{ color: "black", fontSize: "20px" }}>Gift packeges</Button>
        <Button variant="text" sx={{ color: "black", fontSize: "20px" }} onClick={() => props.aboutUs()}>About Us</Button>
        <Button variant="text" sx={{ color: "black", fontSize: "20px" }}>Contact Us</Button>
      </Grid>
      <MaterialReactTable
        columns={columns}
        data={tableData}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: '',
            size: 50, //set custom width
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
        enableRowActions
        positionActionsColumn='last'
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
            border: '2px solid rgba(151, 151, 10, 40)',
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            border: '1px solid rgba(0, 0, 0, 1)',
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
      <Button variant="text" sx={{ color: "black", fontSize: "38px" }} onClick={() => props.deliveryPage()}>Check Out</Button>
    </div>
  );
}

export default ShoppingCart