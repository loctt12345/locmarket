namespace shopping_api.CartService;

public class Cart {
    public Dictionary<string, CartItem> list{get; set;}

    public Cart() {
        list = new Dictionary<string, CartItem>();
    }
}