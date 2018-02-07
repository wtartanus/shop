require_relative('./../db/sqlRunner.rb')

class Discountinued
    attr_reader   :id, :item
    attr_accessor :discountinued, :date
                 
    def initialize(options)
      @id = options['id'].to_i
      @item = options['item']
      @discountinued = options['discountinued'] == "true" ? true : false 
      @date = options['date']
    end
  
    def save()
      sql = "INSERT INTO discontinued (item, discountinued, date)
             VALUES ('#{@item}', '#{@discountinued}', '#{@date}')"
      SqlRunner.run( sql )
    end
  
    def self.find( id )
      sql = "SELECT * FROM discountinued WHERE id = #{ id }"
      result = Discountinued.map_item( sql )
      return result
    end
  
  
    def self.all()
      sql = "SELECT * FROM discontinued"
      result = Discountinued.map_items( sql )
      return result
    end

    def self.getAllAsHash()
      items = Discountinued.all()
      result = []
      items.each { |dis|
        item = {}
        dis.instance_variables.each {|var| 
          item[var.to_s.delete("@")] = dis.instance_variable_get(var) 
        }
        result.push(item)
      }
      return result
    end

    
    def self.update( options )
        sql = "UPDATE discountinued SET
                item = '#{options[:item]}',
                discountinued = '#{options[:discountinued]}',
                date = '#{options[:date]}',
                WHERE id = #{ options[:id] }"
        SqlRunner.run( sql )
    end
  
    def self.destroy( id )
      sql = "DELETE FROM discountinued WHERE id = #{id}"
      SqlRunner.run( sql )
    end
  
    def self.delete_all()
      sql = "DELETE FROM discountinued"
      SqlRunner.run( sql )
    end
  
    def self.map_items( sql )
        discountinueds = SqlRunner.run( sql )
       result = discountinueds.map { |discountinued| Discountinued.new( discountinued ) }
       return result
    end
  
    def self.map_item( sql )
        discountinueds = Discountinued.map_items( sql )
      return discountinueds.first
    end
end