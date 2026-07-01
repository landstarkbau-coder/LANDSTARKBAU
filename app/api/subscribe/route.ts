// app/api/subscribe/route.ts
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { email, locale, name } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const isEnglish = locale === 'en'
    const isGerman = locale === 'de'
    const isUkrainian = locale === 'ua'

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    // Email для підписника
    const subscriberSubject = isEnglish 
      ? `Welcome to LANDSTARKBAU Newsletter!` 
      : isGerman 
        ? `Willkommen beim LANDSTARKBAU Newsletter!` 
        : `Ласкаво просимо до розсилки LANDSTARKBAU!`

    const subscriberHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a1f20; padding: 20px; text-align: center;">
          <h1 style="color: #D4A853; margin: 0;">LANDSTARKBAU</h1>
          <p style="color: white; margin: 5px 0;">${isEnglish ? 'Newsletter' : isGerman ? 'Newsletter' : 'Розсилка'}</p>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <h2>${isEnglish ? 'Welcome!' : isGerman ? 'Willkommen!' : 'Ласкаво просимо!'}</h2>
          <p>${isEnglish 
            ? 'Thank you for subscribing to the LANDSTARKBAU newsletter! You will now receive updates on our projects and inspiration.' 
            : isGerman 
              ? 'Vielen Dank für Ihr Abonnement des LANDSTARKBAU Newsletters! Sie erhalten jetzt Updates zu unseren Projekten und Inspirationen.' 
              : 'Дякуємо за підписку на розсилку LANDSTARKBAU! Тепер ви будете отримувати оновлення про наші проекти та натхнення.'
          }</p>
          <br>
          <p style="color: #666; font-size: 12px;">
            ${isEnglish 
              ? 'You can unsubscribe at any time.' 
              : isGerman 
                ? 'Sie können sich jederzeit abmelden.' 
                : 'Ви можете відписатися в будь-який час.'}
          </p>
          <br>
          <p>${isEnglish 
            ? 'Best regards,' 
            : isGerman 
              ? 'Mit freundlichen Grüßen,' 
              : 'З повагою,'}<br>
            <strong style="color: #D4A853;">LANDSTARKBAU Team</strong>
          </p>
        </div>
        <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
          <p>© 2024 LANDSTARKBAU. ${isEnglish ? 'All rights reserved.' : isGerman ? 'Alle Rechte vorbehalten.' : 'Всі права захищено.'}</p>
          <p>Marienplatz 1, ${isEnglish ? '80331 Munich' : isGerman ? '80331 München' : '80331 Мюнхен'}</p>
        </div>
      </div>
    `

    // Email для адміністратора (новий підписник)
    const adminSubject = isEnglish 
      ? `New newsletter subscriber: ${email}` 
      : isGerman 
        ? `Neuer Newsletter-Abonnent: ${email}` 
        : `Новий підписник розсилки: ${email}`

    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a1f20; padding: 20px; text-align: center;">
          <h1 style="color: #D4A853; margin: 0;">📧 New Newsletter Subscriber</h1>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <h2>${isEnglish ? 'A new subscriber has joined!' : isGerman ? 'Ein neuer Abonnent hat sich angemeldet!' : 'Новий підписник приєднався!'}</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>${isEnglish ? 'Language' : isGerman ? 'Sprache' : 'Мова'}:</strong> ${isEnglish ? 'English' : isGerman ? 'German' : 'Ukrainian'}</p>
          <hr>
          <p style="font-size: 12px; color: #666;">
            ${isEnglish 
              ? 'Total subscribers: Coming soon...' 
              : isGerman 
                ? 'Gesamtabonnenten: Demnächst...' 
                : 'Всього підписників: Скоро...'}
          </p>
        </div>
        <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
          <p>© 2024 LANDSTARKBAU</p>
        </div>
      </div>
    `

    await Promise.all([
      transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: subscriberSubject,
        html: subscriberHtml,
      }),
      transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.ADMIN_EMAIL || 'sitedoer99+admin@gmail.com',
        replyTo: email,
        subject: adminSubject,
        html: adminHtml,
      }),
    ])

    let successMessage = ''
    if (isEnglish) {
      successMessage = 'Thank you for subscribing!'
    } else if (isGerman) {
      successMessage = 'Vielen Dank für Ihr Abonnement!'
    } else if (isUkrainian) {
      successMessage = 'Дякуємо за підписку!'
    }

    return NextResponse.json(
      { success: true, message: successMessage },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending newsletter email:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}