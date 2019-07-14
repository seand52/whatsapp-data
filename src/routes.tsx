import Home from "./components/Home/Home";
import Results from "./components/Results/Results";

const AppRouter: {
  main: any;
  exact: boolean;
  path: string;
  id: number;
}[] = [
  {
    id: 1,
    main: Home,
    exact: true,
    path: "/"
  },
  {
    id: 2,
    main: Results,
    exact: true,
    path: "/results"
  }
];

export default AppRouter;
