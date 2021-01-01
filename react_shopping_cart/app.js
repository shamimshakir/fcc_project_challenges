const {useState, useEffect} = React;
    const productList = [
        {"id":1,"productName":"Soup - Campbells, Classic Chix","price":7,"image":"https://images-na.ssl-images-amazon.com/images/I/81bH450BOlL._AC_SL1500_.jpg"},
        {"id":2,"productName":"Soup - Campbells, Lentil","price":17,"image":"https://images.heb.com/is/image/HEBGrocery/001060610"},
        {"id":3,"productName":"Devonshire Cream","price":15,"image":"https://upload.wikimedia.org/wikipedia/commons/b/bf/Clotted_cream_%28cropped%29.JPG"},
        {"id":4,"productName":"Bread - Bagels, Plain","price":38,"image":"https://www.tasteofhome.com/wp-content/uploads/2018/01/Homemade-Bagels_EXPS_BMZ19_15702_E11_30_11b-1-696x696.jpg"},
        {"id":5,"productName":"Cheese - Brie,danish","price":71,"image":"https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/f12463d2-df0a-4e35-9ffa-adca59b7f4cc_425x425.jpg"},
        {"id":6,"productName":"Soup - Campbells Beef Strogonoff","price":47,"image":"https://images-na.ssl-images-amazon.com/images/I/91mrr4qH%2BcL._SX466_.jpg"},
        {"id":7,"productName":"Bananas","price":24,"image":"https://images.immediate.co.uk/production/volatile/sites/30/2017/01/Bananas-218094b-scaled.jpg?quality=90&resize=960%2C872"},
        {"id":8,"productName":"Muffin Batt - Ban Dream Zero","price":65,"image":"https://www.onceuponachef.com/images/2015/05/Strawberry-Muffins-19.jpg"},
        {"id":9,"productName":"Roe - Flying Fish","price":14,"image":"https://images-na.ssl-images-amazon.com/images/I/71M3wiKwpJL._SL1000_.jpg"},
        {"id":10,"productName":"Corn - On The Cob","price":45,"image":"https://www.jessicagavin.com/wp-content/uploads/2019/05/how-to-cook-corn-on-the-cob-8-1200.jpg"}
    ];
    function Header({cartItemCount, setShowCart}){
        return <header>
            <div className="AppWrapper">
                <div className="header">
                    <div className="logo">
                        <h3>Shopping Cart</h3>
                    </div>
                    <div className="cartSection">
                        <div className="cart" onClick={() => setShowCart(true)}>
                            <span>
                                <i className="fas fa-cart-plus"></i> Cart
                                {cartItemCount !== 0 && <span className="cartItem">{cartItemCount}</span>}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    }
    function CartItems(props){
        const {
            showCart,
            setShowCart,
            setCartItem,
            cartItems,
            products,
            cartTotal,
            setCartTotal,
            getCartTotal,
            cartItemCount,
            setCartItemCount
        } = props;
        const removeCartItem = (id) => {
            let newCartItems = cartItems.filter(item => item.id !== id);
            setCartItem(() => [...newCartItems]);
            setCartItemCount(() => cartItemCount - 1)
        }
        const updateCartItemQty = (e, id) => {
            let item = cartItems.find(item => item.id === id);
            item.qty = Number(e.target.value);
            setCartItem(() => [...cartItems])
        }

        useEffect(() => {
            let total = getCartTotal();
            setCartTotal(() => total);
        }, [cartItems]);

        return <div id="cart" className={showCart ? 'activeCart' : ''}>
            <span className="closeCart" onClick={() => setShowCart(false)}>
                <i className="fas fa-times"></i>
            </span>
            <h3>Cart Items</h3>

            <div className="cartItems">
                {cartItems.map(cartItem => {
                    let product = products.find(product => product.id == cartItem.id)
                    return <div className="singleCartItem" key={product.id}>
                        <div className="topRow">
                            <div className="cartItemImg">
                                <img src={product.image} alt=""/>
                            </div>
                            <div className="priceNQty">
                                <span>{cartItem.qty} &times; {product.price}</span>
                                <input type="number" onClick={(e) => updateCartItemQty(e, product.id)} defaultValue={cartItem.qty} min="1" />
                            </div>
                        </div>
                        <div className="cartItemPrName">{product.productName}</div>
                        <div className="removeFromCart" onClick={() => removeCartItem(product.id)}><i className="fas fa-times"></i></div>
                    </div>
                })}
                { cartItemCount && <p className="cartTotal">
                    <span>Total</span>
                    <span>{cartTotal}</span>
                </p>}
                {!cartItemCount && <p>Your cart is empty</p>}
            </div>
        </div>
    }
    function Product(props){
        const {
            product,
            cartItemCount,
            setCartItemCount,
            setCartItem,
            cartItems
        } = props;
        const addToCart = (id) => {
            setCartItemCount(cartItemCount+1);
            let newCartItems = [...cartItems, {id, qty:1}];
            setCartItem(newCartItems);
        }
        const checkInCart = (id) => {
            return cartItems.some(item => item.id === id);
        }
        let button;
        if(checkInCart(product.id)){
            button = <button className="addedCart">added to cart</button>
        }else{
            button = <button onClick={() => addToCart(product.id)}>
                <i className="fas fa-shopping-cart"></i>Add to cart
            </button>
        }
        return <div className="product">
            <div className="productImg">
                <img src={product.image} alt=""/>
            </div>
            <div className="productTitle">{product.productName}</div>
            <div className="priceNcart">
                <p className="price">$ {product.price}</p>
                {button}
            </div>
        </div>
    }
    function Products(){
        const [products, setProducts] = useState(productList);
        const [cartItemCount, setCartItemCount] = useState(0);
        const [cartItems, setCartItem] = useState([]);
        const [showCart, setShowCart] = useState(false);
        const [cartTotal, setCartTotal] = useState(0);
        const getCartTotal = () => {
            let total = cartItems.reduce((acc, item) => {
                let product = products.find(product => product.id == item.id);
                let total = product.price * item.qty;
                return acc + total;
            }, 0);
            return total;
        }
        useEffect(() => {
            let total = getCartTotal();
            setCartTotal(() => total);
        }, [cartItems]);

        return <div className="app">
            <Header
                cartItemCount = {cartItemCount}
                setShowCart={setShowCart}
            />
            <CartItems
                setShowCart={setShowCart}
                showCart={showCart}
                cartItems={cartItems}
                setCartItem={setCartItem}
                products={products}
                cartTotal={cartTotal}
                setCartTotal={setCartTotal}
                setCartItemCount={setCartItemCount}
                cartItemCount={cartItemCount}
                getCartTotal={getCartTotal}
            />
            <div className="AppWrapper mainTopMargin">
                <h2 className="sectionTtile">Products</h2>
                <div className="allProducts">
                    {products.map(product => {
                        return <Product
                            key={product.id}
                            product={product}
                            cartItemCount={cartItemCount}
                            setCartItemCount={setCartItemCount}
                            setCartItem={setCartItem}
                            cartItems={cartItems}
                        />
                    })}
                </div>
            </div>
        </div>
    }
    ReactDOM.render(<Products/>, document.getElementById('root'));
