const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    color: {
        type: String,
        required: true   // ✅ fixed typo: was `requred`
    }
});
categorySchema.virtual('id').get(function(){
    return this._id.toHexString();
});
categorySchema.set('toJSON',{
    virtuals:true,
});
// ✅ Correct way to create and export the model
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
exports.categorySchema=categorySchema;