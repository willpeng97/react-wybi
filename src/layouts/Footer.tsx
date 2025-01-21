export const Footer = () => {
  return (
    <footer className="text-secondary opacity-75 w-100 text-center">
      {`Copyright © ${new Date().getFullYear()} `}
      <a href="https://www.weyutech.com/" target="_blank" className="text-secondary">
        WeYu Technology Co.
      </a>
      {", Ltd. All Rights Reserved."}
    </footer>
  );
}