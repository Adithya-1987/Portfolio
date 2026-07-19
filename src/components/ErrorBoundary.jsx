import { Component } from 'react';

/**
 * Catches render/effect errors in its subtree so one failing component can't
 * blank the entire app. Used to isolate the WebGL background (which can throw
 * if the browser can't create a WebGL context) and to guard the whole app
 * with a visible fallback instead of a blank page.
 *
 * @param {React.ReactNode} [fallback] - rendered on error (defaults to null)
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Surface it for debugging without taking the page down.
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
