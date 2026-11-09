let products = []

if (localStorage.getItem("products")) {
    products = JSON.parse(localStorage.getItem("products"))
    displayProducts()
}

userform.addEventListener('submit', (e) => {
    e.preventDefault()
    const idInput = pid.value
    const nameInput = pname.value
    const priceInput = price.value
    const quantityInput = quantity.value

    if (idInput && nameInput && priceInput !== "" && quantityInput !== "") {
        const updateindex = Update.value
        if (updateindex == "") {
            products.push({
                pid: idInput,
                pname: nameInput,
                price: Number(priceInput),
                quantity: Number(quantityInput)
            })
        } else {
            products[updateindex] = {
                pid: idInput,
                pname: nameInput,
                price: Number(priceInput),
                quantity: Number(quantityInput)
            }
        }

        localStorage.setItem("products", JSON.stringify(products))
        userform.reset()
        Update.value = ""
        displayProducts()
    } else {
        alert("Please fill the form completely")
    }
})

function displayProducts() {
    tablebody.innerHTML = ""
    let low = 0
    products.forEach((item, index) => {
        let status = ""
        if (item.quantity < 5) {
            status = `<span class="text-danger">Low Stock</span>`
            low++
        } else {
            status = `<span class="text-success">Available</span>`
        }

        tablebody.innerHTML += `
            <tr class="text-center">
                <td>${index + 1}</td>
                <td>${item.pid}</td>
                <td>${item.pname}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>${status}</td>
                <td>
                    <button onclick="updateProduct(${index})" class="btn btn-warning">Update</button>
                    <button onclick="deleteProduct(${index})" class="btn btn-danger">Delete</button>
                </td>
            </tr>
        `
    })

    total.innerHTML = products.length
    lowstock.innerHTML = low
}


function updateProduct(index) {
    const productDetails = products[index]
    pid.value = productDetails.pid
    pname.value = productDetails.pname
    price.value = productDetails.price
    quantity.value = productDetails.quantity
    Update.value = index
}

function deleteProduct(index) {
    if (confirm("Are you sure you want to delete this product?")) {
        products.splice(index, 1)
        localStorage.setItem("products", JSON.stringify(products))
        displayProducts()
    }
}