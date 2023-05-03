using Microsoft.AspNetCore.Mvc;
using shopping_api.Repository;
using shopping_api.Models;
using Microsoft.EntityFrameworkCore;


namespace shopping_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly ILogger<ProductController> _logger;
    private readonly RepositoryBase<Product> _productRepo;
    private readonly RepositoryBase<Category> _categoryRepo;

    public ProductController(ILogger<ProductController> logger,
                             RepositoryBase<Product> productRepo,
                             RepositoryBase<Category> categoryRepo)
    {
        _logger = logger;
        _productRepo = productRepo;
        _categoryRepo = categoryRepo;
    }

    [HttpGet]
    public IActionResult Get(string q = "", string categoryId = "")
    {
        dynamic list;
        if (categoryId.Length > 0) {
            list =  _productRepo.GetAll().Include(p=>p.Category)
            .Where(p => p.Name.Contains(q)
             && p.CategoryId.Equals(categoryId)).ToList();
        } else {
            list = _productRepo.GetAll().Include(p=>p.Category).Where(product => product.Name.Contains(q)).ToList();
        }
        return Ok(list);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(string id) 
    {
        var product = _productRepo.GetAll().Include(p=>p.Category)
            .Where(p=>p.ProductId.Equals(id))
            .FirstOrDefault();
        return Ok(product);
    }

    [HttpGet("Category")]
    public IActionResult GetCategory() 
    {
        var cateList = _categoryRepo.GetAll().ToList();
        return Ok(cateList);
    }
}
