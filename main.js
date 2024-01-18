let users =[]

function register() {
    // khai báo DOM lấy dữ liệu nhập vào
    let fname_input = document.getElementById('fname-input').value 
    let lname_input = document.getElementById('lname-input').value
    let email_input = document.getElementById('email-input').value 
    let password_input = document.getElementById('password-input').value

    // tạo object chứa dữ liệu nhập vào
    let user = {
        fname: fname_input,
        lname: lname_input,
        email: email_input,
        password: password_input
    }
// push object user vao trong arrray
users.push(user)

    // chuyển đổi object user thành JSON string và lưu lên Local Storage
    localStorage.setItem("users", JSON.stringify(users))

    // xoa thong tin khi dang nhap
document.getElementById('fname-input').value = ''
document.getElementById('lname-input').value  = ''
document.getElementById('email-input').value  = ''
document.getElementById('password-input').value  = ''
}

function checkInputValue(value1,value2){
if(value1==value2){
    return true
}
    return false
}

function login(){
    let email_input = document.getElementById('login-email-input').value
    let password_input = document.getElementById('login-password-input').value
    let userStorange = JSON.parse(localStorage.getItem('users'))

    for(let i= 0; i< userStorange.length;i++){
        if(checkInputValue(email_input, userStorange[i].email)){
            if(checkInputValue(password_input, userStorange[i].password)) {
                alert('Login successfully!')
                return
            } else{
                alert('wrong password!')
                return
            }
        } else{
            alert('user is not existed!')
        }
    }
}       


init()

function init() {
    getProductAPI()
}

// fetch API
async function getProductAPI(){
    let data = await fetch('data.json')
    .then(response => response.json()) // lay du lieu tu fetch ('link gi do') luu vao data
    .then(json => json)  // chuyen reponse thanh json 
                        // sao do doi thanh array/object sau do luu vao bien dat
    console.log(data)
    loadProducts(data)
}

let product_area = document.getElementById("product-area")



// data[i].productName

function loadProducts(data){
    for(let i = 0; i < data.length; i++){
        let output = ` <div class="product col-3">
            <h2 class="product-title">${data[i].name}</h2>
            <img src="${data[i].image}" alt="" class="product-img">
            <div class="product-footer">
                <h5><span class="product-price">${data[i].premiere}</span></h3>
                <button class="product-btn" onclick="addProduct(event)">Details!</button>
            </div>
        </div> `
        product_area.innerHTML += output
    }
}

function searchProduct(){
    let search_input = document.getElementById("searchbar").value
    search_input = search_input.toUpperCase()
    let product_title = document.getElementsByClassName("product-title") // array
    let products = document.getElementsByClassName("product")

    for( let i = 0; i < products.length; i++){
        // nếu như trong tên product mà có chữ nhập vào từ search input thì thẻ product hiện lên
        if(product_title[i].innerText.includes(search_input)){
            products[i].style.display = 'block'
        } 
        // nếu ko thì ẩn thẻ product đi
        else {
            products[i].style.display = 'none'
        }
    }
}