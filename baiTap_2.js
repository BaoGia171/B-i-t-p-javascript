//THÊM SẢN PHẨM CÓ BIẾN THỂ VÀO GIỎ HÀNG

// Mỗi sản phẩm xe được phân biệt bởi productId + color + version.
// Khi thêm vào giỏ:
// - Nếu cùng productId, color và version: cộng dồn quantity.
// - Nếu khác màu hoặc phiên bản: tạo một dòng mới.
// - Tổng số lượng sau khi thêm không được vượt quá stock.(hàng tồn kho / nguồn hàng)
// - Dữ liệu không hợp lệ hoặc không đủ tồn kho thì giữ nguyên giỏ.
// - Không làm thay đổi mảng cart ban đầu.
// - unitPrice = basePrice + versionPrice.
// - lineTotal = unitPrice * quantity.

let cart = [
    {
        productId: "001",
        color: "Red",
        version: "Normal",
        quantity: 30,
        unitPrice: 1000,
        lineTotal: 30000,
    },
];

let cartAdd = {
    productId: "001",
    color: "Red",
    version: "Normal",
    quantity: 2,
};

let productInfo = {
    stock: 500,
    // basePrice: 4400000,
    basePrice: "anc",
    versionPrice: 5000000,
};

function themVaoGio(cart, cartAdd, productInfo) {
    if (Number.isInteger(cartAdd.quantity) && cartAdd.quantity > 0) {
        // điều kiện với số lượng
        let trungNhau = -1; // hoặc -Infinity
        for (let i = 0; i < cart.length; i++) {
            if (
                cart[i].productId == cartAdd.productId &&
                cart[i].color == cartAdd.color &&
                cart[i].version == cartAdd.version
            ) {
                trungNhau = i;
            }
        }

        let tongQuantity = 0;
        if (trungNhau !== -1) {
            //trùng nhau
            tongQuantity = cart[trungNhau].quantity + cartAdd.quantity; //cộng đồn vào (1 field)
        } else {
            // không trùng
            tongQuantity += cartAdd.quantity; // cái cũ + cái mới(2 field)
        }
        if (tongQuantity > productInfo.stock) {
            //vượt quá stock
            return cart;
        }
        if(typeof productInfo.stock === 'number' && !Number.isNaN(productInfo.stock) && typeof productInfo.basePrice === 'number' && !Number.isNaN(productInfo.basePrice) && typeof productInfo.versionPrice === 'number' && !Number.isNaN(productInfo.versionPrice)) {
            let unitPrice = productInfo.basePrice + productInfo.versionPrice;
            let newCart = cart.slice(); // ko làm thay đổi mảng ban đầu -> tạo bản sao
        if (trungNhau === -1) {
            newCart.push({
                productId: cartAdd.productId,
                color: cartAdd.color,
                version: cartAdd.version,
                quantity: cartAdd.quantity,
                unitPrice: productInfo.basePrice + productInfo.versionPrice,
                lineTotal: unitPrice * cartAdd.quantity,
            });
        }
        else { // khi có 1 dòng nào đó trùng
    newCart[trungNhau] = {
        productId: cartAdd.productId,
        color: cartAdd.color,
        version: cartAdd.version,
        quantity: tongQuantity,
        unitPrice: unitPrice,
        lineTotal: unitPrice * tongQuantity
    }
}
return newCart
        }
        else{
            return cart
        }
        

    } 
    else {
        // ko thỏa điều kiện số lượng
        return cart;
    }
}
// cộng dồn
console.log(themVaoGio(cart, cartAdd, productInfo));