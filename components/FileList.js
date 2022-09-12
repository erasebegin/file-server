import { List, ListItem, ListIcon } from "@chakra-ui/react";
import { AiFillFile, AiFillFolder } from "react-icons/ai";

const ListRepeater = ({ directory, handleChangeDirectory }) => {
    return (
        <List borderLeft="1px" borderColor="purple.300">
            {directory?.map((item, index) => {
                if (!item.children) {
                    return (
                        <ListItem
                            key={index + " " + item.name}
                            pl={3}
                            color="purple.100"
                            whiteSpace="nowrap"
                        >
                            <ListIcon as={AiFillFile} color="purple.100" />
                            <span style={{ cursor: "pointer" }}>
                                {item.name}
                            </span>
                        </ListItem>
                    );
                } else {
                    return (
                        <ListItem
                            pl={3}
                            color="purple.100"
                            key={index + " " + item.name}
                            whiteSpace="nowrap"
                        >
                            <ListIcon as={AiFillFolder} color="purple.100" />
                            <span
                                onClick={() => handleChangeDirectory(item.path)}
                                style={{ cursor: "pointer" }}
                            >
                                {item.name}
                            </span>
                            <ListRepeater
                                directory={item.children}
                                handleChangeDirectory={handleChangeDirectory}
                            />
                        </ListItem>
                    );
                }
            })}
        </List>
    );
};

export default function FileList({ directoryListing, handleChangeDirectory }) {
    return (
        <List>
            <ListItem color="purple.100">
                <ListIcon as={AiFillFolder} color="purple.100" />
                <span
                    onClick={() => handleChangeDirectory("./server_files")}
                    style={{ cursor: "pointer" }}
                >
                    /root
                </span>
            </ListItem>
            <ListRepeater
                directory={directoryListing?.children}
                handleChangeDirectory={handleChangeDirectory}
            />
        </List>
    );
}
