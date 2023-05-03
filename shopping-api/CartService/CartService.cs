namespace shopping_api.CartService;
using Newtonsoft.Json;
using shopping_api.Models;

public class CartServices : ICartServices{
    
    public CartServices() {

    }

    public Cart AddToCart(HttpContext context, Product product, int quantity) {
        var session = context.Session;
        var cartString = session.GetString("CART");
        dynamic cart;
        if (cartString != null) {
            cart = JsonConvert.DeserializeObject(cartString, typeof(Cart));
        }
        else {
            cart = new Cart();
        }
        CartItem item ;
        if (!cart.list.ContainsKey(product.ProductId)) {
            item = new CartItem(product, quantity);
        }
        else {
            item = cart.list[product.ProductId];
            item.quantity += quantity;
        }
        cart.list[product.ProductId] =  item;
        string saveCart = JsonConvert.SerializeObject(cart);
        session.SetString("CART", saveCart);
        return cart;
    }

    public Cart ShowCart(HttpContext context) {
        var session = context.Session;
        
        var cartString = session.GetString("CART");
        if (cartString != null) {
            dynamic cart = JsonConvert.DeserializeObject(cartString, typeof(Cart));
            
            return cart;
        }
        else {
            return null;
        }
    }

    public Cart RemoveItem(HttpContext context, Product product) {
        var session = context.Session;
        var cartString = session.GetString("CART");
        if (cartString != null) {
            dynamic cart = JsonConvert.DeserializeObject(cartString, typeof(Cart));
            cart.list.Remove(product.ProductId);
            string saveCart = JsonConvert.SerializeObject(cart);
            session.SetString("CART", saveCart);
            return cart;
        }
        else {
            return null;
        }
    }

    public Cart UpdateItem(HttpContext context, Product product, int quantity) {
        var session = context.Session;
        var cartString = session.GetString("CART");
        dynamic cart;
        if (cartString != null) {
            cart = JsonConvert.DeserializeObject(cartString, typeof(Cart));
        }
        else {
            cart = new Cart();
        }
        CartItem item ;
        if (!cart.list.ContainsKey(product.ProductId)) {
            item = new CartItem(product, quantity);
        }
        else {
            item = cart.list[product.ProductId];
            item.quantity = quantity;
        }
        cart.list[product.ProductId] =  item;
        string saveCart = JsonConvert.SerializeObject(cart);
        session.SetString("CART", saveCart);
        return cart;
    }
}