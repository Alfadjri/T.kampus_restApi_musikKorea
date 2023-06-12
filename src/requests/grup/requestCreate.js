const {body,param , validationResult } = require('express-validator');
const pesanKosong = "tidak boleh kosong !";
const pesanHarusString = "data harus string !";
const pesanTanggal = "data harus berupa tanggal internasional";
const pesanInteger = "data harus bertipe integer";
const optionActive = ["Yes","No"];
const pesanPilihan = "Pilihan yang anda masukan tidak terdaftar";

const validateCreateBody = [
  body("nama")
    .notEmpty().withMessage(pesanKosong)
    .isString().withMessage(pesanHarusString),
  body("shot")
    .optional()
    .isString().withMessage(pesanKosong),
  body("korea name")
    .notEmpty().withMessage(pesanKosong)
    .isString().withMessage(pesanHarusString),
  body("debut")
    .isDate().withMessage(pesanTanggal)
    .isString().withMessage(pesanTanggal),
  body("nama company")
    .notEmpty().withMessage(pesanKosong)
    .isString().withMessage(pesanHarusString),
  body("jumlah member")
    .notEmpty().withMessage(pesanKosong)
    .isInt().withMessage(pesanInteger),
  body("original member")
    .notEmpty().withMessage(pesanKosong)
    .isInt().withMessage(pesanInteger),
  body("funclub name")
    .optional()
    .isString().withMessage(pesanHarusString),
  body("active")
    .notEmpty()
    .isIn(optionActive).withMessage(pesanPilihan),
];

const validateCreateParm = [
  param("nama")
    .notEmpty().withMessage(pesanKosong)
    .isString().withMessage(pesanHarusString),
  param("short")
    .optional()
    .isString().withMessage(pesanKosong),
  param("korea name")
    .notEmpty().withMessage(pesanKosong)
    .isString().withMessage(pesanHarusString),
  param("debut")
    .isDate().withMessage(pesanTanggal)
    .isString().withMessage(pesanTanggal),
  param("nama company")
    .notEmpty().withMessage(pesanKosong)
    .isString().withMessage(pesanHarusString),
  param("jumlah member")
    .notEmpty().withMessage(pesanKosong)
    .isInt().withMessage(pesanInteger),
  param("original member")
    .notEmpty().withMessage(pesanKosong)
    .isInt().withMessage(pesanInteger),
  param("fanclub name")
    .optional()
    .isString().withMessage(pesanHarusString),
  param("active")
    .notEmpty()
    .isIn(optionActive).withMessage(pesanPilihan),
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
  validateCreateParm,
  validate,
}
