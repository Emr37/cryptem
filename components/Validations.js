import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup.string().email("Lütfen geçerli bir e-posta adresi giriniz.").required("Lütfen e-posta adresinizi giriniz."),
  password: yup
    .string()
    .typeError("Şifreniz harf veya rakam içermelidir.")
    .min(6, "Şifreniz en az 6 karakter olmalıdır.")
    .max(32, "Şifreniz en fazla 32 karakter olmalıdır.")
    .required("Lütfen şifrenizi giriniz."),
});
