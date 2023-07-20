import Editor from "../Editor";

type Props = {
  code?: string;
};
const ChallengeSolution = ({ code }: Props) => {
  return <Editor code={code} language="javascript" editable={false} />;
};

export default ChallengeSolution;
