import { Grid, GridItem } from "@chakra-ui/react";

export default function FileGrid({ currentDirectory }) {
    return (
        <Grid>
            {currentDirectory?.map((file, index) => {
                return (
                    <GridItem key={"file-thumbnail-" + index}>{file.name}</GridItem>
                );
            })}
        </Grid>
    );
}
