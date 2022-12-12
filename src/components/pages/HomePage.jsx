import { Home, GamesView } from "..";

export function HomePage({ breakpoint }) {
  const container = {
    width: "100%",
    overflow: "hidden",
  };

  return (
    <div style={container}>
      <Home breakpoint={breakpoint} />
      <GamesView breakpoint={breakpoint} />
    </div>
  );
}
