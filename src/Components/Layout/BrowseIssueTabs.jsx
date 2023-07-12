import { useQuery } from "@tanstack/react-query";
import { personalKey } from "../personalKey";
import { Badge, Card, Flex, Text } from "@mantine/core";

const BrowseIssueTab = ({ itemId }) => {
  const { data: issueData } = useQuery({
    queryKey: ["Issue", itemId],
    queryFn: () =>
      fetch(`https://api.github.com/repos/Sapsan13/${itemId}/issues`, {
        headers: {
          Authorization: `Bearer ${personalKey}`,
        },
      }).then((issueData) => issueData.json()),
  });
  if (!issueData) return;
  console.log(issueData);

  return issueData.map((item) => (
    <Card
      // key={item.id}
      display={"flex"}
      style={{ height: "75px" }}
      shadow="sm"
      padding="sm"
      radius="md"
      withBorder
      // component={Link}
      // to={`/repos/${item.name}`}
    >
      <Flex
        gap="md"
        justify="space-between"
        align="center"
        direction="row"
        style={{ width: "100%" }}
      >
        <Flex direction={"row"} align={"left"} gap={"xs"}>
          <Flex gap={"xs"} align={"center"}>
            <Text color="blue" fz="xl">
              {item.title}
            </Text>
            <Text>{item.state}</Text>
            <Badge size="xs" color="gray"></Badge>
          </Flex>
          <Text>{item.created_at}</Text>
          <Flex align={"center"} gap="xs">
            <Text fz="xs">{item.user.login}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  ));
};

export default BrowseIssueTab;
