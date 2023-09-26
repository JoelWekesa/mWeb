import UsersByRoleComponent from '@components/Users/Role'
import CHVLayout from '@layout/CHVLayout/CHVLayout'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { baseURL } from 'src/config/axios'
import { Users } from 'src/helpers/enums/users.enum'
import useUsersByRole from 'src/services/users/by-role'

const MotherChv = ({ users }: any) => {
  const { data } = useUsersByRole('Mother', users)

  return (
    <CHVLayout>
      <UsersByRoleComponent users={data} facility={true} />
    </CHVLayout>
  )
}

export default MotherChv

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)

    if (user.role !== Users.CHV
        ) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }

    const users = await axios
      .get(baseURL + 'users/roles?role=Mother', {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => res.data)
    return {
      props: {
        user,
        users
      }
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
}