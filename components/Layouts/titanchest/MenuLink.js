import Link from 'next/link';
import { useRouter } from 'next/router';

const MenuLink = ({
  href,
  children,
  Icon,
  isBurger,
  Burger,
  opened,
  onBurgerClick,
}) => {
  const router = useRouter();

  return isBurger ? (
    <span className="mb-2 px-2 py-2 flex items-center md:hidden z-10">
      <Burger opened={opened} color="#FFF" onClick={onBurgerClick} />
    </span>
  ) : (
    <Link href={href}>
      <a>
        <li
          className={`mb-2 px-4 py-3 rounded-md text-slate-100 flex items-center border-transparent hover:bg-titano-green/5 hover:border-titano-green border hover:shadow-md hover:shadow-titano-green/30 transition ${
            router.pathname === href &&
            'shadow-md shadow-titano-green/30 border-titano-green bg-titano-green/5'
          }`}
        >
          {Icon && <Icon className="h-6 w-6 md:h-4 md:w-4 md:mr-3" />}
          {children}
        </li>
      </a>
    </Link>
  );
};

export default MenuLink;
