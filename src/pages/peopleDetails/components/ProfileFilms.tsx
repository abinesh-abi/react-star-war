import { useQuery } from '@tanstack/react-query'
import { Film, Vehicle } from '../../../types/global'
import axios from 'axios'
import { Box, Table, Text } from '@mantine/core'

type Props = {
    films: string[]
}

export default function ProfileFilms({ films }: Props) {


    return (
        <div>
            <Text>Films</Text>
            {
                !films.length ? <Box><Text ta={'center'}>Films not Found</Text></Box>
                :
                <Table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Director</th>
                            <th>Release Date</th>
                            <th>Opening</th>
                        </tr>
                    </thead>
                    <tbody>

                        {films.map((film, key) => {
                            const { data, error, isLoading, refetch } = useQuery<Film>({
                                queryKey: ['vehicle'],
                                queryFn: async () => {

                                    const res: Axios.AxiosXHR<any> = await axios.get(film)
                                    return res.data
                                }
                            })
                            return <tr key={key}>
                                <td>{data?.title}</td>
                                <td>{data?.director}</td>
                                <td>{data?.release_date}</td>
                                <td>{data?.opening_crawl}</td>
                            </tr>
                        })
                        }
                    </tbody>
                </Table>
            }

        </div>
    )
}
