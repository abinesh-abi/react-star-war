import { createStyles, Group, Text, UnstyledButton } from '@mantine/core'
import { IconType } from 'react-icons'
import { Link, useLocation } from 'react-router-dom';

type Props = { Icon: IconType, text: string, path: string }

const useStyles = createStyles((theme) => ({
    button: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing.sm,
        margin: theme.spacing.sm,
        borderRadius: '10px',
        color: theme.white,
        transition: 'background-color 0.2s ease, border-color 0.2s ease',

        '&:hover': {
            backgroundColor: theme.colors.blue[6], // Change to your desired hover color
            borderColor: theme.colors.blue[6], // Change border color on hover
        },

        '&.selected': {
            backgroundColor: theme.colors.green[6], // Change to your desired selected color
            borderColor: theme.colors.green[6], // Change border color when selected
        },
    },
}));

export default function SidebarItems({ Icon, text, path }: Props) {
    const { classes } = useStyles();
    const location = useLocation();
    const pathname = location.pathname
    const isSelectedSidebar = pathname.startsWith(path)
    return (
        // <UnstyledButton c={'white'} p={'sm'} m={'sm'} style={{ border: '1px solid white', borderRadius: '10px' }}>
        <UnstyledButton className={`${classes.button} ${isSelectedSidebar ? 'selected' : ''}`}>
            <Link to={path} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                <Group>
                    <Icon />
                    <div>
                        <Text>{text}</Text>
                    </div>
                </Group>
            </Link>
        </UnstyledButton>
    )
}
