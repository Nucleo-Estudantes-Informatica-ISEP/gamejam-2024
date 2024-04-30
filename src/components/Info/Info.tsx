// import React, { useState } from 'react';
import { schedule as SCHEDULE } from '../../data/schedule';

interface ScheduleContentProps {
    children?: React.ReactNode;
}

const ScheduleContent: React.FC<ScheduleContentProps> = () => {


    return (
        <>
            <div className="row mt-5" style={{ justifyContent: "space-evenly" }}>
                <div className="col-12 mb-8" data-aos="fade-left" data-aos-duration="1000">
                    <h1 className="text-neon-yellow font-bold uppercase text-lg md:text-5xl drop-shadow-2xl mt-8 md:mt-0">Are you ready?</h1>
                    <span className="font-thin drop-shadow-2xl">A terceira edição da LEVEL-UP GAMEJAM<br />
                        criada pelo NEI regressa. Maior e melhor.</span>
                </div>
                <div className="col-12 text-right mb-5" data-aos="fade-right" data-aos-duration="1000">
                    <h1 className="text-neon-yellow font-bold uppercase text-2xl md:text-5xl drop-shadow-2xl mt-8 md:mt-0">Data</h1>
                    <span className="font-thin drop-shadow-2xl">3 junho (18h) - 5 junho (18h)</span><br />
                </div>
                <div className="col-12 mb-8" data-aos="fade-left" data-aos-duration="1000">
                    <h1 className="text-neon-yellow font-bold uppercase text-2xl md:text-5xl drop-shadow-2xl mt-8 md:mt-0">Local</h1>
                    <span className="font-thin drop-shadow-2xl">
                        Instituto Superior de Engenharia do Porto
                    </span>
                </div>
                <div className="col-12 text-right mb-5" data-aos="fade-right" data-aos-duration="1000">
                    <h1 className="text-neon-yellow font-bold uppercase text-2xl md:text-5xl drop-shadow-2xl mt-8 md:mt-0">Regras</h1>
                    <span className="font-thin drop-shadow-2xl">Grupos de 2-4 pessoas</span><br />
                    <span className="font-thin drop-shadow-2xl">48 horas para desenvolvimento</span><br />
                    <span className="font-thin drop-shadow-2xl">Código open-source</span><br />
                </div>
                <div className="col-12 mb-5" data-aos="fade-left" data-aos-duration="1000">
                    <h1 className="text-neon-yellow font-bold uppercase text-2xl md:text-5xl drop-shadow-2xl mt-8 md:mt-0">Outras Informações</h1>
                    <span className="font-thin drop-shadow-2xl">Coffee breaks e refeições incluídas</span><br />
                    <span className="font-thin drop-shadow-2xl">Staff disponível a qualquer momento</span><br />
                    <span className="font-thin drop-shadow-2xl">Inscrição obrigatória!</span><br />
                </div>
            </div>
        </>
    );
};

export default ScheduleContent;
