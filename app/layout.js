// app/layout.js

import './globals.css';

// 1. Add your title and description
export const metadata = {
  title: "Personal Portfolio - Anh Minh",
  description: "Personal portfolio showcasing projects, skills and contact.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 2. Add your Bootstrap Icons stylesheet */}
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}