import React from 'react';
import Reveal from '@/components/reveal';

const TextReveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({
                                                                                 children,
                                                                                 delay = 0.01
                                                                             }) => {
    const processChildren = (child: React.ReactNode): React.ReactNode => {
        if (typeof child === 'string') {
            const words = child.split(' ');
            return words.map((word, index) => (
                <React.Fragment key={`word-${index}`}>
                    <Reveal transition={{ duration: 0.5, delay: delay * index }}>
                        {word}
                    </Reveal>
                    {index !== words.length - 1 && ' '}
                </React.Fragment>
            ));
        }
        if (React.isValidElement(child)) {
            const element = child as React.ReactElement & { props: { children?: React.ReactNode } };
            const elementChildren = element.props?.children;
            return React.cloneElement(
                element,
                {},
                processChildren(elementChildren)
            );
        }
        if (Array.isArray(child)) {
            return child.map((nestedChild, index) => (
                <React.Fragment key={`nested-${index}`}>
                    {processChildren(nestedChild)}
                </React.Fragment>
            ));
        }
        return child;
    };

    return <>{processChildren(children)}</>;
};

export default TextReveal;
