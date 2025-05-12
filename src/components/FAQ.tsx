import { useState } from "react";

export const FAQ = () => {
  const faqData = [
    {
      question: "How do I receive ride requests?",
      answer:
        "Once you’re online on the app, ride requests will automatically appear. You’ll see the pickup location, destination, and estimated fare before accepting.",
    },
    {
      question: "How do I get paid?",
      answer:
        "Earnings are credited to your driver wallet after each completed trip. You can withdraw to your linked bank account or mobile wallet anytime.",
    },
    {
      question: "What should I do if a rider cancels the trip?",
      answer:
        "If a rider cancels after you’ve started heading to the pickup location, you may be eligible for a cancellation fee depending on the app’s policy.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can reach driver support through the app by navigating to “Help & Support” and selecting the issue category. Our team is available 24/7.",
    },
    {
      question: "Can I drive with multiple ride-hailing platforms?",
      answer:
        "Yes, you’re free to drive with other platforms. However, ensure you are only active on one app at a time to avoid trip overlaps or penalties.",
    },
    {
      question: "What are the vehicle requirements?",
      answer:
        "Vehicles must meet the platform’s standards for safety, cleanliness, and model year. Full details are available under “Driver Requirements” in the app or website.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="max-w-screen-md lg:max-w-screen-xl mx-auto w-full">
      <div className="py-16 px-8 flex flex-col gap-16">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-midGray font-semibold text-center">
          Frequently asked questions
        </h2>

        <div className="w-full flex flex-col">
          {faqData.map((faq, index) => (
            <div
              className={`w-full py-5 md:py-7 lg:py-9 pl-5 cursor-pointer pr-6 md:pr-9 lg:pr-12 border-x border-darkBluish/30 border-t ${
                index === faqData.length - 1 && "border-b"
              }`}
              onClick={() => toggleFAQ(index)}
              key={index}
            >
              <div className="w-full flex items-center justify-between">
                <p className="text-base md:text-xl font-normal text-ashGray">
                  {faq.question}
                </p>

                <span>
                  {index === openIndex ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      viewBox="0 0 50 50"
                      fill="none"
                    >
                      <path
                        d="M14.7904 30.8333C15.6237 31.6666 16.8737 31.6666 17.707 30.8333L25.0013 23.5416L32.293 30.8333C33.1263 31.6666 34.3763 31.6666 35.2096 30.8333C36.043 30.0001 36.043 28.7501 35.2096 27.9166L26.4596 19.1666C26.043 18.7499 25.6263 18.5416 25.0013 18.5416C24.3763 18.5416 23.9596 18.7499 23.543 19.1666L14.793 27.9166C13.9596 28.7501 13.9596 30.0001 14.7904 30.8333Z"
                        fill="#3E3E40"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      viewBox="0 0 50 50"
                      fill="none"
                    >
                      <path
                        d="M35.2096 19.1667C34.3763 18.3334 33.1263 18.3334 32.293 19.1667L25.0013 26.4584L17.7096 19.1667C16.8763 18.3334 15.6263 18.3334 14.793 19.1667C13.9596 20.0001 13.9596 21.2501 14.793 22.0834L23.543 30.8334C23.9596 31.2501 24.3763 31.4584 25.0013 31.4584C25.6263 31.4584 26.043 31.2501 26.4596 30.8334L35.2096 22.0834C36.043 21.2501 36.043 20.0001 35.2096 19.1667Z"
                        fill="#3E3E40"
                      />
                    </svg>
                  )}
                </span>
              </div>

              {openIndex === index && (
                <div className="mt-6">
                  <p className="text-mistGray text-sm md:text-base font-normal">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
