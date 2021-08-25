const mongoose = require('mongoose');
const sauceInfoRegex = /^[A-Z][A-Za-z\é\è\ê\ï\-]+$/;

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { 
        type: String,
        validate: {
            validator: function(v) {
              return sauceInfoRegex.test(v);
            },
            message: props => `${props.value} n'est pas un nom valide`
        },
        required: true },
    manufacturer: {
        type: String,
        validate: {
            validator: function(v) {
              return sauceInfoRegex.test(v);
            },
            message: props => `${props.value} n'est pas un nom de fabricant valide`
        },
        required: true },
    description: {
        type: String,
        validate: {
            validator: function(v) {
              return sauceInfoRegex.test(v);
            },
            message: props => `Vérifier que la description ne comporte pas de caractère spéciaux hormis "," et "."`
        },
        required: true },
    mainPepper: {
        type: String,
        validate: {
            validator: function(v) {
              return sauceInfoRegex.test(v);
            },
            message: props => `${props.value} n'est pas un nom d'ingrédient valide`
        },
        required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number },
    dislikes: { type: Number },
    usersLiked: { type: Array },
    usersDisliked: { type: Array },
});

module.exports = mongoose.model('Sauce', sauceSchema);



