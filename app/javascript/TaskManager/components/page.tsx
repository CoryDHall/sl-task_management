import React from 'react';
export interface PageProps {
  title: string;
  children?: React.ReactNode;
}

export default function Page({ title, children }: PageProps) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function composePage<T>(title: string, Component: React.ComponentType<T>) {
  return function PageWrapper(props: T) {
    return (
      <Page title={title}>
        <Component {...props} />
      </Page>
    );
  };
}
