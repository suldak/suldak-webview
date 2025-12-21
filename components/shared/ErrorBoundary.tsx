"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleCopyError = () => {
    const errorData = {
      timestamp: new Date().toISOString(),
      error: {
        message: this.state.error?.message,
        stack: this.state.error?.stack,
      },
      componentStack: this.state.errorInfo?.componentStack,
      url: typeof window !== "undefined" ? window.location.href : "",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    };

    navigator.clipboard.writeText(JSON.stringify(errorData, null, 2));
    alert("에러 정보가 클립보드에 복사되었습니다.");
  };

  render() {
    if (this.state.hasError) {
      // 커스텀 fallback이 있으면 사용
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 기본 에러 UI
      return (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-gray-900 p-4">
          <div className="w-full max-w-md rounded-lg border border-red-500 bg-gray-800 p-6">
            <h2 className="mb-4 text-lg font-bold text-red-400">
              ⚠️ 오류가 발생했습니다
            </h2>

            <div className="mb-4 rounded bg-black p-3">
              <p className="mb-2 text-sm font-semibold text-white">
                에러 메시지:
              </p>
              <p className="break-all font-mono text-xs text-red-300">
                {this.state.error?.message || "Unknown error"}
              </p>
            </div>

            {this.state.error?.stack && (
              <div className="mb-4 max-h-32 overflow-auto rounded bg-black p-3">
                <p className="mb-2 text-sm font-semibold text-white">
                  스택 트레이스:
                </p>
                <pre className="whitespace-pre-wrap font-mono text-xs text-gray-400">
                  {this.state.error.stack.slice(0, 500)}...
                </pre>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={this.handleRetry}
                className="flex-1 rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
              >
                🔄 다시 시도
              </button>
              <button
                onClick={this.handleCopyError}
                className="flex-1 rounded bg-gray-600 px-4 py-2 text-sm text-white hover:bg-gray-700"
              >
                📋 에러 복사
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
