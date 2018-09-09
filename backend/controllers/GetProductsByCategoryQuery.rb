require_relative('./../db/sqlRunner.rb')
require_relative('../models/product.rb')

class GetProductsByCategoryQuery
    
    attr_reader :category, :products, :stock
                 
    def initialize(category)
      @category = category
    end

    def run()
      self.initializeData()
    end

    def self.initializeData()
      self.products = Product.getProductsByCategoryName(self.category)
    end
  
    def self.find()
      return Product.getProductsByCategoryName(self.category)
    end
  
  
    def self.all()
      sql = "SELECT * FROM categories"
      result = Category.map_items( sql )
      return result
    end

    def self.getAllAsHash()
      categories = Category.all()
      result = []
      categories.each { |category|
        item = {}
        category.instance_variables.each {|var| 
          item[var.to_s.delete("@")] = category.instance_variable_get(var) 
        }
        result.push(item)
      }
      return result
    end

    
    def self.update( options )
        sql = "UPDATE categories SET
                catergoryId = #{options[:categoryId]},
                parentId = #{options[:parentId]},
                name = '#{options[:name]}',
                image = '#{@options[image]}',
                WHERE id = #{ options[:id] }"
        SqlRunner.run( sql )
    end
  
    def self.destroy( id )
      sql = "DELETE FROM categories WHERE id = #{id}"
      SqlRunner.run( sql )
    end
  
    def self.delete_all()
      sql = "DELETE FROM categories"
      SqlRunner.run( sql )
    end
  
    def self.map_items( sql )
       categories = SqlRunner.run( sql )
       result = categories.map { |category| Category.new( category ) }
       return result
    end
  
    def self.map_item( sql )
      categories = Category.map_items( sql )
      return categories.first
    end
end