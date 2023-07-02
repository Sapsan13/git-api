import { useQuery } from "@tanstack/react-query";
import Kard from "./Card";

export const Repositories = () => {
  //REpo fetch
  const { data: repo } = useQuery({
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

  if (!repo) return;

  return <Kard repo={repo} />;
};
export default Repositories;
