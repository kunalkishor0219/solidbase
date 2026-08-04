/* 
================================================================
  BUILDERS TEMPLATE - FORM VALIDATION (validation.js)
================================================================
*/

/**
 * Validates form fields and displays error messages.
 * Returns true if form is valid, false otherwise.
 */
function validateForm(formElement) {
  let isValid = true;
  
  // Clean previous error styles and messages
  const errorMessages = formElement.querySelectorAll('.error-message');
  errorMessages.forEach(msg => {
    msg.style.display = 'none';
    msg.innerText = '';
  });

  const controls = formElement.querySelectorAll('.form-control');
  controls.forEach(ctrl => {
    ctrl.style.borderColor = '';
  });

  // Validation Rules helper functions
  const showError = (fieldId, message) => {
    const field = formElement.querySelector(`#${fieldId}`);
    if (field) {
      field.style.borderColor = 'var(--color-danger)';
      // Search for error container relative to field parent or field container
      const container = field.parentElement;
      const errorMsg = container.querySelector('.error-message');
      if (errorMsg) {
        errorMsg.innerText = message;
        errorMsg.style.display = 'block';
      }
    }
    isValid = false;
  };

  const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const isValidPhone = (phone) => {
    // Basic phone validation: min 10 characters, allowing leading +, spaces, dashes, parentheses
    const re = /^\+?[0-9\s\-()]{10,20}$/;
    return re.test(phone);
  };

  // Fields selection
  const nameField = formElement.querySelector('[name="name"]') || formElement.querySelector('#name') || formElement.querySelector('[name="full_name"]');
  const phoneField = formElement.querySelector('[name="phone"]') || formElement.querySelector('#phone') || formElement.querySelector('[name="phone_number"]');
  const emailField = formElement.querySelector('[name="email"]') || formElement.querySelector('#email');
  const projectTypeField = formElement.querySelector('[name="project_type"]') || formElement.querySelector('#project_type');
  const cityField = formElement.querySelector('[name="city"]') || formElement.querySelector('#city') || formElement.querySelector('[name="location"]');
  const budgetField = formElement.querySelector('[name="budget"]') || formElement.querySelector('#budget');
  const startDateField = formElement.querySelector('[name="start_date"]') || formElement.querySelector('#start_date') || formElement.querySelector('[name="expected_start_date"]');
  const messageField = formElement.querySelector('[name="message"]') || formElement.querySelector('#message') || formElement.querySelector('[name="details"]');

  // Name Validation
  if (nameField) {
    const val = nameField.value.trim();
    if (!val) {
      showError(nameField.id, 'Full name is required.');
    } else if (val.length < 2) {
      showError(nameField.id, 'Name must be at least 2 characters.');
    }
  }

  // Phone Validation
  if (phoneField) {
    const val = phoneField.value.trim();
    if (!val) {
      showError(phoneField.id, 'Phone number is required.');
    } else if (!isValidPhone(val)) {
      showError(phoneField.id, 'Please enter a valid phone number (min 10 digits).');
    }
  }

  // Email Validation
  if (emailField) {
    const val = emailField.value.trim();
    // Email is optional in homepage quick quote, but required in main contact/quote form
    const isOptional = emailField.hasAttribute('data-optional') || emailField.classList.contains('optional');
    
    if (!val && !isOptional) {
      showError(emailField.id, 'Email address is required.');
    } else if (val && !isValidEmail(val)) {
      showError(emailField.id, 'Please enter a valid email address.');
    }
  }

  // Project Type
  if (projectTypeField) {
    if (!projectTypeField.value) {
      showError(projectTypeField.id, 'Please select a project type.');
    }
  }

  // City / Location
  if (cityField) {
    const val = cityField.value.trim();
    if (!val) {
      showError(cityField.id, 'Location / City is required.');
    }
  }

  // Budget
  if (budgetField) {
    const isOptional = budgetField.hasAttribute('data-optional') || budgetField.classList.contains('optional');
    if (!budgetField.value && !isOptional) {
      showError(budgetField.id, 'Please select a budget range.');
    }
  }

  // Start Date
  if (startDateField) {
    const isOptional = startDateField.hasAttribute('data-optional') || startDateField.classList.contains('optional');
    if (!startDateField.value && !isOptional) {
      showError(startDateField.id, 'Expected start date is required.');
    } else if (startDateField.value) {
      const selectedDate = new Date(startDateField.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        showError(startDateField.id, 'Expected start date cannot be in the past.');
      }
    }
  }

  // Message / Details
  if (messageField) {
    const val = messageField.value.trim();
    const isOptional = messageField.hasAttribute('data-optional') || messageField.classList.contains('optional');
    if (!val && !isOptional) {
      showError(messageField.id, 'Please fill in the project details.');
    }
  }

  return isValid;
}
