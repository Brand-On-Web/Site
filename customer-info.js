document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("customer-form");
  const merchDetails = document.getElementById("merch-details");
  const clothingItemsInput = document.getElementById("clothing-items");

  // Show/Hide Merch Details Based on Selection
  form.addEventListener("change", (e) => {
    const services = Array.from(form.querySelectorAll("input[name='services']:checked")).map(
      (input) => input.value
    );
    merchDetails.style.display = services.includes("merchstore") ? "block" : "none";
  });

  // Handle Form Submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(form);
    const selectedServices = formData.getAll("services");
    const companyName = formData.get("company_name");
    const industry = formData.get("industry");
    const brandColors = formData.get("brand_colors") || "Not provided";
    const additionalInfo = formData.get("additional_info") || "None";

    const merchFee = selectedServices.includes("merchstore")
      ? clothingItemsInput.value * 100 + clothingItemsInput.value * 10
      : 0;

    const estimate = selectedServices.length * 500 + parseInt(formData.get("requirements") || 0) * 50 + merchFee;

    // Generate Proposal
    const proposal = `
      <h2>Proposal for ${companyName}</h2>
      <p>Industry: ${industry}</p>
      <p>Brand Colors: ${brandColors}</p>
      <p>Selected Services: ${selectedServices.join(", ")}</p>
      <p>Additional Information: ${additionalInfo}</p>
      <p>Estimated Total: $${estimate.toFixed(2)}</p>
    `;

    const proposalBlob = new Blob([proposal], { type: "text/html" });
    const proposalUrl = URL.createObjectURL(proposalBlob);
    const link = document.createElement("a");
    link.href = proposalUrl;
    link.download = `${companyName}_Proposal.html`;
    link.click();
  });
});
