const FoodImageMatchAlgorithm = (foodName) => {

    if(foodName == '') 
        return;

    //match rice picture
    if(foodName.toLowerCase().indexOf("rice") > -1) {

        return require("../assets/images/moimoi_rice.jpeg");

    }else if(foodName.toLowerCase().indexOf("amala") > -1) {

        return require("../assets/images/amala.jpeg");

    }else if(foodName.toLowerCase().indexOf("spaghetti") > -1) {

        return require("../assets/images/noodles.jpg");
    }
    else if(foodName.toLowerCase().indexOf("Ofada") > -1) {

        return require("../assets/images/ofada_rice.jpeg");
    }
    else if(foodName.toLowerCase().indexOf("yam") > -1) {

        return require("../assets/images/yam_egg.jpeg");

    }else if(foodName.toLowerCase().indexOf("semo") > -1) {

        return require("../assets/images/semo_food.jpeg");
    }
    else if(foodName.toLowerCase().indexOf("spagetti") > -1) {

        return require("../assets/images/spagheti.jpeg");

    }
    else if(foodName.toLowerCase().indexOf("white") > -1) {

        return require("../assets/images/white_rice.jpeg");

    }else if(foodName.toLowerCase().indexOf("egusi") > -1) {

        return require("../assets/images/egusi.jpeg");
    }
    else if(foodName.toLowerCase().indexOf("salad") > -1) {

        return require("../assets/images/salad.jpeg");

    }else if(foodName.toLowerCase().indexOf("pineapple") > -1) {

        return require("../assets/images/pinepiple.jpeg");
    }
    else if(foodName.toLowerCase().indexOf("pie") > -1) {

        return require("../assets/images/meatPie.jpeg");
    }
    else if(foodName.toLowerCase().indexOf("coke") > -1) {

        return require("../assets/images/coke.jpeg");
    }
    else if(foodName.toLowerCase().indexOf("mango") > -1) {

        return require("../assets/images/mango.jpeg");
    }
    else if(foodName.toLowerCase().indexOf("apple") > -1) {

        return require("../assets/images/Apple.jpeg");
    }
    else if(foodName.toLowerCase().indexOf("fanta") > -1) {

        return require("../assets/images/fanta.jpeg");
    }
    else if(foodName.toLowerCase().indexOf("aquafina") > -1) {

        return require("../assets/images/aquafina.jpeg");
    }
    else if(foodName.toLowerCase().indexOf("donut") > -1) {

        return require("../assets/images/donut.jpeg");
    }
    else{

        return require("../assets/images/blank_food.png");
    }
}

export default {
    FoodImageMatchAlgorithm,
}