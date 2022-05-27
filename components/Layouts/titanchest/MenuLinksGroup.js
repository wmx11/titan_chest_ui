import React from 'react';
import {
  HomeIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/solid';
import { Burger } from '@mantine/core';
import MenuLink from './MenuLink';

function MenuLinksGroup({ isOpen, onBurgerClick, isDrawer }) {
  const MenuLinkTitle = ({ children }) => (
    <p className={`${isDrawer ? 'ml-4' : 'hidden md:block'}`}>{children}</p>
  );
  return (
    <div className={`${!isDrawer && 'flex justify-between w-full md:block'}`}>
      <MenuLink href="/" Icon={HomeIcon}>
        <MenuLinkTitle>Home</MenuLinkTitle>
      </MenuLink>
      <MenuLink href="/trading-chart" Icon={ChartBarIcon}>
        <MenuLinkTitle>Trading Chart</MenuLinkTitle>
      </MenuLink>
      <MenuLink href="/trade" Icon={CurrencyDollarIcon}>
        <MenuLinkTitle>Buy & Sell Titano</MenuLinkTitle>
      </MenuLink>
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
