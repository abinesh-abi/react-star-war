import { Box, Card, Center, Flex, Tabs, Text, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Species, Starship } from '../../types/global';
import { useAppStore } from '../../store/app.store';
import DetailsItem from '../../components/comon/detailsItem/DetailsItem';
import PeopleTable from '../../components/tables/PeopleTable';
import { PiUsersDuotone } from 'react-icons/pi';
import FilmsTable from '../../components/tables/FilmsTable';
import { FaFilm } from 'react-icons/fa';
import { speciesCrud } from '../../api/apis';

export default function SpeciesDetails() {
    const params = useParams<{ id: string | undefined }>()
    const { startLoading, stopLoading } = useAppStore()
    const { data, error, isLoading, refetch } = useQuery<Species>({
        queryKey: ['species-details'],
        queryFn: () => fetchData(),
        // onSuccess: (data) => {
        //     // setPeople(data);
        // }
    })
    async function fetchData() {
        if (params.id) {

            try {
                startLoading()
                return await speciesCrud.retrieve(params.id)
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
                        <DetailsItem name='Classification' value={data?.classification} />
                        <DetailsItem name='Language' value={data?.language} />
                        <DetailsItem name='Avg Lifespan' value={data?.average_lifespan} />
                        <DetailsItem name='Avg Height' value={data?.average_height} />
                    </Box>
                    <Box>
                        <DetailsItem name='Designation' value={data?.designation} />
                        <DetailsItem name='Hair Color' value={data?.hair_colors} />
                        <DetailsItem name='Eye Color' value={data?.eye_colors} />
                        <DetailsItem name='Skin Color' value={data?.skin_colors} />
                    </Box>
                </Flex>

            </Card>
            <Card bg={'#eaebed'} my={'xl'} >
                <Tabs defaultValue="people">
                    <Tabs.List>
                        <Tabs.Tab value="people" icon={<PiUsersDuotone size="0.8rem" />}>People</Tabs.Tab>
                        <Tabs.Tab value="films" icon={<FaFilm size="0.8rem" />}>Films</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="people" pt="xs">
                        <PeopleTable urls={data?.people || []} />
                    </Tabs.Panel>

                    <Tabs.Panel value="films" pt="xs">
                        <FilmsTable urls={data?.films || []} />
                    </Tabs.Panel>


                </Tabs>
            </Card>
        </Card>
    )
}
