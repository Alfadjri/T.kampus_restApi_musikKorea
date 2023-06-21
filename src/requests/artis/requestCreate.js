const {body,param , validationResult } = require('express-validator');
const pesanKosong = "tidak boleh kosong !";
const pesanHarusString = "data harus string !";
const pesanTanggal = "data harus berupa tanggal internasional";
const pesanInteger = "data harus bertipe integer";
const optionActive = ["M","F"];
const pesanPilihan = "Pilihan yang anda masukan tidak terdaftar";

const validateCreateBody = [
  body("s_name")
    .notEmpty().withMessage(pesanKosong).trim()
    .isString().withMessage(pesanHarusString),
  body("f_name")
    .notEmpty().withMessage(pesanKosong).trim()
    .isString().withMessage(pesanHarusString),
  body("k_name")
    .notEmpty().withMessage(pesanKosong).trim()
    .isString().withMessage(pesanHarusString),
  body("k_name")
    .notEmpty().withMessage(pesanKosong).trim()
    .isString().withMessage(pesanHarusString),
  body("k_s_name")
    .notEmpty().withMessage(pesanKosong).trim()
    .isString().withMessage(pesanHarusString),
  body("birth")
    .isDate().withMessage(pesanTanggal).trim()
    .isString().withMessage(pesanHarusString),
  body("negara")
    .notEmpty().withMessage(pesanKosong).trim()
    .isString().withMessage(pesanHarusString),
  body("gender")
    .notEmpty().withMessage(pesanKosong).trim()
    .isIn(optionActive).withMessage(pesanPilihan),
  body("kota")
    .optional().trim()
    .isString().withMessage(pesanHarusString),
];
const validateParam= [
  body("nama")
    .optional()
    .isString().withMessage(pesanHarusString),
];

const formatErrors = ({ msg, path }) => ({[path]: msg });

const myValidationResult = validationResult.withDefaults({
  formatter: formatErrors,
});

const validate = (req, res, next) => {
  const errors = myValidationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors : errors.array({onlyFirstError: true})});
  }
  next();
};

module.exports = {
  validateCreateBody,
  validateParam,
  validate,
}
