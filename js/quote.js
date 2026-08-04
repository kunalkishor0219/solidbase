/* 
================================================================
  SOLIDBASE INFRA - QUOTE & CONTACT FORM HANDLING WITH WHATSAPP (quote.js)
================================================================
*/

const WHATSAPP_PHONE_NUMBER = '917678397943';

document.addEventListener('DOMContentLoaded', () => {
  const quoteForms = document.querySelectorAll('.quote-form, .contact-form, .quick-quote-form, #contactEnquiryForm, #standaloneQuoteForm');
  
  quoteForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Perform validation using the global function from validation.js
      if (typeof validateForm === 'function' && !validateForm(form)) {
        console.warn('Form validation failed.');
        return;
      }
      
      // Select submit button and display loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Submit';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Directing to WhatsApp...';
      }

      // Collect form data
      const formData = new FormData(form);
      const dataObj = {};
      formData.forEach((value, key) => {
        dataObj[key] = value;
      });

      // Format WhatsApp Message
      let waMessage = `*Solidbase Infra - New Enquiry Request*\n\n`;
      if (dataObj.name) waMessage += `👤 *Name:* ${dataObj.name}\n`;
      if (dataObj.phone) waMessage += `📞 *Phone:* ${dataObj.phone}\n`;
      if (dataObj.email) waMessage += `✉️ *Email:* ${dataObj.email}\n`;
      if (dataObj.project_type) waMessage += `🏗️ *Project Type:* ${dataObj.project_type}\n`;
      if (dataObj.location) waMessage += `📍 *Location:* ${dataObj.location}\n`;
      if (dataObj.budget) waMessage += `💰 *Approx. Budget:* ${dataObj.budget}\n`;
      if (dataObj.size) waMessage += `📐 *Project Size:* ${dataObj.size}\n`;
      if (dataObj.start_date) waMessage += `📅 *Preferred Start Date:* ${dataObj.start_date}\n`;
      if (dataObj.message || dataObj.details) waMessage += `📝 *Scope / Message:* ${dataObj.message || dataObj.details}\n`;

      const encodedMessage = encodeURIComponent(waMessage);
      const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`;

      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');

      // Display Success Notification Card
      showSuccessMessage(form, dataObj);

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    });
  });
});

/**
 * Replaces the form content with a premium success notification card
 */
function showSuccessMessage(form, submittedData) {
  const container = form.parentElement;
  
  const successCardHtml = `
    <div class="success-message-card animate-scale-up" style="
      text-align: center;
      padding: 40px 30px;
      background-color: var(--color-white);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      border-top: 5px solid var(--color-primary);
    ">
      <div style="
        width: 80px;
        height: 80px;
        background-color: rgba(200, 150, 62, 0.12);
        color: var(--color-primary);
        border-radius: var(--radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
        margin: 0 auto 25px auto;
      ">
        <i class="fa-brands fa-whatsapp"></i>
      </div>
      <h3 style="font-size: 1.75rem; font-weight: var(--font-weight-bold); margin-bottom: 15px; color: var(--color-dark);">
        Enquiry Redirected to WhatsApp
      </h3>
      <p style="font-size: 1.15rem; color: var(--color-gray-600); margin-bottom: 25px; line-height: 1.6;">
        Thank you for contacting Solidbase Infra. Our team will get back to you shortly.
      </p>
      <button onclick="window.location.reload();" class="btn btn-primary btn-sm">
        <i class="fa-solid fa-arrow-rotate-right"></i> Send Another Request
      </button>
    </div>
  `;

  // Hide form and insert success card
  form.style.display = 'none';
  
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = successCardHtml.trim();
  container.appendChild(tempDiv.firstChild);
}

function showErrorMessage(form, message) {
  let alert = form.querySelector('.form-alert-danger');
  if (!alert) {
    alert = document.createElement('div');
    alert.className = 'form-alert-danger';
    alert.style.cssText = `
      background-color: rgba(239, 68, 68, 0.1);
      color: var(--color-danger);
      padding: 12px 15px;
      border-radius: var(--radius-md);
      margin-bottom: 15px;
      font-size: 0.9rem;
      border: 1px solid var(--color-danger);
      display: flex;
      align-items: center;
      gap: 10px;
    `;
    form.insertBefore(alert, form.firstChild);
  }
  alert.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${message}`;
  alert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
