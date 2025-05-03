import { SmtpClient } from 'npm:@orama/smtp@1.0.0';

interface MeetingRequest {
  name: string;
  company?: string;
  email: string;
  phone: string;
  topic?: string;
  selectedDate: string;
  selectedTime: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { name, company, email, phone, topic, selectedDate, selectedTime } = await req.json() as MeetingRequest;

    // Create SMTP client with your specific settings
    const smtp = new SmtpClient({
      host: 'smtp.honeybeeloan.com',
      port: 587,
      auth: {
        username: 'Info@honeybeeLoan.com',
        password: 'Richard#35',
      },
      tls: true,
    });

    // Format the date
    const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Create email HTML content with improved styling
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f97316; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { border: 1px solid #e2e8f0; border-radius: 0 0 8px 8px; padding: 20px; }
          .highlight { background-color: #fff7ed; padding: 15px; border-radius: 5px; margin: 15px 0; }
          .section { margin-bottom: 20px; }
          .section-title { color: #f97316; font-size: 18px; margin-bottom: 10px; }
          .info-row { display: flex; margin-bottom: 8px; }
          .label { font-weight: bold; width: 120px; }
          .value { flex: 1; }
          .topic-box { background-color: #f8fafc; padding: 15px; border-radius: 5px; margin-top: 15px; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Loan Consultation Request</h1>
          </div>
          <div class="content">
            <div class="section">
              <div class="highlight">
                <div class="section-title">Meeting Details</div>
                <div class="info-row">
                  <span class="label">Date:</span>
                  <span class="value">${formattedDate}</span>
                </div>
                <div class="info-row">
                  <span class="label">Time:</span>
                  <span class="value">${selectedTime} EST</span>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Applicant Information</div>
              <div class="info-row">
                <span class="label">Name:</span>
                <span class="value">${name}</span>
              </div>
              ${company ? `
              <div class="info-row">
                <span class="label">Company:</span>
                <span class="value">${company}</span>
              </div>
              ` : ''}
              <div class="info-row">
                <span class="label">Email:</span>
                <span class="value">${email}</span>
              </div>
              <div class="info-row">
                <span class="label">Phone:</span>
                <span class="value">${phone}</span>
              </div>
            </div>

            ${topic ? `
            <div class="section">
              <div class="section-title">Discussion Topic</div>
              <div class="topic-box">
                ${topic}
              </div>
            </div>
            ` : ''}

            <div class="footer">
              This meeting request was automatically generated from HoneyBee Loan's consultation scheduling system.
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email
    await smtp.send({
      from: 'Info@honeybeeLoan.com',
      to: 'info@honeybeeloan.com',
      subject: `Loan Consultation Request - ${name}${company ? ` (${company})` : ''}`,
      html: htmlContent,
    });

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Meeting request sent successfully'
      }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        } 
      }
    );
  } catch (error) {
    console.error('Failed to send email:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to send meeting request. Please try again.' 
      }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        } 
      }
    );
  }
});