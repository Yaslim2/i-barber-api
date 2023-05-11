export const smsRedefineEmailText = (verificationCode: number) => {
  return `O seu código para redefinição de email para o app iBarber é: ${verificationCode}. Caso não tenha feito nenhuma solicitação de redefinição de email, apenas ignore esse SMS.`;
};
