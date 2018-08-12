require_relative('./../db/sqlRunner.rb')

class Stock
    attr_reader   :id, :productId
    attr_accessor :inStock, :size
                 
    def initialize(options)
      @id = options['id'].to_i
      @productId = options['productid'].to_i
      @inStock = options['instock'] == "t" ? true : false
      @size = options['size']
    end
  
    def save()
      sql = "INSERT INTO products (productId, inStock, size)
           VALUES (#{@productId}, '#{@inStock}', '#{@size}')"
      SqlRunner.run( sql )
    end
  
    def self.find( id )
      sql = "SELECT * FROM stocks WHERE id = #{ id }"
      result = Stock.map_item( sql )
      return result
    end
  
  
    def self.all()
      sql = "SELECT * FROM stocks"
      result = Stock.map_items( sql )
      return result
    end

    def self.getAllAsHash()
      stocks = Stock.all()
      result = []
      stocks.each { |stock|
        item = {}
        stock.instance_variables.each {|var| 
          item[var.to_s.delete("@")] = stock.instance_variable_get(var) 
        }
        result.push(item)
      }
      return result
    end

    
    def self.update( options )
        sql = "UPDATE stocks SET
        productId = #{options[:productId]},
        inStock = '#{options[:inStock]}',
        size = '#{options[:size]}',
        WHERE id = #{ options[:id] }"
        SqlRunner.run( sql )
    end
  
    def self.destroy( id )
      sql = "DELETE FROM stocks WHERE id = #{id}"
      SqlRunner.run( sql )
    end
  
    def self.delete_all()
      sql = "DELETE FROM stocks"
      SqlRunner.run( sql )
    end
  
    def self.map_items( sql )
       stocks = SqlRunner.run( sql )
       result = stocks.map { |stock| Stock.new( stock ) }
       return result
    end
  
    def self.map_item( sql )
      stocks = Stock.map_items( sql )
      return stocks.first
    end
end