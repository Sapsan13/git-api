import { Button, Card, Flex, Text } from "@mantine/core";

const CodeTabCard = ({ data, deleteRepoHandler }) => {
  return (
    <Card align="center" mah="50px" shadow="sm" padding="xs" radius="md">
      <Text align="center" weight={500}>
        <Flex direction="row" justify="space-between">
          <Flex>Repo ID:{data.id}</Flex>
          <Flex>RepoName :{data.name}</Flex>
          <Flex>
            {` ${
              data.private ? "Repository is private" : "Repository is public"
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
  );
};
export default CodeTabCard;
