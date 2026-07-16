import AuthVerifier from "@/components/auth-verifier";
import AuthProvider from "@/context/auth-provider";
import { ThemeProvider } from "@/context/theme-provider";
import { Outlet } from "react-router";

function Root() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<AuthProvider>
				<AuthVerifier>
					<Outlet />
				</AuthVerifier>
			</AuthProvider>
		</ThemeProvider>
	);
}

export default Root;