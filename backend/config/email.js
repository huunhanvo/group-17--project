const nodemailer = require('nodemailer');

// Cấu hình email transporter
const createTransporter = () => {
  // Sử dụng Gmail (hoặc có thể dùng Mailtrap, SendGrid, etc.)
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Gửi email reset password
const sendResetPasswordEmail = async (email, resetToken) => {
  const transporter = createTransporter();
  
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  
  const mailOptions = {
    from: `"User Management System" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '🔐 Yêu cầu đặt lại mật khẩu',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #4CAF50; text-align: center;">🔐 Đặt lại mật khẩu</h2>
        <p>Xin chào,</p>
        <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình.</p>
        <p>Vui lòng click vào nút bên dưới để đặt lại mật khẩu:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #4CAF50; 
                    color: white; 
                    padding: 12px 30px; 
                    text-decoration: none; 
                    border-radius: 5px; 
                    display: inline-block;
                    font-weight: bold;">
            Đặt lại mật khẩu
          </a>
        </div>
        
        <p style="color: #666; font-size: 14px;">
          Hoặc copy link này vào trình duyệt:<br>
          <code style="background: #f5f5f5; padding: 5px; display: block; margin-top: 10px; word-break: break-all;">
            ${resetUrl}
          </code>
        </p>
        
        <p style="color: #f44336; font-weight: bold; margin-top: 20px;">
          ⚠️ Link này chỉ có hiệu lực trong 10 phút!
        </p>
        
        <p style="color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px;">
          Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.<br>
          Email này được gửi tự động, vui lòng không trả lời.
        </p>
      </div>
    `
  };
  
  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Không thể gửi email');
  }
};

module.exports = {
  sendResetPasswordEmail
};
