import { Box, Button, Checkbox, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { personalKey } from "./personalKey";
import { useNavigate } from "react-router-dom";

const CreateRepository = () => {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      private: false,
    },
  });
  const mutation = useMutation({
    mutationFn: (values) => {
      return fetch("https://api.github.com/user/repos", {
        headers: {
          Authorization: `Bearer ${personalKey}`,
        },
        method: "POST",
        body: JSON.stringify(values),
      });
    },
    onSuccess: () => {
      console.log("Success");
      queryClient.invalidateQueries({ queryKey: ["star"] });
      navigate("/repositories");
    },
  });

  //   const submitCreateRepoHandler = () => {
  //     form.values.name,
  //     form.values.description,
  //     form.values.private
  //   };
  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="RepositoryName"
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Description"
          placeholder="Repo Description"
          mt="sm"
          {...form.getInputProps("description")}
        />
        <Checkbox
          mt="md"
          label="Create a private repository?"
          {...form.getInputProps("private", { type: "checkbox" })}
        />

        <Group position="right" mt="xl">
          <Button type="submit">Add new Repository</Button>
        </Group>
      </form>
    </Box>
  );
};

export default CreateRepository;
