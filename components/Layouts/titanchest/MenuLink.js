import Link from 'next/link';
import { useRouter } from 'next/router';

const MenuLink = ({ href, children }) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <a>
        <li
          className={`mb-2 px-4 py-3 hover:bg-slate-800 rounded-md text-slate-100 ${
            router.pathname === href && 'bg-slate-700'
          }`}
        >
          {children}
        </li>
      </a>
    </Link>
  );
};

export default MenuLink;
