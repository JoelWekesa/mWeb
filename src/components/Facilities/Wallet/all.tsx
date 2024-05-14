import SharedModal from '@components/Shared/Modal'
import { Col } from '@data/users-by-role'
import { Alert, Box, Button, Tab, Tabs, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import React, { FC, useMemo, useState } from 'react'

import Center from '@components/Shared/CenterVert'

import WalletRecordComponent from './add'
import { Wallet } from '@mui/icons-material'
import RecordsComponent from './records'

// export interface ChvMothersData {
//   chvmothers: ChvMothers
// }
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export const FacilityWalletColumn: Col[] = [
  {
    field: 'name',
    headerName: 'Name'
  },
  {
    field: 'email',
    headerName: 'Email'
  },
  {
    field: 'phone',
    headerName: 'Phone'
  },
  {
    field: 'national_id',
    headerName: 'National ID'
  },
  {
    field: 'facility',
    headerName: 'Facility'
  },
  {
    field: 'action',
    headerName: 'Action'
  }
]

const FacilityManageWalletComponent: FC<{
  data: any
  handleToggle: () => void
  //   chv: User
  //   target: Target
  //   user: UserByRole
}> = ({ data, handleToggle }) =>
  // { data, user, target }
  {
    const [open, setOpen] = useState(false)
    const [_openAdd, _setOpenAdd] = useState(false)
    const [value, setValue] = React.useState(0)
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue)
    }
    // const handleToggle = () => {
    //   setOpen((open) => !open)
    // }

    //   const chvmothers = useAllChvMothers(data)

    const sampleData = [
      {
        id: 1,
        name: 'Alice Waithira',
        email: 'alice@example.com',
        phone_number: '254798883776',
        national_id: '33766637',
        facility: 'Ruaraka Neema Uhai'
      },
      {
        id: 2,
        name: 'Jennifer Olive',
        email: 'bob@example.com',
        phone_number: '254783998827',
        national_id: '88476625',
        facility: 'Ruaraka Neema Uhai'
      }
    ]

    // to be used to add transactions/records to modal
    const toggleAdd = () => {
      setOpen((open) => !open)
    }

    const handleClose = () => {
      setOpen((open) => !open)
    }

    const rows = useMemo(() => {
      if (sampleData && sampleData) {
        return sampleData.map((sample: any) => ({
          id: sample.id,
          // name: sample.f_name + ' ' + sample.l_name,
          name: sample.name,
          email: sample.email,
          phone: sample.phone_number,
          national_id: sample.national_id,
          facility: sample.facility
        }))
      }
      return []
    }, [sampleData])

    const columns: GridColDef[] = useMemo(() => {
      return [
        ...FacilityWalletColumn.map((col) => {
          if (col.field === 'action') {
            return {
              field: col.field,
              headerName: col.headerName,
              flex: 1,
              renderCell: () => (
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<Wallet />}
                  onClick={() => toggleAdd()}>
                  Record
                </Button>
              )
            }
          }
          return {
            field: col.field,
            headerName: col.headerName,
            flex: 1
          }
        })
      ]
    }, [])

    return (
      <>
        <Box sx={{ height: 800, width: '100%' }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              backgroundColor: '#DFEBF7',
              padding: '10px'
            }}>
            <Wallet /> Wallet Management
          </Typography>

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Record" {...a11yProps(0)} />
              <Tab label="View Transactions" {...a11yProps(1)} />
              {/* <Tab label="View Graphs" {...a11yProps(2)} /> */}
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            {open && (
              <Alert severity="info" sx={{ mt: 1, mb: 1 }} onClose={handleClose}>
                Clinic visits can only be recorded for patients with an existing bio data profile
              </Alert>
            )}
            {/* <BioDataByFacility bioData={bioData} admin={admin} /> */}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <RecordsComponent data={undefined} handleClose={handleToggle} />
          </CustomTabPanel>
          <DataGrid
            rows={rows}
            slots={{ toolbar: GridToolbar }}
            columns={columns}
            slotProps={{
              toolbar: {
                showQuickFilter: true
              }
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            density="comfortable"
          />
        </Box>

        <SharedModal items={{ open, handleToggle: toggleAdd }}>
          <Center>
            <WalletRecordComponent user={undefined} handleToggle={toggleAdd} datas={data} />{' '}
          </Center>
        </SharedModal>
      </>
    )
  }

export default FacilityManageWalletComponent