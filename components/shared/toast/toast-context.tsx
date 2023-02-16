import { createContext, useReducer, useContext, ReactNode } from "react";

type Toast = {
  id: string;
  message: string;
  type: string;
};

type ToastState = {
  toasts: Toast[];
};

type Action =
  | { type: "ADD_TOAST"; toast: Toast }
  | { type: "DELETE_TOAST"; id: string };

type Dispatch = (action: Action) => void;

const ToastStateContext = createContext<ToastState>({ toasts: [] });
const ToastDispatchContext = createContext<Dispatch | null>(null);

function toastReducer(state: ToastState, action: Action): ToastState {
  switch (action.type) {
    case "ADD_TOAST": {
      return {
        ...state,
        toasts: [...state.toasts, action.toast],
      };
    }
    case "DELETE_TOAST": {
      const updatedToasts = state.toasts.filter((e) => e.id !== action.id);
      return {
        ...state,
        toasts: updatedToasts,
      };
    }
    default: {
      throw new Error("Unhandled action");
    }
  }
}

type Props = {
  children: ReactNode;
};

export function ToastProvider({ children }: Props) {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] });

  return (
    <ToastStateContext.Provider value={state}>
      <ToastDispatchContext.Provider value={dispatch}>
        {children}
      </ToastDispatchContext.Provider>
    </ToastStateContext.Provider>
  );
}

export function useToastStateContext() {
  const context = useContext(ToastStateContext);
  if (context === undefined) {
    throw new Error("useToastStateContext must be used within a ToastProvider");
  }
  return context;
}

export function useToastDispatchContext() {
  const context = useContext(ToastDispatchContext);
  if (context === null) {
    throw new Error("useToastDispatchContext must be used within a ToastProvider");
  }
  return context;
}
