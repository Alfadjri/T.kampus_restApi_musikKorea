const {body,param , validationResult } = require('express-validator');
const pesanKosong = "tidak boleh kosong !";
const pesanHarusString = "data harus string !";
const pesanTanggal = "data harus berupa tanggal internasional";
const pesanInteger = "data harus bertipe integer";
const optionActive = ["Yes","No"];
const pesanPilihan = "Pilihan yang anda masukan tidak terdaftar";

const validateCreateBody = [
  body("nama")
    .notEmpty().withMessage(pesanKosong).trim()
    .isString().withMessage(pesanHarusString),
  body("shot")
    .optional().trim()
    .isString().withMessage(pesanKosong),
  body("korea name")
    .notEmpty().withMessage(pesanKosong).trim()
    .isString().withMessage(pesanHarusString),
  body("debut")
    .isDate().withMessage(pesanTanggal)
    .isString().withMessage(pesanTanggal),
  body("nama company")
    .notEmpty().withMessage(pesanKosong).trim()
    .isString().withMessage(pesanHarusString),
  body("jumlah member")
    .notEmpty().withMessage(pesanKosong).trim()
    .isInt().withMessage(pesanInteger),
  body("original member")
    .notEmpty().withMessage(pesanKosong).trim()
    .isInt().withMessage(pesanInteger),
  body("funclub name")
    .optional().trim()
    .isString().withMessage(pesanHarusString),
  body("active")
    .notEmpty()
    .isIn(optionActive).withMessage(pesanPilihan),
];

const validateParam = [
  param('nama')
    .optional().trim()
    .isString().withMessage("Parameter harus berupa String"),
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
