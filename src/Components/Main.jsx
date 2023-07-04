import { useQuery } from "@tanstack/react-query";
import { Routes, Route, Link } from "react-router-dom";
import Repositories from "./Repositories";

import {
  AppShell,
  Flex,
  Avatar,
  Navbar,
  Header,
  Footer,
  Text,
  useMantineTheme,
  NavLink,
} from "@mantine/core";
import { useState } from "react";
// import { IconCircleOff, IconFingerprint, IconGauge } from "@tabler/icons-react";

function Main() {
  // Access the client
  //   const queryClient = useQueryClient();

  // Queries
  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      fetch("https://api.github.com/users/Sapsan13", {
        headers: {
          Authorization: "Bearer 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",
        },
      }).then((data) => data.json()),
  });

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  // Mutations
  // const mutation = useMutation({
  //   mutationFn: postTodo,
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries({ queryKey: ['todos'] })
  //   },
  // })
  if (!data) return;
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 210 }}
        >
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
      }
      footer={
        <Footer height={60} p="md">
          <Text component="a" href={`${data.html_url}}`}>
            <span>HTML URL </span>
          </Text>
          <Text component="a" href={`${data.repos_url}}`}>
            <span> *REPOS*</span>
          </Text>

          <Text component="a" href="https://github.com/">
            <span>{`${data.name}`} </span>
          </Text>
        </Footer>
      }
      header={
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
      }
    >
      <Routes>
        <Route path="/repositories" element={<Repositories />} />
        <Route path="/" element={<p>Home</p>} />
        {/* <Route path="titlePage" element={<AppShell />} /> */}
        {/* <Route path="/homm" element={<TableMain />} />  */}
      </Routes>
    </AppShell>
  );
}

export default Main;
