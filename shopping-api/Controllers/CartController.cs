using Microsoft.AspNetCore.Mvc;
using shopping_api.Repository;
using shopping_api.Models;
using shopping_api.CartService;

namespace shopping_api.Cart;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase 
{
    private readonly ILogger<CartController> _logger;
    private readonly RepositoryBase<Product> _productRepo;

    private readonly ICartServices _cartService;


    public CartController(ILogger<CartController> logger, 
                            RepositoryBase<Product> productRepo,
                            ICartServices cartService) {
        _logger = logger;
        _productRepo = productRepo;
        _cartService = cartService;
    }

    [HttpPost("{id}/{quantity}")]
    public IActionResult AddToCart (string id, int quantity) 
    {
        if (id == null) {
            return BadRequest();
        }
        var product = _productRepo.GetById(id);
        if (product == null) {
            return BadRequest();
        }
        var cart = _cartService.AddToCart(HttpContext, product, quantity);
        return Ok(cart.list.Values.ToList());
    }

    [HttpGet]
    public IActionResult ShowCart() {
        var cart = _cartService.ShowCart(HttpContext);
        if (cart == null) return BadRequest("Cart is null!!!");
        return Ok(cart.list.Values.ToList());
    }

    [HttpDelete("{id}")]
    public IActionResult RemoveItem(string id) {
        var product = _productRepo.GetById(id);
        var cart = _cartService.RemoveItem(HttpContext, product);
        if (cart == null) {
            return BadRequest("Cart is null!!!");
        }
        return Ok(cart.list.Values.ToList());
    }

    [HttpPut("{id}/{quantity}")]
    public IActionResult UpdateItem(string id, int quantity) {
        var product = _productRepo.GetById(id);
        var cart = _cartService.UpdateItem(HttpContext, product, quantity);
        return Ok(cart.list.Values.ToList());
    }

}   