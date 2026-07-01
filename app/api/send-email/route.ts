// app/api/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, locale } = await request.json()

    // Валідація
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Alle Felder sind erforderlich' },
        { status: 400 }
      )
    }

    // Налаштування транспортера
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

    // Визначаємо мову
    const isEnglish = locale === 'en'
    const isGerman = locale === 'de'
    const isUkrainian = locale === 'ua'
    const languageName = isEnglish ? 'English' : isGerman ? 'German' : 'Ukrainian'

    // ==========================================
    // 1. ЛИСТ ДЛЯ ЗАМОВНИКА
    // ==========================================
    let customerSubject = ''
    let customerHtml = ''

    if (isEnglish) {
      customerSubject = `Thank you for your inquiry, ${name}!`
      customerHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a1f20; padding: 20px; text-align: center;">
            <h1 style="color: #D4A853; margin: 0;">LANDSTARKBAU</h1>
            <p style="color: white; margin: 5px 0;">Construction &amp; Landscaping</p>
          </div>
          <div style="padding: 30px; background: #f9f9f9;">
            <h2>Hello ${name},</h2>
            <p>Thank you for contacting LANDSTARKBAU! We have received your message and will get back to you shortly.</p>
            <p><strong>Your message:</strong></p>
            <p style="background: #f0f0f0; padding: 15px; border-radius: 8px;">${message}</p>
            <hr>
            <p><strong>Your contact details:</strong></p>
            <p>📧 ${email}</p>
            <p>📞 +49 89 123 4567</p>
            <br>
            <p>Best regards,<br><strong style="color: #D4A853;">Your LANDSTARKBAU Team</strong></p>
          </div>
          <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>© 2024 LANDSTARKBAU. All rights reserved.</p>
            <p>Marienplatz 1, 80331 Munich</p>
          </div>
        </div>
      `
    } else if (isGerman) {
      customerSubject = `Vielen Dank für Ihre Anfrage, ${name}!`
      customerHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a1f20; padding: 20px; text-align: center;">
            <h1 style="color: #D4A853; margin: 0;">LANDSTARKBAU</h1>
            <p style="color: white; margin: 5px 0;">Bau &amp; Landschaftsgestaltung</p>
          </div>
          <div style="padding: 30px; background: #f9f9f9;">
            <h2>Hallo ${name},</h2>
            <p>Vielen Dank für Ihre Anfrage! Wir haben Ihre Nachricht erhalten und werden uns in Kürze bei Ihnen melden.</p>
            <p><strong>Ihre Nachricht:</strong></p>
            <p style="background: #f0f0f0; padding: 15px; border-radius: 8px;">${message}</p>
            <hr>
            <p><strong>Ihre Kontaktdaten:</strong></p>
            <p>📧 ${email}</p>
            <p>📞 +49 89 123 4567</p>
            <br>
            <p>Mit freundlichen Grüßen,<br><strong style="color: #D4A853;">Ihr LANDSTARKBAU Team</strong></p>
          </div>
          <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>© 2024 LANDSTARKBAU. Alle Rechte vorbehalten.</p>
            <p>Marienplatz 1, 80331 München</p>
          </div>
        </div>
      `
    } else if (isUkrainian) {
      customerSubject = `Дякуємо за ваше звернення, ${name}!`
      customerHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a1f20; padding: 20px; text-align: center;">
            <h1 style="color: #D4A853; margin: 0;">LANDSTARKBAU</h1>
            <p style="color: white; margin: 5px 0;">Будівництво та ландшафтний дизайн</p>
          </div>
          <div style="padding: 30px; background: #f9f9f9;">
            <h2>Вітаємо, ${name},</h2>
            <p>Дякуємо за ваше звернення до LANDSTARKBAU! Ми отримали ваше повідомлення і зв'яжемося з вами найближчим часом.</p>
            <p><strong>Ваше повідомлення:</strong></p>
            <p style="background: #f0f0f0; padding: 15px; border-radius: 8px;">${message}</p>
            <hr>
            <p><strong>Ваші контактні дані:</strong></p>
            <p>📧 ${email}</p>
            <p>📞 +49 89 123 4567</p>
            <br>
            <p>З повагою,<br><strong style="color: #D4A853;">Команда LANDSTARKBAU</strong></p>
          </div>
          <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>© 2024 LANDSTARKBAU. Всі права захищено.</p>
            <p>Marienplatz 1, 80331 Мюнхен</p>
          </div>
        </div>
      `
    }

    // ==========================================
    // 2. ЛИСТ ДЛЯ АДМІНІСТРАТОРА
    // ==========================================
    const adminSubject = isEnglish 
      ? `New inquiry from ${name}` 
      : isGerman 
        ? `Neue Anfrage von ${name}` 
        : `Нове звернення від ${name}`

    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a1f20; padding: 20px; text-align: center;">
          <h1 style="color: #D4A853; margin: 0;">📩 ${isEnglish ? 'New Inquiry' : isGerman ? 'Neue Anfrage' : 'Нове звернення'}</h1>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <h2>${isEnglish ? 'A new contact inquiry has been received:' : isGerman ? 'Eine neue Kontaktanfrage ist eingegangen:' : 'Отримано нове контактне звернення:'}</h2>
          <p><strong>${isEnglish ? 'Name' : isGerman ? 'Name' : "Ім'я"}:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>${isEnglish ? 'Language' : isGerman ? 'Sprache' : 'Мова'}:</strong> ${languageName}</p>
          <p><strong>${isEnglish ? 'Message' : isGerman ? 'Nachricht' : 'Повідомлення'}:</strong></p>
          <p style="background: #f0f0f0; padding: 15px; border-radius: 8px;">${message}</p>
          <hr>
          <p>${isEnglish ? 'Reply directly:' : isGerman ? 'Antworten Sie direkt:' : 'Відповісти напряму:'} <a href="mailto:${email}">${email}</a></p>
        </div>
        <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
          <p>© 2024 LANDSTARKBAU</p>
        </div>
      </div>
    `

    // ==========================================
    // 3. ВІДПРАВКА ЛИСТІВ
    // ==========================================
    await Promise.all([
      transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: customerSubject,
        html: customerHtml,
      }),
      transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.ADMIN_EMAIL || 'sitedoer99+admin@gmail.com', // ← використовуйте аліас
        replyTo: email,
        subject: adminSubject,
        html: adminHtml,
      }),
    ])

    // ==========================================
    // 4. ВІДПОВІДЬ КОРИСТУВАЧУ
    // ==========================================
    let successMessage = ''
    if (isEnglish) {
      successMessage = 'Thank you for your message! We will get back to you soon.'
    } else if (isGerman) {
      successMessage = 'Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.'
    } else if (isUkrainian) {
      successMessage = 'Дякуємо за ваше повідомлення! Ми зв\'яжемося з вами найближчим часом.'
    }

    return NextResponse.json(
      { 
        success: true, 
        message: successMessage 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}