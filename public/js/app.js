fetch("/api/products")

.then(res=>res.json())

.then(data=>{

let container = document.getElementById("products")

data.forEach(product=>{

container.innerHTML += `

<div class="product">

<h3>${product.name}</h3>

<p>R$${product.price}</p>

<button>Comprar</button>

</div>

`

})

})
