using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using shopping_api.Models;

namespace shopping_api.Repository
{
    public class RepositoryBase<T> where T:class
    {
        private LocMarketContext _context;
        private DbSet<T> _dbSet;

        public RepositoryBase(LocMarketContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public void Create(T entity)
        {
            _dbSet.Add(entity);
            _context.SaveChanges();
        }

        public DbSet<T> GetAll()
        {
            return _dbSet;
        }

        public void Update(T entity)
        {
            var tracker = _context.Attach(entity);
            tracker.State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Remove(T entity)
        {
            _dbSet.Remove(entity);
            _context.SaveChanges();
        }

        public T GetById(String id)
        {
            return _dbSet.Find(id);
        }
    }
}
