import { yupResolver } from '@hookform/resolvers/yup'
import { UserByRole } from '@models/user-by-role'
import { Add } from '@mui/icons-material'
import { Button, Card, CardActions, CardContent, CardHeader, Stack, TextField } from '@mui/material'
import useAddMother from '@services/chvmother/add'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface AddMotherFormProps {
  f_name: string
  l_name: string
  email?: string
  national_id: string
  phone_number: string
  //   facilityId: string
}

const schema = Yup.object().shape({
  f_name: Yup.string().required(),
  l_name: Yup.string().required(),
  email: Yup.string().optional(),
  national_id: Yup.string().required('National Id is a required field'),
  phone_number: Yup.string()
    .matches(/^254\d{9}$/, 'Invalid phone number format. Use this format 254xxxxxxxxx')
    .required('Phone number is a required field')
  //   facilityId: Yup.string().required()
})

export const AddMotherComponent: FC<{
  handleToggle: () => void
  user?: UserByRole
}> = ({ handleToggle, user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  })

  const { mutate, isLoading } = useAddMother(reset)

  const onSubmit = (data: AddMotherFormProps): void => {
    console.log('Facility', {
      facilityId: user?.role
    })
    const item = {
      ...data,
      role: 'Mother',
      gender: 'Female',
      facilityId: 'cljwr1ppa0006s6cs03efcx73'
    }

    mutate(item)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ minWidth: 680, mt: 3, mb: 3 }}>
          <CardHeader title="Add mother" subheader="All fields marked with * are required fields" />
          <CardContent>
            {/* <Box
              component="form"
              
              noValidate
              autoComplete="off"> */}
            <Stack spacing={1}>
              <TextField
                size="small"
                fullWidth
                label="First Name"
                {...register('f_name')}
                required
                helperText={errors?.f_name?.message}
                error={!!errors?.f_name?.message}
                inputProps={{ 'data-testid': 'f_name_input' }}
              />
              <TextField
                size="small"
                fullWidth
                label="Last Name"
                {...register('l_name')}
                required
                helperText={errors?.l_name?.message}
                error={!!errors?.l_name?.message}
                inputProps={{ 'data-testid': 'l_name_input' }}
              />

              <TextField
                size="small"
                fullWidth
                label="Email"
                type="email"
                {...register('email')}
                helperText={errors?.email?.message}
                error={!!errors?.email?.message}
                inputProps={{ 'data-testid': 'email_input' }}
              />
              <TextField
                size="small"
                fullWidth
                label="Phone Number"
                {...register('phone_number')}
                placeholder="254*********"
                required
                helperText={errors?.phone_number?.message}
                error={!!errors?.phone_number?.message}
                inputProps={{ 'data-testid': 'phone_input' }}
              />

              <TextField
                size="small"
                fullWidth
                label="National ID"
                {...register('national_id')}
                required
                helperText={errors?.national_id?.message}
                error={!!errors?.national_id?.message}
                inputProps={{ 'data-testid': 'id_input' }}
              />
            </Stack>
            {/* </Box> */}

            <CardActions>
              <Button
                variant="contained"
                color="success"
                type="submit"
                startIcon={<Add />}
                // data-testid="submit_button"
                disabled={isLoading}>
                {/* Add */}
                {isLoading ? 'Adding Mother' : 'Add Mother'}
              </Button>

              <Button variant="contained" color="error" onClick={handleToggle}>
                Cancel
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </form>
    </>
  )
}
