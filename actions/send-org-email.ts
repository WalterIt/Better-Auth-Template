"use server";

import transporter from "@/lib/emails/nodemailer";



export async function sendOrganizationInviteEmail({
  invitation,
  inviter,
  organization,
  email,
}: {
  invitation: { id: string }
  inviter: { name: string }
  organization: { name: string }
  email: string
}) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: `You're invited to join the ${organization.name} organization`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">You're invited to join ${organization.name}</h2>
        <p>Hello!</p>
        <p>${inviter.name} invited you to join the ${organization.name} organization. Please click the button below to accept/reject the invitation:</p>
        <a href="${process.env.BETTER_AUTH_URL}/organizations/invites/${invitation.id}" style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 16px 0;">Manage Invitation</a>
        <p>Best regards,<br>Your App Team</p>
      </div>
    `,
    text: `You're invited to join the ${organization.name} organization\n\nHello ${inviter.name},\n\n${inviter.name} invited you to join the ${organization.name} organization. Please click the link below to accept/reject the invitation:\n\n${process.env.BETTER_AUTH_URL}/organizations/invites/${invitation.id}\n\nBest regards,\nYour App Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    console.error("[SendEmail]:", err);
    return { success: false };
  }
}

export async function sendPasswordResetEmail({
  user,
  url,
}: {
  user: { email: string; name: string }
  url: string
}) {
  const mailOptions = {
    to: user.email,
    subject: "Reset your password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Reset Your Password</h2>
        <p>Hello, ${user.name}!</p>
        <p>You requested to reset your password. Click the button below to reset it:</p>
        <a href="${url}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 16px 0;">Reset Password</a>
        <p>If you didn't request this, please ignore this email.</p>
        <p>This link will expire in 24 hours.</p>
        <p>Best regards,<br>Your App Team</p>
      </div>
    `,
    text: `Hello ${user.name},\n\nYou requested to reset your password. Click this link to reset it: ${url}\n\nIf you didn't request this, please ignore this email.\n\nThis link will expire in 24 hours.\n\nBest regards,\nYour App Team`,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (err) {
    console.error("[SendEmail]:", err)
    return { success: false }
  }
}



export async function sendEmailVerificationEmail({
    user,
    url,
}: {
  user: {
    name: string;
    email: string;
  };
  url: string;
}) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: user.email,
    subject: `Better Auth - Verify your email address`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Verify Your Email</h2>
        <p>Hello, ${user.name}!</p>
        <p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
        <a href="${url}" style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 16px 0;">Verify Email</a>
        <p>If you didn't create an account, please ignore this email.</p>
        <p>This link will expire in 24 hours.</p>
        <p>Best regards,<br>Your App Team</p>
      </div>
    `,
    text: `Hello ${user.name},\n\nThank you for signing up! Please verify your email address by clicking this link: ${url}\n\nIf you didn't create an account, please ignore this email.\n\nThis link will expire in 24 hours.\n\nBest regards,\nYour App Team`,

  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    console.error("[SendEmail]:", err);
    return { success: false };
  }
}



interface EmailVerificationData {
  user: {
    name: string
    email: string
  }
  url: string
}


export async function sendDeleteAccountVerificationEmail({
  user,
  url,
}: EmailVerificationData) {
    const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: user.email,
    subject: "Delete your account",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Confirm Account Deletion</h2>
        <p>Hello ${user.name},</p>
        <p>We're sorry to see you go! Please confirm your account deletion by clicking the button below:</p>
        <a href="${url}" style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 16px 0;">Confirm Deletion</a>
        <p>If you don't have an account, please ignore this email.</p>
        <p>This link will expire in 24 hours.</p>
        <p>Best regards,<br>Your App Team</p>
      </div>
    `,
    text: `Hello ${user.name},\n\nWe're sorry to see you go! Please confirm your account deletion by clicking this link: ${url}\n\nIf you don't have an account, please ignore this email.\n\nThis link will expire in 24 hours.\n\nBest regards,\nYour App Team`,
  };

    try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    console.error("[SendEmail]:", err);
    return { success: false };
  }
}