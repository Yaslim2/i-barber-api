export const smsForgotPasswordText = (verificationCode: number) => {
  return `O seu código para redefinição de senha para o app iBarber é: ${verificationCode}. Caso não tenha feito nenhuma solicitação de redefinição de senha, apenas ignore esse SMS.`;
};
