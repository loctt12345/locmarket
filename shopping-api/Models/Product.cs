using System;
using System.Collections.Generic;

namespace shopping_api.Models;

public partial class Product
{
    public string ProductId { get; set; } = null!;

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? CategoryId { get; set; }

    public string? Image { get; set; }

    public double? SellPrice { get; set; }

    public bool? Status { get; set; }

    public virtual Category? Category { get; set; }
}
