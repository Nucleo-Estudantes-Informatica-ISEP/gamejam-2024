import { motion } from 'framer-motion';

interface ScheduleContentProps {
    children?: React.ReactNode;
}

const ScheduleContent: React.FC<ScheduleContentProps> = () => {
    return (
        <>
            <div className="mx-4" style={{ textShadow: '#000000 2px 2px 0px, #262525 2px 2px 0px' }}>
                <motion.div className="col-12 mb-8" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                    <h1 style={{ textShadow: '#3d1080 2px 2px 0px, #424141  4px 4px 0px' }} className="text-neon-yellow font-bold mt-20 uppercase text-5xl filter ">Are you ready?</h1>
                    <span className="font-thin text-2xl ">A terceira edição da LEVEL-UP GAMEJAM<br />
                        criada pelo NEI regressa. Maior e melhor.</span>
                </motion.div>
                <motion.div className="col-12 text-right mb-8" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                    <h1 style={{ textShadow: '#3d1080 2px 2px 0px, #424141  4px 4px 0px' }} className="text-neon-yellow font-bold mt-20 uppercase text-5xl filter">Data</h1>
                    <span className="font-thin text-2xl ">3 junho (18h) - 5 junho (18h)</span><br />
                </motion.div>
                <motion.div className="col-12 mb-8" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                    <h1 style={{ textShadow: '#3d1080 2px 2px 0px, #424141  4px 4px 0px' }} className="text-neon-yellow font-bold mt-20 uppercase text-5xl filter ">Local</h1>
                    <span className="font-thin text-2xl ">
                        Instituto Superior de Engenharia do Porto
                    </span>
                </motion.div>
                <motion.div className="col-12 mb-8 text-right" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                    <h1 style={{ textShadow: '#3d1080 2px 2px 0px, #424141  4px 4px 0px' }} className="text-neon-yellow font-bold mt-20 uppercase text-5xl filter ">Regras</h1>
                    <span className="font-thin text-2xl ">Grupos de 2-4 pessoas</span><br />
                    <span className="font-thin text-2xl ">48 horas para desenvolvimento</span><br />
                    <span className="font-thin text-2xl ">Código open-source</span><br />
                </motion.div>
                <motion.div className="col-12 mb-8" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                    <h1 style={{ textShadow: '#3d1080 2px 2px 0px, #424141  4px 4px 0px' }} className="text-neon-yellow font-bold mt-20 uppercase text-5xl filter ">Outras Informações</h1>
                    <span className="font-thin text-2xl ">Coffee breaks e refeições incluídas</span><br />
                    <span className="font-thin text-2xl ">Staff disponível a qualquer momento</span><br />
                    <span className="font-thin text-2xl ">Inscrição obrigatória!</span><br />
                </motion.div>
            </div>
        </>
    );
};

export default ScheduleContent;
