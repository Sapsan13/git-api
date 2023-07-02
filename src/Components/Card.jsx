import { Card, Text, Button, Flex, Chip, Badge } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";

function Kard({ repo }) {
  console.log(repo);

  return (
    <Flex direction="column" gap="md">
      {repo.map((item) => {
        return (
          <Card
            key={repo.id}
            display={"flex"}
            style={{ height: "75px" }}
            shadow="sm"
            padding="sm"
            radius="md"
            withBorder
          >
            <Flex
              gap="md"
              justify="space-between"
              align="center"
              direction="row"
              style={{ width: "100%" }}
            >
              <Flex direction={"column"} align={"left"} gap={"xs"}>
                <Flex gap={"xs"} align={"center"}>
                  <Text color="blue" fz="xl">{`${item.name}`}</Text>
                  <Badge size="xs" color="gray">{`${
                    item.private ? "Private" : "Public"
                  }`}</Badge>
                </Flex>
                <Flex align={"center"} gap="xs">
                  {item.language ? (
                    <Text fz="xs">{item.language} </Text>
                  ) : (
                    false
                  )}
                  <Text fz="xs">{`${item.updated_at.toLocaleDateString()}`}</Text>
                </Flex>
              </Flex>

              <Button
                size="xs"
                variant="outline"
                leftIcon={<IconStar size="0.9rem" />}
              >
                Star
              </Button>
            </Flex>

            {/* <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button> */}
          </Card>
        );
      })}
    </Flex>
  );
}
export default Kard;
