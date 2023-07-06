import { Tabs } from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { personalKey } from "./personalKey";

const RepoDetail = () => {
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
  console.log(data, "data");
  return (
    <Tabs variant="outline" radius="lg" defaultValue="gallery">
      <Tabs.List>
        <Tabs.Tab value="code" icon={<IconPhoto size="0.8rem" />}>
          Code
        </Tabs.Tab>
        <Tabs.Tab value="messages" icon={<IconMessageCircle size="0.8rem" />}>
          Issues
        </Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="code" pt="xs">
        Repository Detail
      </Tabs.Panel>

      <Tabs.Panel value="messages" pt="xs">
        Issues
      </Tabs.Panel>

      <Tabs.Panel value="settings" pt="xs">
        Settings tab content
      </Tabs.Panel>
    </Tabs>
  );
};
export default RepoDetail;
