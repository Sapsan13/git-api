import { Card, Text, Button, Flex, Badge } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { StarOff } from "tabler-icons-react";

function Kard({ repository: item, isStarred }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      return fetch(
        `https://api.github.com/user/starred/${item.owner.login}/${item.name}`,
        {
          method: isStarred ? "DELETE" : "PUT",
          headers: {
            Authorization: `Bearer ${personalKey}`,
          },
        }
      );
    },
    onSuccess: () => {
      console.log("Success");
      queryClient.invalidateQueries({ queryKey: ["star"] });
    },
  });

  return (
    <Card
      key={item.id}
      display={"flex"}
      style={{ height: "75px" }}
      shadow="sm"
      padding="sm"
      radius="md"
      withBorder
      component={Link}
      to={`/repos/${item.name}`}
    >
      {/* {console.log(item)} */}
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
            {item.language ? <Text fz="xs">{item.language} </Text> : false}
            <Text fz="xs">{`${item.updated_at.toLocaleDateString()}`}</Text>
          </Flex>
        </Flex>

        <Button
          onClick={mutation.mutate}
          size="xs"
          variant="outline"
          leftIcon={
            isStarred ? (
              <IconStar size="0.9rem" color="orange" />
            ) : (
              <StarOff size={16} strokeWidth={2} color="black" />
            )
          }
        >
          Star
        </Button>
      </Flex>
      {/* <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button> */}
    </Card>
  );
}
export default Kard;
