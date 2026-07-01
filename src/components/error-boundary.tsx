import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "./ui";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Catches render-time crashes anywhere in the tree and shows a recovery UI
 * instead of an unmounted white screen.
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // In a real app this would report to Sentry/Datadog/etc.
    console.error("Uncaught UI error:", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.assign("/");
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
          <h1 className="text-2xl font-bold">Something broke</h1>
          <p className="max-w-md text-muted-foreground">
            An unexpected error occurred. Reloading usually fixes it.
          </p>
          <Button onClick={this.handleReset}>Reload the app</Button>
        </div>
      );
    }

    return this.props.children;
  }
}
