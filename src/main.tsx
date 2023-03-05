import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient } from "react-query";
import { QueryClientProvider } from "react-query";
import App from "./App";
import "./index.css";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={client}>
			<App />
		</QueryClientProvider>
	</React.StrictMode>
);
