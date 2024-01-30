import Counter from "./WrapperCounter";
import {
  selectTodos,
  totalTodos,
  totalTodosDone,
} from "../../../utilites/selectors";
import { useAppSelector } from "../../../hook";

const CounterTodos: React.FC = () => {
  const total = useAppSelector(totalTodos);
  const totalDone = useAppSelector(totalTodosDone);
  const activedTodos = total - totalDone;
  const completedTodos = totalDone;

  return <Counter active={activedTodos} complete={completedTodos} />;
};

export default CounterTodos;
