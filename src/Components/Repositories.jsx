import { useQuery } from "@tanstack/react-query";
import Kard from "./Card";
// import { Direction } from "tabler-icons-react";
import { Flex } from "@mantine/core";

export const Repositories = () => {
  //REpo fetch
  const { data: repositories } = useQuery({
    queryKey: ["repositories"],
    queryFn: () =>
      fetch("https://api.github.com/user/repos", {
        headers: {
          Authorization: "Bearer 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",
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
          Authorization: "Bearer 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",
        },
      }).then((data) => data.json()),
  });
  const mappedNames = starredRepos.map((item) => {
    return item.name;
  });

  if (!repositories) return;

  return (
    <Flex direction="column" gap="md">
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
