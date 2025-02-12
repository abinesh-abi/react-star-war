import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Box, Table, Text } from '@mantine/core'
import { useAppStore } from '../../store/app.store'
import { Film } from '../../types/global'

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
                                return <Items film={film} key={key}/>
                            })
                            }
                        </tbody>
                    </Table>
            }

        </div>
    )
}

function Items({ film }: { film: string }) {

    const { startLoading, stopLoading } = useAppStore()
    const { data, error, isLoading, refetch } = useQuery<Film>({
        queryKey: ['vehicle'],
        queryFn: async () => {
            try {
                startLoading()
                const res: Axios.AxiosXHR<any> = await axios.get(film)
                return res.data
            } catch (error) {

            } finally { stopLoading() }

        }
    })
    return <tr >
        <td>{data?.title}</td>
        <td>{data?.director}</td>
        <td>{data?.release_date}</td>
        <td>{data?.opening_crawl}</td>
    </tr>
}