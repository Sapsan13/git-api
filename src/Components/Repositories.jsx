import { useQuery } from "@tanstack/react-query";
import Kard from "./Card";
import { Box, Button, Flex } from "@mantine/core";
import { Link } from "react-router-dom";
import { personalKey } from "./personalKey";

export const Repositories = () => {
  //Repo fetch
  const { data: repositories } = useQuery({
    queryKey: ["repositories"],
    queryFn: () =>
      fetch("https://api.github.com/user/repos", {
        headers: {
          Authorization: `Bearer ${personalKey}`,
        },
      })
        .then((data) => data.json())
        .then((data) =>
          data.map((item) => ({
            ...item,
            updated_at: new Date(item.updated_at),
          }))
        ),
  });
  // Fetching starred repos
  const { data: starredRepos = [] } = useQuery({
    queryKey: ["star"],
    queryFn: () =>
      fetch("https://api.github.com/users/Sapsan13/starred", {
        headers: {
          Authorization: `Bearer ${personalKey}`,
        },
      }).then((data) => data.json()),
  });
  const mappedNames = starredRepos.map((item) => {
    return item.name;
  });

  if (!repositories) return;
  return (
    <Flex direction="column" gap="md">
      <Box
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          textAlign: "center",
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          cursor: "pointer",

          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[1],
          },
        })}
      >
        <Flex justify="space-between" align="center">
          <Button
            component={Link}
            to={"/repoCreate"}
            variant="light"
            color="blue"
            radius="xl"
            size="md"
          >
            Add New Repository
          </Button>
          {/* <Button variant="light" color="blue" radius="xl" size="md">
            Delete Repository
          </Button> */}
          <Button variant="light" color="blue" radius="xl" size="md">
            Settings
          </Button>
          <Button variant="light" color="blue" radius="xl" size="md">
            Settings
          </Button>
        </Flex>
      </Box>
      {repositories.map((item) => {
        return (
          <Kard
            key={item.name}
            repository={item}
            isStarred={mappedNames.includes(item.name)}
          />
        );
      })}
    </Flex>
  );
};
export default Repositories;
