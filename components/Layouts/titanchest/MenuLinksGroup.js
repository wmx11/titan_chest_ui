import React from 'react';
import {
  HomeIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  CalculatorIcon,
  NewspaperIcon,
  UserIcon,
} from '@heroicons/react/solid';
import { Burger } from '@mantine/core';
import MenuLink from './MenuLink';
import { Dashboard } from 'tabler-icons-react';
import useSmallScreen from '../../../hooks/useSmallScreen';

function MenuLinksGroup({ isOpen, onBurgerClick, isDrawer }) {
  const { isSmallScreen } = useSmallScreen();

  const MenuLinkTitle = ({ children }) => (
    <p className={`${isDrawer ? 'ml-4' : 'hidden md:block'}`}>{children}</p>
  );

  const links = [
    {
      title: 'Home',
      href: '/',
      icon: HomeIcon,
    },
    {
      title: 'Announcements',
      href: '/announcements',
      icon: NewspaperIcon,
    },
    {
      title: 'Trading Chart',
      href: '/trading-chart',
      icon: ChartBarIcon,
    },
    {
      title: 'Buy & Sell Titano',
      href: '/trade',
      icon: CurrencyDollarIcon,
    },
    {
      title: 'Calculators',
      href: '/calculators',
      icon: CalculatorIcon,
    },
    {
      title: 'Account',
      href: '/account',
      icon: UserIcon,
    },
    {
      title: 'Dashboards',
      href: '/dashboards',
      icon: Dashboard,
    },
  ];

  return (
    <div
      className={`${
        !isDrawer ? 'flex justify-between items-center w-full md:block' : ''
      }`}
    >
      {links &&
        links.map((item, index) => {
          if (!isDrawer && isSmallScreen && index > 4) {
            return;
          }
          return (
            <MenuLink
              href={item.href}
              Icon={item.icon}
              key={`menu_link_${index}`}
            >
              <MenuLinkTitle>{item.title}</MenuLinkTitle>
            </MenuLink>
          );
        })}
      {!isDrawer && (
        <MenuLink
          isBurger={true}
          Burger={Burger}
          opened={isOpen}
          onBurgerClick={onBurgerClick}
        />
      )}
    </div>
  );
}

export default MenuLinksGroup;
