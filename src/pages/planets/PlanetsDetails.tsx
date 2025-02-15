import { Box, Card, Flex, Tabs, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Planet } from '../../types/global';
import { useAppStore } from '../../store/app.store';
import DetailsItem from '../../components/comon/detailsItem/DetailsItem';
import PeopleTable from '../../components/tables/PeopleTable';
import { PiUsersDuotone } from 'react-icons/pi';
import FilmsTable from '../../components/tables/FilmsTable';
import { FaFilm } from 'react-icons/fa';
import { planetCrud } from '../../api/apis';

export default function PlanetsDetails() {
    const params = useParams<{ id: string | undefined }>()
    const { startLoading, stopLoading } = useAppStore()
    const { data, error, isLoading, refetch } = useQuery<Planet>({
        queryKey: ['planets-details'],
        queryFn: () => fetchData(),
        // onSuccess: (data) => {
        //     // setPeople(data);
        // }
    })
    async function fetchData() {
        if (params.id) {

            try {
                startLoading()
                return await planetCrud.retrieve(params.id)
            } catch (error) {
                // return Promise.resolve()
            } finally { stopLoading() }
        }
    }
    return (
        <Card h={'100%'} px={'50px'} pt={'20px'} sx={{ overflowY: 'auto' }}>
            <Box bg={'#2962c4'} sx={{ borderRadius: '10px', color: 'white' }}>
                <Flex justify={'center'} py={'xl'} ><Title>{data?.name}</Title></Flex>
            </Box>
            <Card bg={'#eaebed'} my={'xl'} >
                <Flex justify={'space-around'}>
                    <Box>
                        <DetailsItem name='Name' value={data?.name} />
                        <DetailsItem name='Terrain' value={data?.terrain} />
                        <DetailsItem name='Climate' value={data?.climate} />
                        <DetailsItem name='Gravity' value={data?.gravity} />
                        <DetailsItem name='Population' value={data?.population} />
                    </Box>
                    <Box>
                        <DetailsItem name='Diameter' value={data?.diameter} />
                        <DetailsItem name='Orbital Period' value={data?.orbital_period} />
                        <DetailsItem name='Rotation Period' value={data?.rotation_period} />
                        <DetailsItem name='Surface Water' value={data?.surface_water} />
                    </Box>
                </Flex>

            </Card>
            <Card bg={'#eaebed'} my={'xl'} >
                <Tabs defaultValue="residents">
                    <Tabs.List>
                        <Tabs.Tab value="residents" icon={<PiUsersDuotone size="0.8rem" />}>Residents</Tabs.Tab>
                        <Tabs.Tab value="films" icon={<FaFilm size="0.8rem" />}>Films</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="residents" pt="xs">
                        <PeopleTable urls={data?.residents || []} />
                    </Tabs.Panel>

                    <Tabs.Panel value="films" pt="xs">
                        <FilmsTable urls={data?.films || []} />
                    </Tabs.Panel>
                </Tabs>
            </Card>
        </Card>
    )
}
