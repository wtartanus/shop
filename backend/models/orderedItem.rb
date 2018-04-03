require_relative('./../db/sqlRunner.rb')

class OrderedItem
    attr_reader   :id
    attr_accessor :orderId, :productId, :model, :size
                 
    def initialize(options)
      @id = options['id'].to_i
      @orderId = options['orderId'].to_i
      @productId = options['productId'].to_i
      @model = options['model']
      @size = options['size']
    end
  
    def save()
      sql = "INSERT INTO orderedItems (orderId, productId, model, size)
             VALUES (#{@orderId}, #{@productId}, '#{@model}', '#{@size}') RETURNING *"
      SqlRunner.run(sql)
    end
  
    def self.find(id)
      sql = "SELECT * FROM orderedItems WHERE id = #{ id }"
      result = Category.map_item(sql)
      return result
    end
  
  
    def self.all()
      sql = "SELECT * FROM orderedItems"
      result = Category.map_items(sql)
      return result
    end

    def self.getAllAsHash()
      orderedItems = OrderedItem.all()
      result = []
      orderedItems.each { |orderedItem|
        item = {}
        orderedItem.instance_variables.each {|var| 
          item[var.to_s.delete("@")] = orderedItem.instance_variable_get(var) 
        }
        result.push(item)
      }
      return result
    end

    
    def self.update(options)
        sql = "UPDATE orderedItems SET
                orderId = #{options[:orderId]},
                productId = #{options[:productId]},
                model = '#{options[:model]}',
                size = '#{@options[:size]}',
                WHERE id = #{ options[:id] }"
        SqlRunner.run(sql)
    end
  
    def self.destroy( id )
      sql = "DELETE FROM orderedItems WHERE id = #{id}"
      SqlRunner.run(sql)
    end
  
    def self.delete_all()
      sql = "DELETE FROM orderedItems"
      SqlRunner.run(sql)
    end
  
    def self.map_items(sql)
       orderedItems = SqlRunner.run(sql)
       result = orderedItems.map { |item| OrderedItem.new(item) }
       return result
    end
  
    def self.map_item(sql)
      orderedItems = OrderedItem.map_items(sql)
      return orderedItems.first
    end
end