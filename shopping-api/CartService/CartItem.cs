using shopping_api.Models;

namespace shopping_api.CartService;

public class CartItem {
    public Product product {get; set;}
    public int quantity {get; set;}

    public CartItem(Product _product, int _quantity) {
        product = _product;
        quantity = _quantity;
    }
}