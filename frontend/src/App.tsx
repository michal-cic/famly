import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AttendanceSheet } from "./components/AttendanceSheet";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Attendance sheet</h1>
      <AttendanceSheet />
    </QueryClientProvider>
  );
}

export default App;
