document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("customer-form");
  const merchDetails = document.getElementById("merch-details");
  const clothingItemsInput = document.getElementById("clothing-items");

  // Show/Hide Merch Details Based on Selection
  form.addEventListener("change", () => {
    const services = Array.from(form.querySelectorAll("input[name='services']:checked")).map(
      (input) => input.value
    );
    merchDetails.style.display = services.includes("merchstore") ? "block" : "none";
  });

  // Handle Form Submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Collect Form Data
    const formData = new FormData(form);
    const companyName = formData.get("company_name") || "Your Company";
    const industry = formData.get("industry") || "Unknown Industry";
    const brandColors = formData.get("brand_colors") || "Not provided";
    const futureGoals = formData.get("future_goals") || "Not shared";
    const additionalInfo = formData.get("additional_info") || "None";
    const selectedServices = formData.getAll("services");
    const numRequirements = parseInt(formData.get("requirements") || 0);
    const clothingItems = parseInt(clothingItemsInput.value || 0);

    // Calculate Pricing
    const serviceFee = selectedServices.length * 750; // Premium pricing per service
    const requirementsFee = numRequirements * 100;
    const merchFee = selectedServices.includes("merchstore") ? clothingItems * 120 + clothingItems * 12 : 0;
    const totalEstimate = serviceFee + requirementsFee + merchFee;

    // Generate a Detailed Proposal
    const servicesList = selectedServices
      .map((service) => `- ${service.replace(/_/g, " ").toUpperCase()}`)
      .join("\n");

    const proposalContent = `
${companyName}: Tailored Proposal from Brand On
==================================================

Hello ${companyName},

Thank you for considering Brand On to elevate your business! Based on the details provided, we’ve created this tailored proposal to help you achieve success.

### Highlights of Your Proposal:

1. **Your Business at a Glance:**
   - Industry: ${industry}
   - Brand Colors: ${brandColors}
   - Future Goals: ${futureGoals}

2. **Selected Services:**
   ${servicesList || "No services selected yet"}

3. **Pricing Breakdown:**
   - Professional Service Fee (based on selected services): $${serviceFee.toFixed(2)}
   - Complexity/Requirements Fee: $${requirementsFee.toFixed(2)}
   ${merchFee > 0 ? `- Merchandising Setup Fee: $${merchFee.toFixed(2)}` : ""}
   - **Total Estimate**: $${totalEstimate.toFixed(2)}

4. **Our Merchandise Offering:**
   Empower your brand with a no-inventory, print-on-demand merchandise store. A 10% hosting fee is applied to all orders to cover ongoing maintenance and operational costs, ensuring your store is always running seamlessly and profitably.

---

### Next Steps:
1. Review this proposal and identify any refinements you’d like.
2. Reach out to us directly at **info@brandonmarketing.ca** to discuss further.
3. Let’s schedule a call to finalize details and launch your solutions.

Thank you for trusting us with your brand’s success. We look forward to working together!

Sincerely,  
**The Brand On Team**  
"Switch On Your Success."

==================================================
Generated by Brand On’s Proposal System
    `;

    // Create a Blob for the proposal
    const blob = new Blob([proposalContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // Create a download link
    const link = document.createElement("a");
    link.href = url;
    link.download = `${companyName}_Proposal.txt`;
    link.click();

    // Revoke the URL to free up resources
    URL.revokeObjectURL(url);
  });
});
