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

        // Gather selected services and calculate costs
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

                    // Collect merch details
                    document.querySelectorAll(".merch-item:checked").forEach(item => {
                        const itemName = item.value;
                        const itemQty = parseInt(document.getElementById(`${itemName}-qty`).value || "0");
                        if (itemQty > 0) {
                            merchDetails.push(`${itemName.toUpperCase()} x${itemQty}`);
                            estimateTotal += itemQty * 30; // Example cost per item
                        }
                    });

                    const featureCount = parseInt(document.getElementById("merch-features").value || "0");
                    estimateTotal += featureCount * 20; // Example cost per feature
                    break;
            }
        });

        // Proposal content generation
        let proposalContent = `
        ----------------------------------------------------------
        BRAND ON - SERVICE PROPOSAL
        ----------------------------------------------------------

        Dear ${companyName},

        Thank you for considering Brand On for your business needs. We are excited to work with a dynamic company in the **${industry}** industry and help you achieve your goals of ${futureGoals}.

        Based on your selections, here is a summary of our proposed services and estimated investment:

        ----------------------------------------------------------
        SELECTED SERVICES:
        ${selectedServices.map(service => `- ${formatServiceName(service)}`).join("\n")}

        ${merchDetails.length > 0 ? `\nMERCHANDISE DETAILS:\n${merchDetails.join("\n")}` : ""}

        ----------------------------------------------------------
        ESTIMATED INVESTMENT: $${estimateTotal}
        ----------------------------------------------------------

        WHY CHOOSE BRAND ON?
        - **Expertise in Branding & Marketing:** Tailored solutions that position your business for success.
        - **Cutting-Edge Web Design:** Modern, responsive designs that engage users and drive results.
        - **Seamless Merch Solutions:** Zero inventory and high-quality on-demand production.
        - **Ongoing Support:** Continuous optimization and support to keep your business ahead.

        ----------------------------------------------------------
        NEXT STEPS:
        1️⃣ Review the proposal and provide any feedback.
        2️⃣ Confirm your interest to move forward.
        3️⃣ Let’s start transforming your business!

        ----------------------------------------------------------
        We look forward to collaborating with you.

        Best regards,  
        **Brand On Team**  
        **[Your Contact Information]**

        ----------------------------------------------------------
        Brand On | Empowering Businesses - www.brand-on.com
        ----------------------------------------------------------
        `;

        // Download proposal
        downloadProposal(proposalContent);
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
});
