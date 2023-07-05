import { Avatar, Flex, Header } from "@mantine/core";
import { Link } from "react-router-dom";

const Head = () => {
  return (
    <Header height={{ base: 50, md: 70 }} px="sm">
      <Flex
        style={{ height: "100%" }}
        mih={50}
        gap="md"
        justify="space-between"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Link to={"./"}>
          <Avatar
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9XbjaBqG3qf7r9vBjPIZAmridvdhN0YPTSg&usqp=CAU"
            alt="it's me"
          />
        </Link>
      </Flex>
    </Header>
  );
};
export default Head;
