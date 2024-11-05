'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './style.module.scss';
import Nav from './nav';
import ModeToggle from '@/components/mode-toggle';
import { Container } from '@/components/ui/container';

const Header = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
      <header className={`${styles.header} w-full`}>
        <Container>
          <div className={`${styles.bar} flex justify-between items-center w-full`}>
            <Link href="/" className="flex items-center justify-center">
            <span className="text-md font-semibold transition-transform hover:translate-x-1 hover:translate-y-1">
              <u>jacobdev.dk</u>
            </span>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <ModeToggle />
              </div>
              <div onClick={() => setIsActive(!isActive)} className={styles.el}>
                <div className={styles.label}>
                  <p>{!isActive ? 'Menu' : 'Close'}</p>
                </div>
                <div className={`${styles.burger} ${isActive ? styles.burgerActive : ''}`}></div>
              </div>
            </div>
          </div>
        </Container>
        {isActive && <Nav setIsActive={setIsActive} />}
      </header>
  );
};

export default Header;