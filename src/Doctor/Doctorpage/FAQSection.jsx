import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function FAQSection() {

  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { title: "About Us", content: "Healthcare services info..." },
    { title: "Patient Care", content: "Patient care details..." },
    { title: "Compliance", content: "Legal compliance..." },
    { title: "Outcomes", content: "Success rates..." }
  ];

  return (
    <div className="bg-[#f5f6f7] px-4 md:px-16 py-12">

      <div className="grid md:grid-cols-2 gap-8">

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Feel Free to ask us
          </h2>

          <img
            src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
            className="rounded-xl mb-4 shadow"
          />

          <input
            placeholder="Ask your question"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl shadow border">

              <div
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex justify-between p-4 cursor-pointer"
              >
                {faq.title}
                <FaChevronDown />
              </div>

              {openIndex === i && (
                <div className="px-4 pb-4 text-sm text-gray-600">
                  {faq.content}
                </div>
              )}

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}