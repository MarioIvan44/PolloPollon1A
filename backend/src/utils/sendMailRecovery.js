const HTMLRecoveryEmail = (code) => {
  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recupera tu acceso a PolloPollon</title>
  </head>
  <body style="margin:0; padding:0; background-color: #f8fafc; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; padding: 40px 10px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width: 550px; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #edf2f7;" cellspacing="0" cellpadding="0" border="0">
            
            <tr>
              <td style="background: linear-gradient(135deg, #FF5F6D 0%, #FFC371 100%); padding: 40px 20px; text-align: center;">
                <div style="background: rgba(255, 255, 255, 0.2); width: 60px; height: 60px; border-radius: 18px; margin: 0 auto 15px; line-height: 60px; font-size: 30px;">
                  🍗
                </div>
                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">PolloPollon</h1>
                <p style="margin: 5px 0 0; color: #ffffff; opacity: 0.9; font-size: 15px; font-weight: 400;">Seguridad de la cuenta</p>
              </td>
            </tr>

            <tr>
              <td style="padding: 40px 35px;">
                <h2 style="margin: 0 0 15px; color: #1a202c; font-size: 22px; font-weight: 700;">¿Olvidaste tu contraseña?</h2>
                <p style="margin: 0 0 25px; color: #4a5568; line-height: 1.6; font-size: 16px;">
                  No te preocupes, nos pasa a todos. Para volver a tu cuenta, usa el código de seguridad que aparece a continuación.
                </p>

                <div style="background-color: #f7fafc; border: 2px dashed #e2e8f0; border-radius: 16px; padding: 30px; text-align: center; margin-bottom: 30px;">
                  <span style="display: block; color: #718096; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Tu código de verificación</span>
                  <div style="font-family: 'Monaco', 'Consolas', monospace; font-size: 36px; font-weight: 800; color: #2d3748; letter-spacing: 8px; margin-bottom: 5px;">
                    ${code}
                  </div>
                </div>

                <div style="text-align: center; margin-bottom: 30px;">
                  <a href="#" style="background-color: #2d3748; color: #ffffff; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block; transition: background-color 0.3s;">
                    Ingresar Código Ahora
                  </a>
                </div>

                <div style="border-top: 1px solid #edf2f7; padding-top: 25px;">
                  <p style="margin: 0; color: #718096; font-size: 13px; line-height: 1.5;">
                    <strong>Nota:</strong> Este código vencerá en <span style="color: #FF5F6D; font-weight: 600;">15 minutos</span> por seguridad. Si tú no solicitaste esto, simplemente ignora este correo.
                  </p>
                </div>
              </td>
            </tr>

            <tr>
              <td style="background-color: #f8fafc; padding: 25px 35px; text-align: center; border-top: 1px solid #edf2f7;">
                <p style="margin: 0; color: #a0aec0; font-size: 12px; font-weight: 500;">
                  © 2024 PolloPollon S.A. • La mejor comida en un solo lugar
                </p>
                <div style="margin-top: 10px;">
                  <a href="#" style="color: #a0aec0; text-decoration: underline; font-size: 12px;">Ayuda</a> 
                  <span style="color: #cbd5e0; margin: 0 8px;">•</span>
                  <a href="#" style="color: #a0aec0; text-decoration: underline; font-size: 12px;">Privacidad</a>
                </div>
              </td>
            </tr>
          </table>
          
          <table role="presentation" width="100%" style="max-width: 550px;" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="padding: 20px; text-align: center; color: #cbd5e0; font-size: 11px;">
                Recibiste este correo porque se solicitó un cambio de contraseña en tu cuenta. Si crees que es un error, contacta a soporte@pollopollon.com
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};

export default HTMLRecoveryEmail;