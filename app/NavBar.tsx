"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { LuListTodo } from "react-icons/lu";
import classNames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Tasks", href: "/tasks" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <LuListTodo />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            className={classNames({
                "text-slate-400" : link.href === currentPath,
                "text-slate-100" : link.href !== currentPath,
                "hover:text-slate-500 transition-colors": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}

        {/* <li className="hover:text-slate-400 transition-colors"><Link href="/">Dashboard</Link></li>
        <li className="hover:text-slate-400 transition-colors"><Link href="/tasks">Tasks</Link></li> */}
      </ul>
    </nav>
  );
};

export default NavBar;
