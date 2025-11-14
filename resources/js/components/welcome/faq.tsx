import React, { useState } from "react";

const Accordion = () => {
  return (
    <section className="relative z-20 overflow-hidden pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[720px] text-center lg:mb-20">
              <span className="mb-2 block text-lg font-semibold text-primary">
                FAQ
              </span>
              <h2 className="mb-4 text-3xl md:text-5xl font-black text-dark dark:text-white ">
                ¿Tienes dudas? <br />
                <span className="text-sky-600">¡Tenemos respuestas!</span>
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">
                Aquí encontrarás las respuestas a las preguntas más frecuentes sobre nuestros servicios y procesos. 
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-1/2">
            <AccordionItem
              header="How long we deliver your first blog post?"
              text="It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content marketing strategy."
            />
            <AccordionItem
              header="Do you provide revisions?"
              text="Yes! We offer up to 3 free revisions to ensure your satisfaction with the final result."
            />
            <AccordionItem
              header="Can I cancel anytime?"
              text="Absolutely! You can cancel or pause your subscription anytime without extra fees."
            />
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <AccordionItem
              header="Do you work with startups?"
              text="Yes, we love collaborating with new businesses to help them grow their online presence."
            />
            <AccordionItem
              header="Do you offer SEO optimization?"
              text="Every post is optimized for SEO best practices to help you rank higher in search engines."
            />
            <AccordionItem
              header="Do you write in multiple languages?"
              text="Currently, we provide services in English and Spanish, with more languages coming soon."
            />
          </div>
        </div>
      </div>

      {/* <div className="absolute bottom-0 right-0 z-[-1]">
        <svg
          width="1440"
          height="886"
          viewBox="0 0 1440 886"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M193.307 -273.321L1480.87 1014.24L1121.85 1373.26C1121.85 1373.26 731.745 983.231 478.513 729.927C225.976 477.317 -165.714 85.6993 -165.714 85.6993L193.307 -273.321Z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="1308.65"
              y1="1142.58"
              x2="602.827"
              y2="-418.681"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3056D3" stopOpacity="0.36" />
              <stop offset="1" stopColor="#F5F2FD" stopOpacity="0" />
              <stop offset="1" stopColor="#F5F2FD" stopOpacity="0.096144" />
            </linearGradient>
          </defs>
        </svg>
      </div> */}
    </section>
  );
};

export default Accordion;

const AccordionItem = ({
  header,
  text,
}: {
  header: string;
  text: string;
}) => {
  const [active, setActive] = useState(false);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setActive(!active);
  };

  return (
    <div className="mb-8 w-full rounded-lg bg-white p-4 shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] dark:bg-dark-2 dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)] sm:p-8 lg:px-6 xl:px-8 transition-all duration-300">
      <button
        className="faq-btn flex w-full text-left items-center justify-between"
        onClick={handleToggle}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-600 text-white dark:bg-white/5">
            <svg
              className={`fill-primary stroke-primary transform transition-transform duration-300 ${
                active ? "rotate-180" : ""
              }`}
              width="17"
              height="10"
              viewBox="0 0 17 10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.28687 8.43257L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L7.28687 8.43257Z" />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-dark dark:text-white">
            {header}
          </h4>
        </div>
      </button>

      {/* Contenido animado */}
      <div
        className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
          active ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <p className="pl-[62px] text-base leading-relaxed text-body-color dark:text-dark-6">
          {text}
        </p>
      </div>
    </div>
  );
};
