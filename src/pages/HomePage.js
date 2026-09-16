import '../App.css';
import { useState } from 'react';

function HomePage() {
  const [formData, setFormData] = useState({
    clientName: '',
    emailSubject: '',
    toEmailAddress: '',
    position: 'Farm Worker',
    companyName: 'Agribusiness Australia',
    employmentType: 'Full-time',
    farmLocation: '',
    hourlyRate: '22.00',
    workingHours: '',
    commencementDate: '',
    referenceNumber: '',
    hrManager: '',
    companyEmail: '',
    companyWebsite: '',
    companyPhone: '',
    companyABN: '',
    companyAddress: '',
  });

  const [photoPreview, setPhotoPreview] = useState('');
  const [photoLink, setPhotoLink] = useState('');
  const [htmlEmail, setHtmlEmail] = useState('');

  // Handle normal form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Handle image upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setPhotoPreview('');
      return;
    }

    // Check image type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      e.target.value = '';
      return;
    }

    // Limit image size to 5 MB
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5 MB.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      setPhotoPreview(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  // Generate HTML email
  const generateEmail = () => {
    const clientName =
      formData.clientName || '[Client Full Name]';

    const emailSubject =
      formData.emailSubject || '[Email Subject]';

    const toEmailAddress =
      formData.toEmailAddress || '[Applicant Email Address]';

    const farmLocation =
      formData.farmLocation || '[Farm Location, State, Australia]';

    const workingHours =
      formData.workingHours || '[Hours per Week]';

    const commencementDate =
      formData.commencementDate || '[Date]';

    const referenceNumber =
      formData.referenceNumber || '[Reference Number]';

    const hrManager =
      formData.hrManager || '[HR Manager’s Full Name]';

    const companyEmail =
      formData.companyEmail || '[Official Company Email Address]';

    const companyWebsite =
      formData.companyWebsite || '[Company Website]';

    const companyPhone =
      formData.companyPhone || '[Company Phone Number]';

    const companyABN =
      formData.companyABN || '[Company ABN, if applicable]';

    const companyAddress =
      formData.companyAddress || '[Company Office Address]';

    // Clickable image
    let imageHTML = '';

    if (photoPreview) {
      if (photoLink.trim()) {
        imageHTML = `
          <div style="margin: 30px 0; text-align: center;">
            <a
              href="${photoLink}"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="${photoPreview}"
                alt="Employment Information"
                style="
                  display: block;
                  width: 100%;
                  max-width: 500px;
                  height: auto;
                  margin: 0 auto;
                  border: 0;
                  border-radius: 8px;
                "
              />
            </a>
          </div>
        `;
      } else {
        imageHTML = `
          <div style="margin: 30px 0; text-align: center;">
            <img
              src="${photoPreview}"
              alt="Employment Information"
              style="
                display: block;
                width: 100%;
                max-width: 500px;
                height: auto;
                margin: 0 auto;
                border: 0;
                border-radius: 8px;
              "
            />
          </div>
        `;
      }
    }

    const generatedHTML = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <title>${emailSubject}</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    background-color: #f4f6f8;
    font-family: Arial, Helvetica, sans-serif;
    color: #222222;
  "
>

  <div
    style="
      width: 100%;
      padding: 30px 0;
    "
  >

    <div
      style="
        width: 90%;
        max-width: 700px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 35px;
        box-sizing: border-box;
        border-radius: 8px;
      "
    >

      <p style="margin: 0 0 15px;">
        <strong>To:</strong> ${toEmailAddress}<br>
        <strong>Subject:</strong> ${emailSubject}
      </p>

      <p>
        Dear Mr. ${clientName},
      </p>

      <p>
        We are pleased to inform you that your application for the
        position of <strong>${formData.position}</strong> with
        <strong>${formData.companyName}</strong> has been successfully
        accepted.
      </p>

      <p>
        Following the review of your application and relevant experience,
        we are delighted to offer you employment with our organisation
        in Australia, subject to the completion of the applicable
        employment and visa requirements.
      </p>

      <h3>
        EMPLOYMENT OFFER DETAILS
      </h3>

      <p>
        <strong>Company Name:</strong>
        ${formData.companyName}
        <br>

        <strong>Position:</strong>
        ${formData.position}
        <br>

        <strong>Employment Type:</strong>
        ${formData.employmentType}
        <br>

        <strong>Work Location:</strong>
        ${farmLocation}
        <br>

        <strong>Hourly Rate:</strong>
        AUD $${formData.hourlyRate} per hour
        <br>

        <strong>Expected Working Hours:</strong>
        ${workingHours}
        <br>

        <strong>Proposed Commencement Date:</strong>
        ${commencementDate}
        <br>

        <strong>Employment Offer Reference:</strong>
        ${referenceNumber}
      </p>

      ${imageHTML}

      <h3>
        VISA SPONSORSHIP &amp; IMMIGRATION COMPLIANCE
      </h3>

      <p>
        We are pleased to confirm that ${formData.companyName} intends
        to support your employer-sponsored visa application under the
        Skills in Demand Visa (Subclass 482), subject to the completion
        of all applicable sponsorship, nomination and visa requirements.
      </p>

      <p>
        All visa and immigration processes will be conducted in
        accordance with the applicable Australian immigration laws,
        including the Migration Act 1958 (Cth) and Migration Regulations
        1994 (Cth), as well as the relevant requirements administered
        by the Australian Department of Home Affairs.
      </p>

      <p>
        For official information regarding visa requirements, eligibility
        criteria and immigration procedures, please refer to the following
        Australian Government resources:
      </p>

      <p>
        <strong>
          Australian Department of Home Affairs – Immigration and Citizenship:
        </strong>
        <br>

        <a
          href="https://immi.homeaffairs.gov.au/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://immi.homeaffairs.gov.au/
        </a>
      </p>

      <p>
        <strong>
          Skills in Demand Visa (Subclass 482):
        </strong>
        <br>

        <a
          href="https://immi.homeaffairs.gov.au/Visa-subsite/Pages/work/skills-in-demand-482-landing.aspx"
          target="_blank"
          rel="noopener noreferrer"
        >
          Official Subclass 482 information
        </a>
      </p>

      <p>
        <strong>
          Australian Immigration Legislation:
        </strong>
        <br>

        <a
          href="https://www.legislation.gov.au/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.legislation.gov.au/
        </a>
      </p>

      <p>
        Please note that visa sponsorship, nomination and visa approval
        are subject to applicable Australian immigration laws and the
        decision of the Department of Home Affairs. This employment
        offer does not guarantee visa approval.
      </p>

      <h3>
        REQUIRED DOCUMENTS
      </h3>

      <ol>
        <li>Full name as shown on passport.</li>
        <li>Passport copy.</li>
        <li>Updated CV/Resume.</li>
        <li>Relevant farm work experience certificates.</li>
        <li>
          Educational and trade qualifications, where applicable.
        </li>
        <li>Current residential address.</li>
        <li>Contact number and email address.</li>
        <li>
          Any additional documents requested by our HR or migration team.
        </li>
      </ol>

      <h3>
        NEXT STEPS
      </h3>

      <p>
        Upon receipt and review of the required documents, our HR and
        recruitment team will provide further information regarding
        the employment contract, sponsorship arrangements and the
        expected commencement date.
      </p>

      <p>
        You are requested to review the employment offer carefully and
        confirm your interest in proceeding with this opportunity by
        replying to this email.
      </p>

      <p>
        Congratulations on your successful application. We look forward
        to welcoming you to ${formData.companyName} and having you join
        our team.
      </p>

      <p>
        Kind regards,
        <br>
        <br>

        ${hrManager}
        <br>

        Human Resources &amp; Recruitment Team
        <br>

        ${formData.companyName}
        <br>

        ${companyEmail}
        <br>

        ${companyWebsite}
        <br>

        ${companyPhone}
        <br>

        ${companyABN}
        <br>

        ${companyAddress}
        <br>

        Australia
      </p>

    </div>

  </div>

</body>
</html>
`;

    setHtmlEmail(generatedHTML);
  };

  // Copy HTML
  const copyHTML = async () => {
    if (!htmlEmail) {
      alert('Please generate the email first.');
      return;
    }

    try {
      await navigator.clipboard.writeText(htmlEmail);
      alert('HTML email copied to clipboard!');
    } catch (error) {
      alert('Unable to copy HTML.');
    }
  };

  // Open rendered email preview
  const openPreview = () => {
    if (!htmlEmail) {
      alert('Please generate the email first.');
      return;
    }

    const previewWindow = window.open(
      '',
      '_blank',
      'width=900,height=800'
    );

    if (!previewWindow) {
      alert('Please allow pop-ups for this website.');
      return;
    }

    previewWindow.document.open();
    previewWindow.document.write(htmlEmail);
    previewWindow.document.close();
  };

  // Download HTML file
  const downloadHTML = () => {
    if (!htmlEmail) {
      alert('Please generate the email first.');
      return;
    }

    const blob = new Blob(
      [htmlEmail],
      {
        type: 'text/html',
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;
    link.download = 'employment-offer-email.html';

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="home-page">

      {/* FORM */}

      <div className="form-container">

        <h1>
          Employment Offer Email Generator
        </h1>

        <p className="subtitle">
          Enter the applicant and employment details below.
        </p>

        <div className="form-grid">

          {/* Client */}

          <div className="form-group">

            <label>
              Client Full Name
            </label>

            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              placeholder="e.g. John Smith"
            />

          </div>

          {/* Position */}

          <div className="form-group">

            <label htmlFor="emailSubject">
              Email Subject
            </label>

            <input
              id="emailSubject"
              type="text"
              name="emailSubject"
              value={formData.emailSubject}
              onChange={handleChange}
              placeholder="Employment Offer Confirmation"
            />

          </div>

          <div className="form-group">

            <label htmlFor="toEmailAddress">
              To Email Address
            </label>

            <input
              id="toEmailAddress"
              type="email"
              name="toEmailAddress"
              value={formData.toEmailAddress}
              onChange={handleChange}
              placeholder="applicant@example.com"
            />

          </div>

          <div className="form-group">

            <label>
              Position
            </label>

            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
            />

          </div>

          {/* Company */}

          <div className="form-group">

            <label>
              Company Name
            </label>

            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />

          </div>

          {/* Employment Type */}

          <div className="form-group">

            <label>
              Employment Type
            </label>

            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
            >

              <option value="Full-time">
                Full-time
              </option>

              <option value="Part-time">
                Part-time
              </option>

              <option value="Casual">
                Casual
              </option>

            </select>

          </div>

          {/* Farm Location */}

          <div className="form-group">

            <label>
              Farm Location
            </label>

            <input
              type="text"
              name="farmLocation"
              value={formData.farmLocation}
              onChange={handleChange}
              placeholder="Queensland, Australia"
            />

          </div>

          {/* Hourly Rate */}

          <div className="form-group">

            <label>
              Hourly Rate (AUD)
            </label>

            <input
              type="number"
              step="0.01"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleChange}
            />

          </div>

          {/* Working Hours */}

          <div className="form-group">

            <label>
              Expected Working Hours
            </label>

            <input
              type="text"
              name="workingHours"
              value={formData.workingHours}
              onChange={handleChange}
              placeholder="38 hours per week"
            />

          </div>

          {/* Date */}

          <div className="form-group">

            <label>
              Proposed Commencement Date
            </label>

            <input
              type="date"
              name="commencementDate"
              value={formData.commencementDate}
              onChange={handleChange}
            />

          </div>

          {/* Reference */}

          <div className="form-group">

            <label>
              Employment Offer Reference
            </label>

            <input
              type="text"
              name="referenceNumber"
              value={formData.referenceNumber}
              onChange={handleChange}
              placeholder="AA-2026-001"
            />

          </div>

          {/* HR Manager */}

          <div className="form-group">

            <label>
              HR Manager Full Name
            </label>

            <input
              type="text"
              name="hrManager"
              value={formData.hrManager}
              onChange={handleChange}
              placeholder="e.g. Sarah Johnson"
            />

          </div>

          {/* Email */}

          <div className="form-group">

            <label>
              Company Email
            </label>

            <input
              type="email"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleChange}
              placeholder="hr@example.com"
            />

          </div>

          {/* Website */}

          <div className="form-group">

            <label>
              Company Website
            </label>

            <input
              type="url"
              name="companyWebsite"
              value={formData.companyWebsite}
              onChange={handleChange}
              placeholder="https://example.com"
            />

          </div>

          {/* Phone */}

          <div className="form-group">

            <label>
              Company Phone
            </label>

            <input
              type="text"
              name="companyPhone"
              value={formData.companyPhone}
              onChange={handleChange}
              placeholder="+61 ..."
            />

          </div>

          {/* ABN */}

          <div className="form-group">

            <label>
              Company ABN
            </label>

            <input
              type="text"
              name="companyABN"
              value={formData.companyABN}
              onChange={handleChange}
              placeholder="ABN"
            />

          </div>

          {/* Address */}

          <div className="form-group full-width">

            <label>
              Company Office Address
            </label>

            <input
              type="text"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              placeholder="Company office address"
            />

          </div>

          {/* PHOTO */}

          <div className="form-group">

            <label>
              Email Image
            </label>

            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handlePhotoChange}
            />

            <small>
              Maximum image size: 5 MB
            </small>

          </div>

          {/* IMAGE URL */}

          <div className="form-group">

            <label>
              Image Destination URL
            </label>

            <input
              type="url"
              value={photoLink}
              onChange={(e) => setPhotoLink(e.target.value)}
              placeholder="https://example.com/page"
            />

            <small>
              The image will link to this address.
            </small>

          </div>

          {/* IMAGE PREVIEW */}

          {photoPreview && (

            <div className="photo-preview-container full-width">

              <label>
                Image Preview
              </label>

              <div className="photo-preview">

                {photoLink ? (

                  <a
                    href={photoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >

                    <img
                      src={photoPreview}
                      alt="Email preview"
                    />

                  </a>

                ) : (

                  <img
                    src={photoPreview}
                    alt="Email preview"
                  />

                )}

              </div>

              <small>
                Click the preview to test the destination link.
              </small>

            </div>

          )}

        </div>

        {/* GENERATE */}

        <button
          className="generate-button"
          onClick={generateEmail}
        >
          Generate HTML Email
        </button>

      </div>

      {/* GENERATED HTML */}

      {htmlEmail && (

        <div className="email-preview">

          <div className="preview-header">

            <h2>
              Generated HTML Email
            </h2>

            <div className="preview-buttons">

              <button
                className="preview-button"
                onClick={openPreview}
              >
                Preview
              </button>

              <button
                className="copy-button"
                onClick={copyHTML}
              >
                Copy HTML
              </button>

              <button
                className="download-button"
                onClick={downloadHTML}
              >
                Download HTML
              </button>

            </div>

          </div>

          <textarea
            value={htmlEmail}
            onChange={(e) => setHtmlEmail(e.target.value)}
            rows={35}
            spellCheck={false}
          />

        </div>

      )}

    </div>
  );
}

export default HomePage;

