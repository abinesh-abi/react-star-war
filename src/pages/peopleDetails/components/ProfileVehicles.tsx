import { useQuery } from '@tanstack/react-query'
import { Vehicle } from '../../../types/global'
import axios from 'axios'
import { Table, Text } from '@mantine/core'

type Props = {
    vehicles: string[]
}

export default function ProfileVehicles({ vehicles }: Props) {

    return (
        <div>
            <Text>Vehicles</Text>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                        <th>Speed</th>
                    </tr>
                </thead>
                <tbody>

                    {vehicles.map((vehicle, key) => {
                        const { data, error, isLoading, refetch } = useQuery<Vehicle>({
                            queryKey: ['vehicle'],
                            queryFn: async () => {

                                const res: Axios.AxiosXHR<any> = await axios.get(vehicle)
                                return res.data
                            }
                        })
                        return <tr key={key}>
                            <td>{data?.name}</td>
                            <td>{data?.model}</td>
                            <td>{data?.manufacturer}</td>
                            <td>{data?.max_atmosphering_speed}</td>
                        </tr>
                    })
                    }
                </tbody>
            </Table>
        </div>
    )
}
