const express = require('express'); 
const { param } = require('express-validator');



const { postCategory } = require('../controllers/categoryController');
const { getCategories } = require('../controllers/categoryController');
const { getCategory } = require('../controllers/categoryController');
const { updateCategory } = require('../controllers/categoryController');
const { deleteCategory } = require('../controllers/categoryController');
const { validationResult } = require('express-validator');

const router = express.Router();

router.post('/' ,postCategory);

router.get('/' ,getCategories);

// router.get('/:id' ,getCategory);

// router.get(param('id').isMongoId().withMessage('invailed category id'),
// (req,res) =>{

//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors: errors.array()});
//     }
// },
// getCategory);


router.get(
    '/:id',
    param('id').isMongoId().withMessage('Invalid category ID'),
    (req, res) => {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      // If no errors, proceed with the response
      res.send('Valid category ID');
    }
  );

router.put('/:id' ,updateCategory);

router.delete('/:id' ,deleteCategory);



module.exports = router;





