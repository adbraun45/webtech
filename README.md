initLS();
let productList = getProducts();
productsToJSON(productList);

function getProducts() {
	var allIT = document.getElementById('1528800506360-afe4488a-8066');
	var products = allIT.getElementsByClassName('products ')[0];
	var children = products.children;
	return children;
};

function productsToJSON(p) {
	for(var i=0; i<p.length; i++) {
		//get name
		curr = p[i].getElementsByClassName('desc')[0];
		console.log(curr.nextch);
		break;
		//get get price
		//console.log(i)
		//console.log(p[i]);
	}
};

function initLS() {
	const ls = window.localStorage;
	if (!ls.hasOwnProperty("product info")) {
		ls.setItem('product info', JSON.stringify(
			{
				"product list": []
			}
		));
	}
	if (!ls.hasOwnProperty("products")) {
		ls.setItem('products', 0)
	}
};

