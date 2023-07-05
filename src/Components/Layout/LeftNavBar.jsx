import { Avatar, Flex, Navbar, NavLink } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";

const LeftNavBar = ({ repoData: data }) => {
  const [opened, setOpened] = useState(false);
  return (
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 210 }}>
      <Flex
        direction="column"
        justify="space-between"
        style={{ height: "100%" }}
      >
        <div>
          <NavLink
            label="Get Repositories"
            component={Link}
            to="/repositories"
          />
        </div>

        <Flex gap="sm">
          <Avatar src={`${data.avatar_url}`} alt="it's me" />

          <Flex direction="column">
            <span>{data.name}</span>
            <span>{data.email}</span>
          </Flex>
        </Flex>
      </Flex>
    </Navbar>
  );
};
export default LeftNavBar;
