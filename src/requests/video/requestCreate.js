const {body,param , validationResult } = require('express-validator');
const pesanKosong = "tidak boleh kosong !";
const pesanHarusString = "data harus string !";
const pesanTanggal = "data harus berupa tanggal internasional";
const pesanInteger = "data harus bertipe integer";
const optionActive = ["Solo","Grup"];
const pesanPilihan = "Pilihan yang anda masukan tidak terdaftar";



const validateCreateBody = [
  body("artis")
    .notEmpty().withMessage(pesanKosong).trim()
    .isString().withMessage(pesanHarusString),
  body("k_name")
    .notEmpty().withMessage(pesanKosong).trim()
    .isString().withMessage(pesanHarusString),
  body("relase")
    .notEmpty().withMessage(pesanKosong).trim()
    .isString().withMessage(pesanHarusString),
  body("song")
    .notEmpty().withMessage(pesanKosong).trim()
    .isString().withMessage(pesanHarusString),
  body("date")
    .isDate().withMessage(pesanTanggal).trim()
    .isString().withMessage(pesanHarusString),
  body("link")
    .notEmpty().withMessage(pesanKosong).trim()
    .isString().withMessage(pesanHarusString),
  body("type")
    .notEmpty().withMessage(pesanKosong).trim()
    .isIn(optionActive).withMessage(pesanPilihan),
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
