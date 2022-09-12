import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import FileList from "../components/FileList";
import FileGrid from "../components/FileGrid";
import { Heading, Flex, Box, useTheme, Text } from "@chakra-ui/react";

export default function Home() {
    const [directoryListing, setDirectoryListing] = useState();
    const [currentDirectory, setCurrentDirectory] = useState();
    const theme = useTheme();

    useEffect(() => {
        fetch("/api/list")
            .then((res) => res.json())
            .then((res) => {
                setDirectoryListing(res.tree);
                setCurrentDirectory(res.currentDirectory);
            });
        console.log({ theme, currentDirectory });
    }, [theme]);

    function handleChangeDirectory(dir) {
        console.log({ dir });
        fetch("/api/list", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ directoryName: dir }),
        })
            .then((res) => res.json())
            .then((res) => {
                setCurrentDirectory(res.currentDirectory);
            });
    }

    return (
        <div>
            <Head>
                <title>File Server</title>
                <meta
                    name="description"
                    content="Next/Node media file server"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box as="main">
                <Heading>File Server</Heading>
                <Flex p={10} gap={5} bg="purple.400" minH="80vh">
                    <Box basis="30%" borderRadius={3} bg="whiteAlpha.100" p={10}>
                        <FileList
                            directoryListing={directoryListing}
                            handleChangeDirectory={handleChangeDirectory}
                        />
                    </Box>
                    <Box
                        basis="70%"
                        borderRadius={3}
                        bg="whiteAlpha.50"
                        p={10}
                        w="full"
                    >
                        <FileGrid currentDirectory={currentDirectory} />
                    </Box>
                </Flex>
            </Box>

            <Flex
                as="footer"
                w="full"
                align="center"
                justify="center"
                p={10}
                bg="purple.300"
            >
                <Text>
                    Created by <strong>Thinkdrops</strong>
                </Text>
            </Flex>
        </div>
    );
}
