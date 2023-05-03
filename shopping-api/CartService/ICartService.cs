namespace shopping_api.CartService;
using shopping_api.Models;


public interface ICartServices {
    public Cart AddToCart(HttpContext context, Product product, int quantity);
    public Cart ShowCart(HttpContext context);
    public Cart RemoveItem(HttpContext context, Product product);
    public Cart UpdateItem(HttpContext context, Product product, int quantity);
}