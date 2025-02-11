import { useQuery } from '@tanstack/react-query'
import { Vehicle } from '../../../types/global'
import axios from 'axios'
import { Box, Table, Text } from '@mantine/core'
import { useAppStore } from '../../../store/app.store'

type Props = {
    vehicles: string[]
}

export default function ProfileVehicles({ vehicles }: Props) {


    return (
        <div>
            <Text>Vehicles</Text>
            {
                !vehicles.length ? <Box><Text ta={'center'}>Vehicles not Found</Text></Box>
                    :
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
                                return <Items vehicle={vehicle} key={key} />
                            })
                            }
                        </tbody>
                    </Table>
            }

        </div>
    )
}

function Items({ vehicle }: { vehicle: string }) {
    const { startLoading, stopLoading } = useAppStore()
    const { data, error, isLoading, refetch } = useQuery<Vehicle>({
        queryKey: ['vehicle'],
        queryFn: async () => {
            try {
                startLoading()
                const res: Axios.AxiosXHR<any> = await axios.get(vehicle)
                return res.data
            } catch (error) {

            } finally { stopLoading() }

        }
    })
    return <tr >
        <td>{data?.name}</td>
        <td>{data?.model}</td>
        <td>{data?.manufacturer}</td>
        <td>{data?.max_atmosphering_speed}</td>
    </tr>

}