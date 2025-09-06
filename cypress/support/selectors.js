export const SELECTORS = {
    loginPage:{
        alert: "#alert",
        emailField: "#email",
        passwordField: "#password"
    },
    myListingsPage:{
        name: "#id_name",
        description: "#id_description",
        price: "#id_price",
        expiry: "#id_expiry",
        discount: "#id_discount_price",
        saveButton: "[type='submit']",
        productCard: ".relative.mx-auto.my-6.w-full.max-w-xs.flex-col.overflow-hidden.rounded-lg.bg-white.shadow-md"
    },
    shopPage:{
        productName: ".text-xl.font-semibold.tracking-tight.h-16.text-slate-900",
        greenCartLogo: "[alt='GreenCart Logo']"
    },
    cartPage:{
        cartItem: ".flex.items-center.-mx-8.px-6.py-5",
        quantityField: "[name='quantity']",
        itemPrices: ".text-center.font-semibold.text-md.text-gray-600", //same class for both price and total values for each item
        itemName: ".font-bold.text-md.text-gray-600",
    }
}
