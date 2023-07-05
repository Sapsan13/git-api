import { Footer, Text } from "@mantine/core";

const Futer = ({ repoData: data }) => {
  return (
    <Footer height={60} p="md">
      <Text component="a" href={`${data.html_url}}`}>
        <span>HTML URL </span>
      </Text>
      <Text component="a" href={`${data.repos_url}}`}>
        <span> *REPOS*</span>
      </Text>

      <Text component="a" href="https://github.com/">
        <span>{`${data.name}`} </span>
      </Text>
    </Footer>
  );
};

export default Futer;
