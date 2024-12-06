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
  BioData: BioDatum[];
  name: string
}

export interface Facility {
  name: string
  id: string
}


export interface BioDatum {
  age: number;
}
