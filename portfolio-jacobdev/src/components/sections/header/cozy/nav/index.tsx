import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './style.module.scss';
import { height } from '../anim';
import Body from './body/body';
import { Container } from '@/components/ui/container';

import { links } from '@/components/sections/header/config';


interface IndexProps {
  setIsActive: (isActive: boolean) => void;
}

interface SelectedLinkState {
  isActive: boolean;
  index: number;
}

const Index: React.FC<IndexProps> = ({ setIsActive }) => {
  const [selectedLink, setSelectedLink] = useState<SelectedLinkState>({
    isActive: false,
    index: 0
  });

  return (
      <Container className="py-12">
        <motion.div
            variants={height}
            initial="initial"
            animate="enter"
            exit="exit"
            className={`${styles.nav} ${selectedLink.isActive ? styles.active : ''}`}
        >
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <Body
                  links={links}
                  selectedLink={selectedLink}
                  setSelectedLink={setSelectedLink}
                  setIsActive={setIsActive}
              />
            </div>
          </div>
        </motion.div>
      </Container>
  );
};

export default Index;
