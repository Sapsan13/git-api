import { useQuery } from "@tanstack/react-query";
import { AppShell, useMantineTheme } from "@mantine/core";
import LeftNavBar from "./Layout/LeftNavBar";
import Futer from "./Layout/Futer";
import Head from "./Layout/Head";
import { personalKey } from "./personalKey";
import { AppRoutes } from "../routes";

function Main() {
  // Queries
  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      fetch("https://api.github.com/users/Sapsan13", {
        headers: {
          Authorization: `Bearer ${personalKey}`,
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
      <AppRoutes />
    </AppShell>
  );
}

export default Main;
