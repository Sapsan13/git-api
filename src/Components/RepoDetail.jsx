import { Badge, Button, Card, Flex, Group, Tabs, Text } from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import { personalKey } from "./personalKey";
import IssueCreate from "./IssueCreate";

const RepoDetail = () => {
  const navigate = useNavigate();
  const { item } = useParams();
  const { data } = useQuery({
    queryKey: ["repoDetail", item],
    queryFn: () =>
      fetch(`https://api.github.com/repos/Sapsan13/${item}`, {
        headers: {
          Authorization: `Bearer ${personalKey}`,
        },
      }).then((data) => data.json()),
  });

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`https://api.github.com/repos/${data.full_name}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${personalKey}`,
        },
      });
    },
    onSuccess: () => {
      console.log("Success Deleted");
      // queryClient.invalidateQueries({ queryKey: ["star"] });
      navigate("/repositories");
    },
  });

  const deleteRepoHandler = () => {
    const result = confirm(`Are you shure you wanna delete "reponame"?`);
    if (!result) return;
    mutation.mutate();
  };

  if (!data) return;
  return (
    <>
      <Outlet />
      <Button
        component={Link}
        to="/repos/createissue"
        align="center"
        variant="light"
        color="blue"
        radius="xl"
        size="sm"
        // onClick={deleteRepoHandler}
      >
        Create new Issue
      </Button>
      <Tabs variant="outline" radius="lg" defaultValue="code">
        <Tabs.List>
          <Tabs.Tab value="code" icon={<IconPhoto size="0.8rem" />}>
            Code
          </Tabs.Tab>
          <Tabs.Tab value="messages" icon={<IconMessageCircle size="0.8rem" />}>
            Issues
          </Tabs.Tab>
          {/* <Tabs.Tab value="settings">Settings</Tabs.Tab> */}
        </Tabs.List>

        <Tabs.Panel value="code" pt="xs">
          {/* TODO: render detail component */}
          <Card align="center" mah="50px" shadow="sm" padding="xs" radius="md">
            <Text align="center" weight={500}>
              <Flex direction="row" justify="space-between">
                <Flex>Repo ID:{data.id}</Flex>
                <Flex>RepoName :{data.name}</Flex>
                <Flex>
                  {` ${
                    data.private
                      ? "Repository is private"
                      : "Repository is public"
                  } `}
                </Flex>
                <Button
                  align="center"
                  variant="light"
                  color="blue"
                  radius="xl"
                  size="sm"
                  onClick={deleteRepoHandler}
                >
                  Delete this repository
                </Button>
              </Flex>
            </Text>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="messages" pt="xs">
          {/* TODO: render issues component */}
          <Card align="center" mah="500px" shadow="sm" padding="xs" radius="md">
            <Text align="center" weight={500}>
              <Flex direction="row" justify="space-between">
                ISSUES TABLE
              </Flex>
            </Text>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="settings" pt="xs">
          Settings tab content
        </Tabs.Panel>
      </Tabs>
    </>
  );
};
export default RepoDetail;
