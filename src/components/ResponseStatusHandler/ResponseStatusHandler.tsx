import { createContext, ReactNode, useContext } from "react";
import { ResponseStatus } from "../../types/general";

// Create Context
const StateContext = createContext<ResponseStatus>(ResponseStatus.Loading);

function ResponseStatusHandler({
  status,
  children,
}: {
  status: ResponseStatus;
  children: ReactNode;
}) {
  return (
    <StateContext.Provider value={status}>{children}</StateContext.Provider>
  );
}

function StateComponent({
  status,
  children,
}: {
  status: ResponseStatus;
  children?: ReactNode;
}) {
  // Use context
  const state = useContext(StateContext);
  return state === status ? <>{children}</> : null;
}

ResponseStatusHandler.Loading = (props: { children: ReactNode }) => (
  <StateComponent status={ResponseStatus.Loading} {...props} />
);

ResponseStatusHandler.Error = (props: { children: ReactNode }) => (
  <StateComponent status={ResponseStatus.Error} {...props} />
);

ResponseStatusHandler.Empty = (props: { children: ReactNode }) => (
  <StateComponent status={ResponseStatus.Empty} {...props} />
);

ResponseStatusHandler.Success = (props: { children: ReactNode }) => (
  <StateComponent status={ResponseStatus.Success} {...props} />
);

export default ResponseStatusHandler;
