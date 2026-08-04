# 🏗️ Premium Construction & Builders Website Template

This is a premium, modern, fully responsive, and mobile-first website template designed for construction companies, building contractors, civil engineers, and turnkey builders. 

Built using clean **HTML5**, **CSS3 variables**, and **Vanilla JavaScript**, it contains no framework dependencies (no React, Vue, Angular, Bootstrap, or jQuery) to ensure maximum speed, lightweight performance, and a perfect Lighthouse score.

## 📁 Folder Structure

```text
construction-template/
├── index.html         # Homepage (Hero, Quote widget, Stats, Services, Gallery, FAQ)
├── about.html         # About Us (Company History, Core Values, Leadership Team)
├── services.html      # Detailed list of all 14 builder services
├── projects.html      # Portfolios with dynamic category filtering (8+ projects)
├── gallery.html       # Responsive Masonry Gallery with custom lightbox (20+ photos)
├── quote.html         # Dedicated Standalone Quotation Request Form
├── contact.html       # Contact Us page with office map & live working hours checker
├── css/
│   ├── style.css      # Core style variables, resets, layout components
│   ├── responsive.css # Media queries targeting mobile and tablet devices
│   └── animations.css # Custom page transition keyframes and micro-interactions
└── js/
    ├── app.js         # Navigation controls, animated statistics, working hours status
    ├── quote.js       # Submit handling & Google Sheets Apps Script link
    ├── validation.js  # Client-side forms verification logic
    └── slider.js      # SwiperJS slider initialization
```

---

## ⚡ Google Sheets Lead Integration (Google Apps Script)

You can save all quotation requests and support messages directly into a Google Sheet using Google Apps Script. 

### Step-by-Step Setup:

1. **Create a Google Sheet**:
   - Create a new Google Sheet.
   - Name the headers in row 1 exactly matching the field inputs:
     `submitted_at`, `name`, `phone`, `email`, `company`, `project_type`, `property_type`, `location`, `budget`, `start_date`, `details`, `message`
   
2. **Open Apps Script Editor**:
   - In your Google Sheet, click on **Extensions** > **Apps Script**.

3. **Paste Code**:
   - Erase any code in `Code.gs` and paste the following script:

   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     try {
       var data = JSON.parse(e.postData.contents);
       
       // Append a row matching row headers
       sheet.appendRow([
         data.submitted_at || new Date().toISOString(),
         data.name || data.full_name || '',
         data.phone || '',
         data.email || '',
         data.company || '',
         data.project_type || '',
         data.property_type || '',
         data.location || data.city || '',
         data.budget || '',
         data.start_date || '',
         data.details || '',
         data.message || ''
       ]);
       
       return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
         .setMimeType(ContentService.MimeType.JSON)
         .setHeaders({
           'Access-Control-Allow-Origin': '*'
         });
     } catch (error) {
       return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
         .setMimeType(ContentService.MimeType.JSON)
         .setHeaders({
           'Access-Control-Allow-Origin': '*'
         });
     }
   }

   function doOptions(e) {
     return ContentService.createTextOutput("")
       .setMimeType(ContentService.MimeType.TEXT)
       .setHeaders({
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
         'Access-Control-Allow-Headers': 'Content-Type'
       });
   }
   ```

4. **Deploy Web App**:
   - Click **Deploy** > **New deployment**.
   - Select **Web app** as the deployment type.
   - Set Description to "Construction Leads API".
   - Set **Execute as**: `Me (your-email@gmail.com)`.
   - Set **Who has access**: `Anyone`.
   - Click **Deploy** and authorize permissions.
   - Copy the generated **Web App URL**.

5. **Connect URL to JS**:
   - Open [js/quote.js](file:///Users/kunalkishor/Desktop/Builders/construction-template/js/quote.js) on line 6.
   - Set the `GOOGLE_SHEETS_SCRIPT_URL` variable to your copied Web App URL:
     ```javascript
     const GOOGLE_SHEETS_SCRIPT_URL = 'YOUR_WEB_APP_URL_HERE';
     ```

Now, all form submissions will validate locally and then save directly inside your Google Sheet spreadsheet in real time!

---

## 🎨 Aesthetics & Customizations

- **Primary Colors**: Amber (`#F59E0B`) and Charcoal (`#374151`). You can change these in [css/style.css](file:///Users/kunalkishor/Desktop/Builders/construction-template/css/style.css) inside the `:root` variables block to match any corporate color guide.
- **Typography**: Poppins Google Font is imported in the header.
- **Scroll Effects**: Animated On Scroll (AOS) is initialized globally. Add `data-aos="fade-up"` to any HTML tag to trigger scroll animations.
- **Testimonial Slider**: Touch swipe enabled using SwiperJS library.
