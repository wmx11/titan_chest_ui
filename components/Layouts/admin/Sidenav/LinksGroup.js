import React from 'react';
import Link from './MenuLink';

import {
  ChipIcon,
  CreditCardIcon,
  DatabaseIcon,
  DocumentReportIcon,
  TicketIcon,
  ShareIcon,
  CubeIcon
} from '@heroicons/react/outline';

function LinksGroup() {
  return (
    <ul>
      <li>
        <Link href="/admin/projects" title="Projects" Icon={CreditCardIcon} />
      </li>
      <li>
        <Link href="/admin/abi" title="ABI" Icon={DatabaseIcon} />
      </li>
      <li>
        <Link href="/admin/networks" title="Networks" Icon={ChipIcon} />
      </li>
      <li>
        <Link href="/admin/tokens" title="Tokens" Icon={TicketIcon} />
      </li>
      <li>
        <Link href="/admin/liquidity" title="Liquidity" Icon={ShareIcon} />
      </li>
      <li>
        <Link href="/admin/bots" title="Tracker Bots" Icon={CubeIcon} />
      </li>
      <li>
        <Link href="/admin/stats" title="Stats" Icon={DocumentReportIcon} />
      </li>
    </ul>
  );
}

export default LinksGroup;
