document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("customer-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const companyName = document.getElementById("company-name").value;
        const industry = document.getElementById("industry").value;
        const futureGoals = document.getElementById("future-goals").value;

        let selectedServices = [];
        let estimateTotal = 0;
        let merchDetails = [];

        document.querySelectorAll("input[name='services']:checked").forEach(service => {
            selectedServices.push(service.value);

            switch (service.value) {
                case "branding":
                    estimateTotal += 3000;
                    break;
                case "webdesign":
                    estimateTotal += 5000;
                    break;
                case "drone":
                    estimateTotal += 500;
                    break;
                case "socialmedia":
                    estimateTotal += 700;
                    break;
                case "merchstore":
                    estimateTotal += 300;
                    
                    // Capture merch details
                    document.querySelectorAll(".merch-item:checked").forEach(item => {
                        const itemName = item.value;
                        const itemQty = document.getElementById(`${itemName}-qty`).value || 0;
                        if (itemQty > 0) {
                            merchDetails.push(`${itemName.toUpperCase()} x${itemQty}`);
                            estimateTotal += itemQty * 30; // $30 setup fee per item
                        }
                    });

                    const featureCount = document.getElementById("merch-features").value || 0;
                    estimateTotal += featureCount * 20; // $20 per feature
                    break;
            }
        });

        let proposalContent = `
        ----------------------------------------------------------
        BRAND ON - SERVICE PROPOSAL
        ----------------------------------------------------------

        Dear ${companyName},

        We appreciate your interest in our services. At Brand On, we specialize in delivering high-quality, results-driven solutions tailored to businesses like yours in the **${industry}** sector.

        Based on our initial discussions, we’ve outlined the following services to help you **enhance your brand, streamline your operations, and increase market visibility**.

        ----------------------------------------------------------
        SELECTED SERVICES & INVESTMENT SUMMARY
        ----------------------------------------------------------
        Services Requested:
        ${selectedServices.map(service => `- ${formatServiceName(service)}`).join("\n")}

        ${merchDetails.length > 0 ? `\nMERCHANDISE DETAILS:\n${merchDetails.join("\n")}` : ""}

        Your estimated investment for this project: **$${estimateTotal}**

        ----------------------------------------------------------
        WHY CHOOSE BRAND ON?
        ----------------------------------------------------------
        🔹 **Industry-Leading Branding & Digital Marketing:** Our branding and identity solutions position your business as a market leader with a modern, competitive look.  

        🔹 **Innovative Web Solutions:** Whether it's a full website redesign or a customer portal, we ensure your site is built for conversions and ease of use.  

        🔹 **High-Impact Merchandising:** With our on-demand merch services, you get **zero upfront costs, no inventory management, and automated fulfillment**, allowing your business to profit without logistics headaches.  

        🔹 **Ongoing Support & Optimization:** We don’t just build — we **optimize, manage, and refine** your digital presence to ensure you stay ahead of the competition.  

        ----------------------------------------------------------
        MERCH SERVICE FEE STRUCTURE
        ----------------------------------------------------------
        We’re committed to **zero-inventory, low-cost, high-quality** merchandising. Each merch order includes a **10% service fee**, which helps **cover logistics, hosting, and continuous support for your online store.** This ensures your store operates efficiently without added management burdens.

        ----------------------------------------------------------
        NEXT STEPS
        ----------------------------------------------------------
        1️⃣ **Review the proposal and provide any feedback.**  
        2️⃣ **Let us know if you'd like to customize any details.**  
        3️⃣ **Once confirmed, we’ll finalize the scope and begin execution.**  

        If you have any questions or would like to move forward, feel free to reply at your convenience.

        Best regards,  
        **Brand On Team**  
        **[Your Contact Information]**  

        ----------------------------------------------------------
        Brand On - Elevate Your Business | www.brand-on.com
        ----------------------------------------------------------
        `;

        downloadProposal(proposalContent);
    });
});

function formatServiceName(service) {
    switch (service) {
        case "branding": return "Branding & Identity";
        case "webdesign": return "Web Design & Development";
        case "drone": return "Drone Photography";
        case "socialmedia": return "Social Media Presence";
        case "merchstore": return "Clothing & Merch Store";
        default: return service;
    }
}

function downloadProposal(content) {
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Proposal.txt";
    link.click();
}
