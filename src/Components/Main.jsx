import { useMutation, useQuery } from "@tanstack/react-query";
import { Routes, Route, Link } from "react-router-dom";
import Repositories from "./Repositories";
import CreateRepository from "./CreateRepository";
import RepoDetail from "./RepoDetail";

import { AppShell, useMantineTheme } from "@mantine/core";

import LeftNavBar from "./Layout/LeftNavBar";
import Futer from "./Layout/Futer";
import Head from "./Layout/Head";

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
      navbar={<LeftNavBar repoData={data} />}
      footer={<Futer repoData={data} />}
      header={<Head />}
    >
      <Routes>
        <Route path="/repo/detail" element={<RepoDetail />} />
        <Route path="/repositories" element={<Repositories />} />
        <Route path="/" element={<p>Home</p>} />
        <Route path="/repoCreate" element={<CreateRepository />} />
      </Routes>
    </AppShell>
  );
}

export default Main;
