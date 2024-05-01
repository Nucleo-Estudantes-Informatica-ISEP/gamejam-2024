import { motion } from 'framer-motion';
import { info } from '../../data/info'; // Importing the info data
import React from 'react';

interface InfoContentProps {
    children?: React.ReactNode;
}

const InfoContent: React.FC<InfoContentProps> = () => {
    return (
        <>
            <div className="flex flex-col" style={{ textShadow: '#000000 2px 2px 0px, #262525 2px 2px 0px' }}>
                {info.map((section, index) => (
                    <motion.div key={index} className={index % 2 === 0 ? "col-12 mb-8 text-left" : "col-12 mb-8 text-right"} initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: (index * 0.35) + 1 }}>
                        <h1 style={{ textShadow: '#3d1080 2px 2px 0px, #424141 4px 4px 0px' }} className="text-neon-yellow font-bold mt-20 uppercase text-5xl md:text-6xl">{section.title}</h1>
                        {section.items.map((item, itemIndex) => (
                            <React.Fragment key={itemIndex}>
                                <span className="font-thin text-2xl md:text-3xl">{item}</span>
                                <br /> 
                            </React.Fragment>
                        ))}
                    </motion.div>
                ))}
            </div>
        </>
    );
};

export default InfoContent;
