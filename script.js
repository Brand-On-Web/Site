document.addEventListener("DOMContentLoaded", () => {
  const calculateBtn = document.getElementById("calculate-btn");
  const estimateResultDiv = document.getElementById("estimate-result");
  const pdfBtn = document.getElementById("pdf-btn");

  // Clothing items field logic
  const clothingDetails = document.getElementById("clothing-details");
  const clothingItemsInput = document.getElementById("clothing-items");
  const serviceCheckboxes = document.querySelectorAll('input[name="services"]');

  serviceCheckboxes.forEach((cb) => {
    cb.addEventListener("change", () => {
      const merchChecked = [...serviceCheckboxes].some(ch => ch.checked && ch.value === 'merchstore');
      clothingDetails.style.display = merchChecked ? "block" : "none";
      if (!merchChecked) {
        clothingItemsInput.value = 0;
      }
    });
  });

  // Our premium rates
  // Branding:        $800
  // Web Design:     $2000
  // Drone:           $600
  // Social Media:    $500
  // Progress Photos: $300
  // Merch store: $300 base + $50/clothing + 10% service fee
  // Each requirement => $75
  function calculateEstimate() {
    let total = 0;
    const chosenServices = document.querySelectorAll('input[name="services"]:checked');

    chosenServices.forEach(checkbox => {
      switch (checkbox.value) {
        case "branding":
          total += 800;
          break;
        case "webdesign":
          total += 2000;
          break;
        case "drone":
          total += 600;
          break;
        case "socialmedia":
          total += 500;
          break;
        case "progressphotos":
          total += 300;
          break;
        case "merchstore":
          let merchTotal = 300;
          const itemCount = parseInt(clothingItemsInput.value) || 0;
          merchTotal += itemCount * 50;
          merchTotal *= 1.1; // 10% hosting fee
          total += merchTotal;
          break;
        default:
          break;
      }
    });

    // Requirements => $75 each
    const requirementsCount = parseInt(document.getElementById("requirements").value) || 0;
    total += requirementsCount * 75;

    return Math.round(total);
  }

  // Show cost on screen for testing
  function displayEstimate(total) {
    estimateResultDiv.textContent = `Estimated Cost (Testing Only): $${total}`;
    estimateResultDiv.style.display = "block";
  }

  // Generate PDF for download using jsPDF
  // We'll include some basic info + the cost
  async function generatePDF() {
    // We can use jsPDF's auto page logic
    const { jsPDF } = window.jspdf; 
    const doc = new jsPDF();

    // Gather basic info
    const companyName = document.getElementById("company-name").value;
    const industry = document.getElementById("industry").value;
    const requirementsCount = document.getElementById("requirements").value;
    const totalEstimate = calculateEstimate();

    // Basic text formatting
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Brand On - Draft Proposal", 20, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Company Name: ${companyName}`, 20, 30);
    doc.text(`Industry: ${industry}`, 20, 40);
    doc.text(`Number of Requirements: ${requirementsCount}`, 20, 50);

    // Summarize selected services
    const chosen = [...document.querySelectorAll('input[name="services"]:checked')]
      .map(ch => ch.value)
      .join(", ");
    doc.text(`Selected Services: ${chosen || "None"}`, 20, 60);

    // Show total estimate
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(`Draft Estimate: $${totalEstimate}`, 20, 75);

    // Add disclaimers about final pricing & discount
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Note: This is a preliminary quote. Final pricing may be subject to discount\n" + 
      "or negotiation. Please contact Brand On for a formal contract.",
      20, 85
    );

    // Save or open
    doc.save(`BrandOn-DraftProposal-${companyName}.pdf`);
  }

  calculateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const total = calculateEstimate();
    displayEstimate(total);
    // Show the PDF button once we have a total
    pdfBtn.style.display = "block";
  });

  pdfBtn.addEventListener("click", () => {
    generatePDF();
  });
});
