document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("customer-form");
  const totalElement = document.getElementById("total");
  const servicesSelect = document.getElementById("services");
  const merchInput = document.getElementById("merch");
  const generatePdfButton = document.getElementById("generate-pdf");

  const pricing = {
    branding: 1500,
    web_design: 2500,
    digital_ads: 1000,
    social_media: 800,
    drone_photography: 1200,
    progress_photos: 900,
    merch_design_fee: 100,
    merch_hosting_fee: 0.1,
  };

  // Update total estimate dynamically
  function updateTotal() {
    let total = 0;

    // Calculate selected services
    const selectedServices = Array.from(servicesSelect.selectedOptions).map(
      (option) => option.value
    );
    selectedServices.forEach((service) => {
      total += pricing[service];
    });

    // Calculate merchandise costs
    const merchQuantity = parseInt(merchInput.value) || 0;
    if (merchQuantity > 0) {
      total += merchQuantity * pricing.merch_design_fee;
      total += merchQuantity * pricing.merch_design_fee * pricing.merch_hosting_fee;
    }

    totalElement.textContent = total.toFixed(2);
  }

  // Event listeners for updates
  servicesSelect.addEventListener("change", updateTotal);
  merchInput.addEventListener("input", updateTotal);

  // Generate PDF Proposal
  generatePdfButton.addEventListener("click", () => {
    const companyName = form.company_name.value;
    const industry = form.industry.value;
    const additionalInfo = form.additional_info.value;
    const selectedServices = Array.from(servicesSelect.selectedOptions).map(
      (option) => option.text
    );
    const merchQuantity = merchInput.value || 0;
    const total = totalElement.textContent;

    const proposalContent = `
      Company Name: ${companyName}
      Industry: ${industry}
      Services Selected: ${selectedServices.join(", ")}
      Merchandise Quantity: ${merchQuantity}
      Additional Info: ${additionalInfo}
      Estimated Total: $${total}
    `;

    const pdf = new jsPDF();
    pdf.text("Brand On Proposal", 10, 10);
    pdf.text(proposalContent, 10, 20);
    pdf.save(`${companyName}_proposal.pdf`);
  });
});
