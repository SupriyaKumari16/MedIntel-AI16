import React from "react";

const Newsletter = () => {
  return (
    <section className="w-full bg-[#2f5fb3] text-white py-12 px-4 sm:px-8 lg:px-16">
      
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* LEFT TEXT */}
        <div className="text-center lg:text-left max-w-xl">
          <p className="text-sm opacity-80 mb-2 tracking-wide">
            Subscribe Newsletter
          </p>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-snug">
            Get the latest updates by  
            <br className="hidden sm:block" />
            Subscribing to our newsletter
          </h2>
        </div>

        {/* RIGHT INPUT */}
       <div className="w-full flex justify-center lg:justify-end">
  
  <div className="flex w-full lg:w-[750px] xl:w-[900px] bg-white rounded-md overflow-hidden shadow-lg border border-gray-200">
    
    <input
      type="email"
      placeholder="Your email address..."
      className="flex-1 px-6 py-5 text-gray-700 text-lg outline-none"
    />

    <button className="bg-[#1f2a44] text-white px-7 py-5 hover:bg-black transition whitespace-nowrap">
      Subscribe
    </button>

  </div>

</div>

      </div>
    </section>
  );
};

export default Newsletter;