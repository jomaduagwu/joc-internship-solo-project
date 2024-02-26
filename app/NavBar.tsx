import Link from "next/link";
import React from 'react';
import { LuListTodo } from "react-icons/lu";

const NavBar = () => {

  const links = [
    { label: 'Dashboard', href: '/'},
    { label: 'Tasks', href: '/tasks/list'},
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/"><LuListTodo /></Link>
      <ul className="flex space-x-6">
        {links.map((link) => 
            <Link
                key={link.href} className="hover:text-slate-300 transition-colors" href={link.href}>{link.label}</Link>)}
      
        {/* <li className="hover:text-slate-400 transition-colors"><Link href="/">Dashboard</Link></li>
        <li className="hover:text-slate-400 transition-colors"><Link href="/tasks">Tasks</Link></li> */}
      </ul>
    </nav>
  )
}

export default NavBar
