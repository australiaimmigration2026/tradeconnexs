import '../App.css';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_0cqgfzg';
const TEMPLATE_ID = 'template_zgljqkp';
const PUBLIC_KEY = 'Wg5ZcPyVwQSQUnHVC';

// ==================================================
// CLOUDINARY
// ==================================================

// CHANGE THIS
const CLOUDINARY_CLOUD_NAME = 'gc972vw1';

// CHANGE THIS
const CLOUDINARY_UPLOAD_PRESET = 'employment_images';

const CLOUDINARY_UPLOAD_URL =
  `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;


function HomePage() {

  // ==================================================
  // FORM DATA
  // ==================================================

  const [formData, setFormData] = useState({
    clientName: '',
    emailSubject: '',
    toEmailAddress: '',
    replyTo: '',
    fromName: '',

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

  // ==================================================
  // IMAGE
  // ==================================================

  const [photoFile, setPhotoFile] = useState(null);

  const [photoPreview, setPhotoPreview] = useState('');

  const [photoUrl, setPhotoUrl] = useState('');

  const [photoLink, setPhotoLink] = useState('');

  // ==================================================
  // STATUS
  // ==================================================

  const [uploading, setUploading] = useState(false);

  const [sending, setSending] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');

  const [errorMessage, setErrorMessage] = useState('');


  // ==================================================
  // HANDLE FORM
  // ==================================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  // ==================================================
  // URL VALIDATION
  // ==================================================

  const isValidUrl = (value) => {

    try {

      const url = new URL(value);

      return (
        url.protocol === 'http:' ||
        url.protocol === 'https:'
      );

    } catch {

      return false;

    }

  };


  // ==================================================
  // IMAGE SELECTION
  // ==================================================

  const handlePhotoChange = (e) => {

    const file = e.target.files[0];

    setSuccessMessage('');
    setErrorMessage('');

    setPhotoUrl('');

    if (!file) {

      setPhotoFile(null);
      setPhotoPreview('');

      return;

    }


    // ----------------------------------------------
    // Allowed formats
    // ----------------------------------------------

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ];


    if (!allowedTypes.includes(file.type.toLowerCase())) {

      setErrorMessage(
        'Only JPG, JPEG, PNG and WebP images are supported.'
      );

      e.target.value = '';

      setPhotoFile(null);
      setPhotoPreview('');

      return;

    }


    // ----------------------------------------------
    // 5 MB limit
    // ----------------------------------------------

    if (file.size > 5 * 1024 * 1024) {

      setErrorMessage(
        'Image size must be less than 5 MB.'
      );

      e.target.value = '';

      setPhotoFile(null);
      setPhotoPreview('');

      return;

    }


    // ----------------------------------------------
    // Save file
    // ----------------------------------------------

    setPhotoFile(file);


    // ----------------------------------------------
    // Local preview
    // ----------------------------------------------

    const reader = new FileReader();

    reader.onload = (event) => {

      setPhotoPreview(
        event.target.result
      );

    };

    reader.readAsDataURL(file);

  };


  // ==================================================
  // UPLOAD IMAGE TO CLOUDINARY
  // ==================================================

  const uploadImageToCloudinary = async () => {

    if (!photoFile) {

      throw new Error(
        'Please select an image first.'
      );

    }


    setUploading(true);

    setErrorMessage('');
    setSuccessMessage('');


    try {

      // ----------------------------------------------
      // FormData
      // ----------------------------------------------

      const uploadData = new FormData();

      uploadData.append(
        'file',
        photoFile
      );

      uploadData.append(
        'upload_preset',
        CLOUDINARY_UPLOAD_PRESET
      );


      // ----------------------------------------------
      // Upload
      // ----------------------------------------------

      const response = await fetch(
        CLOUDINARY_UPLOAD_URL,
        {
          method: 'POST',
          body: uploadData,
        }
      );


      const data = await response.json();


      // ----------------------------------------------
      // Check response
      // ----------------------------------------------

      if (!response.ok) {

        console.error(
          'Cloudinary error:',
          data
        );

        throw new Error(
          data?.error?.message ||
          'Cloudinary image upload failed.'
        );

      }


      // ----------------------------------------------
      // Get public image URL
      // ----------------------------------------------

      if (!data.secure_url) {

        throw new Error(
          'Cloudinary did not return an image URL.'
        );

      }


      console.log(
        'Cloudinary image URL:',
        data.secure_url
      );


      setPhotoUrl(
        data.secure_url
      );


      return data.secure_url;

    } finally {

      setUploading(false);

    }

  };


  // ==================================================
  // SEND EMAIL
  // ==================================================

  const sendEmail = async () => {

    setSuccessMessage('');
    setErrorMessage('');


    // ----------------------------------------------
    // Required fields
    // ----------------------------------------------

    if (!formData.clientName.trim()) {

      setErrorMessage(
        'Please enter the client full name.'
      );

      return;

    }


    if (!formData.emailSubject.trim()) {

      setErrorMessage(
        'Please enter the email subject.'
      );

      return;

    }


    if (!formData.toEmailAddress.trim()) {

      setErrorMessage(
        'Please enter the client email address.'
      );

      return;

    }


    if (!formData.fromName.trim()) {

      setErrorMessage(
        'Please enter the From Name.'
      );

      return;

    }


    // ----------------------------------------------
    // Image
    // ----------------------------------------------

    if (!photoFile) {

      setErrorMessage(
        'Please select an image.'
      );

      return;

    }


    // ----------------------------------------------
    // Destination URL
    // ----------------------------------------------

    if (!photoLink.trim()) {

      setErrorMessage(
        'Please enter the image destination URL.'
      );

      return;

    }


    if (!isValidUrl(photoLink.trim())) {

      setErrorMessage(
        'Please enter a valid image destination URL.'
      );

      return;

    }


    setSending(true);


    try {

      // ============================================
      // UPLOAD IMAGE
      // ============================================

      let uploadedImageUrl = photoUrl;


      if (!uploadedImageUrl) {

        uploadedImageUrl =
          await uploadImageToCloudinary();

      }


      // ============================================
      // EMAILJS PARAMETERS
      // ============================================

      const templateParams = {

        // ------------------------------------------
        // Recipient
        // ------------------------------------------

        clientName:
          formData.clientName,

        emailSubject:
          formData.emailSubject,

        toEmailAddress:
          formData.toEmailAddress,

        replyTo:
          formData.replyTo,

        fromName:
          formData.fromName,


        // ------------------------------------------
        // Employment
        // ------------------------------------------

        position:
          formData.position,

        companyName:
          formData.companyName,

        employmentType:
          formData.employmentType,

        farmLocation:
          formData.farmLocation,

        hourlyRate:
          formData.hourlyRate,

        workingHours:
          formData.workingHours,

        commencementDate:
          formData.commencementDate,

        referenceNumber:
          formData.referenceNumber,


        // ------------------------------------------
        // Company
        // ------------------------------------------

        hrManager:
          formData.hrManager,

        companyEmail:
          formData.companyEmail,

        companyWebsite:
          formData.companyWebsite,

        companyPhone:
          formData.companyPhone,

        companyABN:
          formData.companyABN,

        companyAddress:
          formData.companyAddress,


        // ------------------------------------------
        // IMAGE
        // ------------------------------------------

        photoUrl:
          uploadedImageUrl,

        photoLink:
          photoLink.trim(),

      };


      console.log(
        'EmailJS parameters:',
        templateParams
      );


      // ============================================
      // SEND EMAIL
      // ============================================

      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        {
          publicKey: PUBLIC_KEY,
        }
      );


      console.log(
        'EmailJS response:',
        response
      );


      setSuccessMessage(
        `Email sent successfully to ${formData.toEmailAddress}`
      );


    } catch (error) {

      console.error(
        'Email sending error:',
        error
      );


      setErrorMessage(
        error?.text ||
        error?.message ||
        'Failed to upload image or send email.'
      );


    } finally {

      setSending(false);

    }

  };


  // ==================================================
  // RESET
  // ==================================================

  const resetForm = () => {

    setFormData({
      clientName: '',
      emailSubject: '',
      toEmailAddress: '',
      replyTo: '',
      fromName: '',

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


    setPhotoFile(null);

    setPhotoPreview('');

    setPhotoUrl('');

    setPhotoLink('');

    setSuccessMessage('');

    setErrorMessage('');


    const fileInput =
      document.getElementById('emailImage');


    if (fileInput) {

      fileInput.value = '';

    }

  };


  // ==================================================
  // UI
  // ==================================================

  return (

    <div className="home-page">

      <div className="form-container">

        <h1>
          Employment Offer Email
        </h1>

        <p className="subtitle">
          Enter the applicant and employment details below.
        </p>


        {/* SUCCESS */}

        {successMessage && (

          <div className="success-message">

            {successMessage}

          </div>

        )}


        {/* ERROR */}

        {errorMessage && (

          <div className="error-message">

            {errorMessage}

          </div>

        )}


        <div className="form-grid">


          {/* CLIENT NAME */}

          <div className="form-group">

            <label htmlFor="clientName">
              Client Full Name
            </label>

            <input
              id="clientName"
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              placeholder="e.g. John Smith"
            />

          </div>


          {/* SUBJECT */}

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


          {/* TO EMAIL */}

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


          {/* REPLY TO */}

          <div className="form-group">

            <label htmlFor="replyTo">
              Reply To
            </label>

            <input
              id="replyTo"
              type="email"
              name="replyTo"
              value={formData.replyTo}
              onChange={handleChange}
              placeholder="hr@example.com"
            />

          </div>


          {/* FROM NAME */}

          <div className="form-group">

            <label htmlFor="fromName">
              From Name
            </label>

            <input
              id="fromName"
              type="text"
              name="fromName"
              value={formData.fromName}
              onChange={handleChange}
              placeholder="Agribusiness Australia"
            />

          </div>


          {/* POSITION */}

          <div className="form-group">

            <label htmlFor="position">
              Position
            </label>

            <input
              id="position"
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
            />

          </div>


          {/* COMPANY */}

          <div className="form-group">

            <label htmlFor="companyName">
              Company Name
            </label>

            <input
              id="companyName"
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />

          </div>


          {/* EMPLOYMENT TYPE */}

          <div className="form-group">

            <label htmlFor="employmentType">
              Employment Type
            </label>

            <select
              id="employmentType"
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


          {/* FARM LOCATION */}

          <div className="form-group">

            <label htmlFor="farmLocation">
              Farm Location
            </label>

            <input
              id="farmLocation"
              type="text"
              name="farmLocation"
              value={formData.farmLocation}
              onChange={handleChange}
              placeholder="Queensland, Australia"
            />

          </div>


          {/* HOURLY RATE */}

          <div className="form-group">

            <label htmlFor="hourlyRate">
              Hourly Rate (AUD)
            </label>

            <input
              id="hourlyRate"
              type="number"
              step="0.01"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleChange}
            />

          </div>


          {/* WORKING HOURS */}

          <div className="form-group">

            <label htmlFor="workingHours">
              Expected Working Hours
            </label>

            <input
              id="workingHours"
              type="text"
              name="workingHours"
              value={formData.workingHours}
              onChange={handleChange}
              placeholder="38 hours per week"
            />

          </div>


          {/* COMMENCEMENT DATE */}

          <div className="form-group">

            <label htmlFor="commencementDate">
              Proposed Commencement Date
            </label>

            <input
              id="commencementDate"
              type="date"
              name="commencementDate"
              value={formData.commencementDate}
              onChange={handleChange}
            />

          </div>


          {/* REFERENCE */}

          <div className="form-group">

            <label htmlFor="referenceNumber">
              Employment Offer Reference
            </label>

            <input
              id="referenceNumber"
              type="text"
              name="referenceNumber"
              value={formData.referenceNumber}
              onChange={handleChange}
              placeholder="AA-2026-001"
            />

          </div>


          {/* HR MANAGER */}

          <div className="form-group">

            <label htmlFor="hrManager">
              HR Manager Full Name
            </label>

            <input
              id="hrManager"
              type="text"
              name="hrManager"
              value={formData.hrManager}
              onChange={handleChange}
              placeholder="e.g. Sarah Johnson"
            />

          </div>


          {/* COMPANY EMAIL */}

          <div className="form-group">

            <label htmlFor="companyEmail">
              Company Email
            </label>

            <input
              id="companyEmail"
              type="email"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleChange}
              placeholder="hr@example.com"
            />

          </div>


          {/* WEBSITE */}

          <div className="form-group">

            <label htmlFor="companyWebsite">
              Company Website
            </label>

            <input
              id="companyWebsite"
              type="url"
              name="companyWebsite"
              value={formData.companyWebsite}
              onChange={handleChange}
              placeholder="https://example.com"
            />

          </div>


          {/* PHONE */}

          <div className="form-group">

            <label htmlFor="companyPhone">
              Company Phone
            </label>

            <input
              id="companyPhone"
              type="text"
              name="companyPhone"
              value={formData.companyPhone}
              onChange={handleChange}
              placeholder="+61 ..."
            />

          </div>


          {/* ABN */}

          <div className="form-group">

            <label htmlFor="companyABN">
              Company ABN
            </label>

            <input
              id="companyABN"
              type="text"
              name="companyABN"
              value={formData.companyABN}
              onChange={handleChange}
              placeholder="ABN"
            />

          </div>


          {/* ADDRESS */}

          <div className="form-group full-width">

            <label htmlFor="companyAddress">
              Company Office Address
            </label>

            <input
              id="companyAddress"
              type="text"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              placeholder="Company office address"
            />

          </div>


          {/* IMAGE */}

          <div className="form-group">

            <label htmlFor="emailImage">
              Email Image
            </label>

            <input
              id="emailImage"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handlePhotoChange}
            />

            <small>
              JPG, PNG and WebP — maximum 5 MB.
            </small>

          </div>


          {/* IMAGE DESTINATION */}

          <div className="form-group">

            <label htmlFor="photoLink">
              Image Destination URL
            </label>

            <input
              id="photoLink"
              type="url"
              value={photoLink}
              onChange={(e) => {
                setPhotoLink(e.target.value);
                setErrorMessage('');
              }}
              placeholder="https://example.com/page"
            />

            <small>
              Clicking the image in the email opens this URL.
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


              {/* CLOUDINARY STATUS */}

              {photoUrl && (

                <small style={{
                  color: '#166534',
                  fontWeight: '600'
                }}>
                  ✓ Image uploaded successfully.
                </small>

              )}

              {!photoUrl && (

                <small>
                  The image will be uploaded automatically
                  when you send the email.
                </small>

              )}

            </div>

          )}

        </div>


        {/* ACTION BUTTONS */}

        <div className="action-buttons">

          <button
            type="button"
            className="generate-button"
            onClick={sendEmail}
            disabled={sending || uploading}
          >

            {uploading
              ? 'Uploading Image...'
              : sending
                ? 'Sending Email...'
                : 'Send Email'}

          </button>


          <button
            type="button"
            className="reset-button"
            onClick={resetForm}
            disabled={sending || uploading}
          >

            Reset

          </button>

        </div>

      </div>

    </div>

  );

}


export default HomePage;