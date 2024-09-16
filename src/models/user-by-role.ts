export interface UserByRole {
  id: string
  f_name: string
  l_name: string
  gender: string
  email: string
  phone_number: string
  national_id: string
  role: string
  active?: boolean
  createdAt: Date
  updatedAt: Date
  facilityAdmin: string | null
  facilityId?: string
  Facility?: Facility
  biodata: BioData[]
}

export interface Facility {
  name: string
  id: string
}

export interface BioData {
  age?: number
}
