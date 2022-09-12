import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// const theme = extendTheme({colors})

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
