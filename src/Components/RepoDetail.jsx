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
import CodeTabCard from "./Layout/CodeTabCard";
import BrowseIssuesTab from "./Layout/BrowseIssueTabs";

const RepoDetail = () => {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const { data, isSuccess } = useQuery({
    queryKey: ["repoDetail", itemId],
    queryFn: () =>
      fetch(`https://api.github.com/repos/Sapsan13/${itemId}`, {
        headers: {
          Authorization: `Bearer ${personalKey}`,
        },
      }).then((data) => data.json()),
  });
  // console.log(data, "repoDetail");

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
      navigate("/repos");
    },
  });

  const deleteRepoHandler = () => {
    const result = confirm(`Are you shure you wanna delete "reponame"?`);
    if (!result) return;
    mutation.mutate();
  };

  if (!data || !isSuccess) return;
  return (
    <>
      <Outlet />
      <Button
        component={Link}
        to={`/repos/${itemId}/createissue`}
        align="center"
        variant="light"
        color="blue"
        radius="xl"
        size="sm"
        // onClick={deleteRepoHandler}
      >
        Create new Issue
      </Button>
      <Tabs
        variant="outline"
        radius="lg"
        keepMounted={false}
        defaultValue="code"
      >
        <Tabs.List>
          <Tabs.Tab value="code" icon={<IconPhoto size="0.8rem" />}>
            Code
          </Tabs.Tab>
          <Tabs.Tab value="messages" icon={<IconMessageCircle size="0.8rem" />}>
            Issues
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="code" pt="xs">
          <CodeTabCard data={data} deleteRepoHandler={deleteRepoHandler} />
        </Tabs.Panel>

        <Tabs.Panel value="messages" pt="xs">
          <Card
            // key={item.id}
            display={"flex"}
            style={{ height: "75px" }}
            shadow="sm"
            padding="sm"
            radius="md"
            withBorder
          >
            <Card
              align="center"
              mah="500px"
              shadow="sm"
              padding="xs"
              radius="md"
            >
              <Text align="center" weight={500}>
                <>{itemId}</>
                <Flex direction="row" justify="space-between"></Flex>
              </Text>
            </Card>
          </Card>
          <Card align="center" mah="500px" shadow="sm" padding="xs" radius="md">
            <Text align="center" weight={500}>
              <BrowseIssuesTab itemId={itemId} />
              <Flex direction="row" justify="space-between"></Flex>
            </Text>
          </Card>
        </Tabs.Panel>
      </Tabs>
    </>
  );
};
export default RepoDetail;
