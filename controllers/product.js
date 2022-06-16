const Product = require("../models/product");
//add product
exports.newProduct = (req, res) => {

    if (req.body) {
        const product = new Product({
            NameProduct: req.body.NameProduct,
            NumberProduct: req.body.NumberProduct,
            DateProduct: req.body.DateProduct,
            UnitPrice: req.body.UnitPrice,
            SellPrice: req.body.SellPrice,
            Color: req.body.Color,
            Size: req.body.Size,
            Description: req.body.Description,
        });

        product.save().then(() => {
                res.redirect('/product');
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
// get a getProduct
exports.getProduct = (req, res) => {
    if (req.params.productId) {
        Product.find({ _id: req.params.productId })
            .then((value) => {
                res.send(value[0]);
            })
            .catch(() => {
                res.send();
            });
    }
};
// get all user
exports.getAllproduct = (req, res) => {
    Product.find()
        .then((value) => {
            res.send(value);
        })
        .catch(() => {
            res.send();
        });
};
//delate product
exports.deleteProduct = (req, res) => {
    if (req.params.productId) {
        Product.findByIdAndDelete({ _id: req.params.productId })
            .then(() => {
                res.send(true);
            })
            .catch(() => {
                res.send(false);
            });
    }
};
//edit product
exports.editProduct = (req, res) => {
    if (req.params.productId) {
        Product.findByIdAndUpdate(req.params.productId).then((value) => {
            value.NameProduct = req.body.NameProduct;
            value.NumberProduct = req.body.NumberProduct;
            value.DateProduct = req.body.DateProduct;
            value.UnitPrice = req.body.UnitPrice;
            value.SellPrice = req.body.SellPrice;
            value.Color = req.body.Color;
            value.Size = req.body.Size;
            value.Description = req.body.Description;
            res.send(true);
            return value.save();
        });
    }
};