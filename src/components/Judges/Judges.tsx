import JudgeItem from './JudgeItem';

const Judges: React.FC = () => {
  return (
    <section className="w-full items-center justify-between md:justify-around gap-y-24 md:gap-x-6 flex flex-col md:flex-row z-0">
      <JudgeItem
        name="Filipe de Faria Pacheco"
        description="Professor Adjunto do DEI"
        image="/judges/filipe-faria-pacheco.webp"
        isLeft={false}
        overDescription="Foi Vice-Diretor da unidade de Investigação CISTER - Research Centre in Real-Time and Embedded Computing Systems; 
        Responsável pela unidade curricular de Tecnologias e Sistemas Multimédia do Mestrado em Engenharia Informática;
        Có-Responsável pela unidade curricular de Complementos de Sistemas Gráficos do Mestrado em Engenharia Informática;
        Docente da unidade curricular de Sistemas Gráficos e Interação da Licenciatura em Engenharia Informática;
        Responsável pelas duas primeiras unidades curriculares integradoras do Mestrado em Engenharia de Sistemas Computacionais Críticos"
      />
      <JudgeItem
        name="Ana Barata"
        description="Leading Researcher da GILT"
        image="/judges/ana-barata.webp"
        isLeft={false}
        overDescription="Professora no ISEP desde 2001, doutorada na área das Ciências da Comunicação - Audiovisual e Artes dos Media Interativos, pela Faculdade de Ciências Humanas e Sociais da Universidade Nova de Lisboa (2014), tem sido responsável por unidades curriculares relacionadas com a linguagem, a comunicação e a gestão de projetos, e co-orientadora de várias teses de mestrado. As artes digitais e urbanas, os media interativos e as tecnologias da comunicação, e o papel da cultura e das artes na educação e na sociedade são as suas principais paixões de investigação."
      />
      <JudgeItem
        name="Henrique"
        description="Crítico de jogos na Meus Jogos"
        image="/judges/henrique.webp"
        isLeft={true}
        overDescription="Eu sou o Henrique, tenho 22 anos e sou apaixonado por videojogos desde que me lembro. Desde agosto de 2022 faço parte da equipa de autores do Meus Jogos, um site português de críticas e notícias gaming, onde já publiquei mais de duas dezenas de artigos."
      />
    </section>
  );
};

export default Judges;
