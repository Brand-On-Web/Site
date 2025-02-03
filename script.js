document.getElementById("customer-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect customer information
    const companyName = document.getElementById("company-name").value;
    const industry = document.getElementById("industry").value;
    const services = Array.from(document.getElementById("services").selectedOptions).map(option => option.text);
    const merchDesigns = parseInt(document.getElementById("merch-designs").value || 0);
    const additionalInfo = document.getElementById("additional-info").value;

    // Pricing logic
    const pricing = {
        branding: 2000,
        "web-design": 3000,
        "social-media": 1500,
        "drone-photography": 1200,
        "merch-store": 2500,
        "progress-photos": 1000,
    };

    const serviceCost = services.reduce((total, service) => total + (pricing[service.toLowerCase().replace(/\s/g, "-")] || 0), 0);
    const merchCost = merchDesigns * 100; // $100 per design
    const hostingFee = (merchCost + serviceCost) * 0.1; // 10% hosting fee
    const totalEstimate = serviceCost + merchCost + hostingFee;

    // Generate tailored paragraphs based on services
    const serviceDescriptions = {
        branding: "Our branding services will help your business stand out with professional and attention-grabbing branding strategies.",
        "web-design": "Our modern and responsive web design will convert your website visitors into loyal customers.",
        "social-media": "With our social media management, we'll build your brand's online presence and engage your audience effectively.",
        "drone-photography": "Our drone photography captures stunning visuals to showcase your projects like never before.",
        "merch-store": "We offer an effortless merch store setup, allowing you to represent your brand with no inventory or upfront costs.",
        "progress-photos": "Our professional progress photos keep stakeholders updated with high-quality visuals.",
    };

    const tailoredParagraphs = services
        .map(service => serviceDescriptions[service.toLowerCase()])
        .filter(Boolean)
        .join(" ");

    // Proposal content
    const proposalContent = `
        Brand On Proposal
        ==================

        Dear ${companyName},

        Thank you for considering Brand On for your business needs. We are thrilled to provide you with a tailored solution that perfectly aligns with your goals in the ${industry} industry.

        Based on the details you've provided, here's what we recommend:
        
        Services Selected:
        ${services.join(", ")}
        
        ${tailoredParagraphs}

        Merchandise Design:
        You have chosen to include ${merchDesigns} merchandise designs. Each design is crafted to reflect your brand identity seamlessly.

        Additional Information:
        ${additionalInfo || "No additional details provided."}

        Estimate:
        Service Total: $${serviceCost.toLocaleString()}
        Merchandise Design Total: $${merchCost.toLocaleString()}
        Hosting Fee: $${hostingFee.toLocaleString()}
        ------------------------------------
        Total Estimate: $${totalEstimate.toLocaleString()}

        Why Choose Brand On?
        At Brand On, we specialize in empowering businesses with innovative solutions, tailored to their unique needs. From stunning branding to seamless merch store setups, our services are designed to drive your success.

        We look forward to working with you and taking your business to the next level.

        Best Regards,
        Brand On Team
    `;

    // Generate and download the proposal as a PDF
    const blob = new Blob([proposalContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${companyName}_Proposal.txt`;
    link.click();
});
// Burger Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
    const burgerMenu = document.querySelector(".burger-menu");
    const navLinks = document.createElement("div");

    // Create the navigation menu dynamically
    navLinks.classList.add("nav-links");
    navLinks.innerHTML = `
        <ul>
            <li><a href="#solutions">Solutions</a></li>
            <li><a href="#merch">Merch Stores</a></li>
            <li><a href="#contact">Contact Us</a></li>
        </ul>
    `;
    document.body.appendChild(navLinks);

    // Add event listener to toggle navigation
    burgerMenu.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        burgerMenu.classList.toggle("active");
    });
});
