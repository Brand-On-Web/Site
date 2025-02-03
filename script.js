document.getElementById("customer-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const companyName = document.getElementById("company-name").value;
    const industry = document.getElementById("industry").value;
    const services = Array.from(document.getElementById("services").selectedOptions).map(option => option.text);
    const merchDesigns = document.getElementById("merch-designs").value || 0;
    const additionalInfo = document.getElementById("additional-info").value;

    const proposalContent = `
        Brand On Proposal
        ===================
        Company Name: ${companyName}
        Industry: ${industry}
        Selected Services: ${services.join(", ")}
        Merchandise Designs: ${merchDesigns} items
        Additional Information: ${additionalInfo}
    `;

    const blob = new Blob([proposalContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${companyName}_Proposal.txt`;
    link.click();
});
