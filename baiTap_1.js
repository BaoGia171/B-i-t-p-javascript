// XỬ LÝ ĐƠN HÀNG VÀ TỒN KHO

// Cho danh sách tồn kho và các đơn hàng xử lý theo thứ tự.
// Một đơn chỉ được chấp nhận khi TẤT CẢ sản phẩm trong đơn còn đủ.
// Nếu thiếu bất kỳ sản phẩm nào, từ chối toàn bộ đơn và không trừ kho.

// Yêu cầu:
// - Một đơn có thể chứa cùng một sku (mã sản phẩm) nhiều lần; phải cộng dồn trước khi kiểm tra.
// - quantity phải là số nguyên dương.
// - Không làm thay đổi inventory và orders ban đầu.
// - Trả về tồn kho còn lại, id đơn thành công và id đơn bị từ chối.
// kết quả mong đợi
//  {
//    remainingInventory: { A: 3, B: 2, C: 6 },
//    acceptedOrderIds: ["DH01", "DH03"],
//    rejectedOrderIds: ["DH02"]
//  }

// inventory = hàng tồn kho.

const inventory = {
    A: 10,
    B: 5,
    C: 8
};

const orders = [
    {
        id: "DH01",
        items: [
            { sku: "A", quantity: 2 },
            { sku: "B", quantity: 3 },
            { sku: "C", quantity: 2.5 }
        ]
    }
];
function xuLyDonHang(inventory , orders){
  let tonKhoConLai = {...inventory}
  let accept =[]
  let rejected =[]
  for(let i=0 ;i<orders.length;i++){
    let order = orders[i]
    let gomNhom ={}
    let duDieuKien = true
    for(let j=0 ;j<order.items.length;j++){
      let item = order.items[j]
      if(Number.isInteger(item.quantity) && item.quantity > 0 ){
          if(gomNhom[item.sku] === undefined){
        gomNhom[item.sku] = item.quantity
    }
    else{
        gomNhom[item.sku] += item.quantity
    }
      }
      else{
        duDieuKien = false
      }

    }

    const danhSachSku = Object.keys(gomNhom)
    for(let k =0 ;k< danhSachSku.length ;k++){
        let sku = danhSachSku[k]
        if(gomNhom[sku]  > tonKhoConLai[sku]){
            duDieuKien = false
        }
    }
    if(duDieuKien == true){
            accept.push(order.id)
            for(let l =0 ; l<danhSachSku.length;l++){
                let sku = danhSachSku[l]
                tonKhoConLai[sku] -= gomNhom[sku]
            }
        }
        else{
            rejected.push(order.id)
        }
    console.log(gomNhom)
  }
  return {tonKhoConLai , accept , rejected}
//   return { remainingInventory: tonKhoConLai, acceptedOrderIds: accept, rejectedOrderIds: rejected }
}
console.log(xuLyDonHang(inventory , orders))