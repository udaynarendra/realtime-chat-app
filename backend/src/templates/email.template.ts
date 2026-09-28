export const otpEmailTemplate = (otp:string,userName:string) :string=>`

        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
            <h2>Email Verification</h2>

            <p>Hello, ${userName}</p>

            <p>We received a request to verify your email address.</p>

            <p>Your One-Time Password (OTP) is:</p>

            <h1 style="letter-spacing:5px; color:#2563eb;">
                ${otp}
            </h1>

            <p>This OTP is valid for <strong>5 minutes</strong>.</p>

            <p><strong>Do not share this OTP with anyone.</strong></p>

            <hr>

            <p>If you didn't request this verification, you can safely ignore this email.</p>

            <p>Thanks,<br>Real Time Chat App</p>
        </div>
    `;