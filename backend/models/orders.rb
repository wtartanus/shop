require_relative('./../db/sqlRunner.rb')

class Order
    attr_reader   :id
    attr_accessor :referenceNumber, :dateOrdered, :totalCost, :totalPersonalCost, :ordered, :email, :fullName, :adres, :city, :postcode, :deliveryType
                 
    def initialize(options)
      puts('initialize')
      @id = options['id'].to_i
      @referenceNumber = options['referenceNumber']
      @dateOrdered = options['dateOrdered']
      @totalCost = options['totalCost'].to_f
      @totalPersonalCost = options['totalPersonalCost']
      @ordered = options['ordered'] == "true" ? true : false
      @email = options['email']
      @fullName = options['fullName']
      @adres = options['adres']
      @city = options['city']
      @postcode = options['postcode']
      @deliveryType = options['deliveryType']
    end
  
    def save()
      sql = "INSERT INTO orders (referenceNumber, dateOrdered, totalCost, totalPersonalCost, ordered, email, fullName, adres, city, postcode, deliveryType)
             VALUES ('#{@referenceNumber}', '#{@dateOrdered}', #{@totalCost}, #{@totalPersonalCost}, '#{@ordered}', '#{@email}', '#{@fullName}', '#{@adres}', '#{@city}', '#{@postcode}', '#{@deliveryType}') RETURNING *"
      SqlRunner.run(sql)
    end
  
    def self.find(id)
      sql = "SELECT * FROM orders WHERE id = #{id}"
      result = Order.map_item(sql)
      return result
    end
  
  
    def self.all()
      sql = "SELECT * FROM orders"
      result = Order.map_items(sql)
      return result
    end

    def self.getAllAsHash()
      orders = Order.all()
      result = []
      orders.each { |order|
        item = {}
        order.instance_variables.each {|var| 
          item[var.to_s.delete("@")] = order.instance_variable_get(var) 
        }
        result.push(item)
      }
      return result
    end

    
    def self.update(options)
        sql = "UPDATE orders SET
                referenceNumber = '#{options[:referenceNumber]}',
                dateOrdered = '#{options[:dateOrdered]}',
                totalCost = #{options[:totalCost]},
                totalPersonalCost = #{@options[:totalPersonalCost]},
                ordered = '#{@options[:ordered]}',
                email = '#{@options[:email]}',
                fullName = '#{@options[:fullName]}',
                adres = '#{@options[:adres]}',
                city = '#{@options[:city]}',
                postcode = '#{@postcode[:postcode]}',
                deliveryType = '#{@deliveryType[:deliveryType]}'
                WHERE id = #{ options[:id] }"
        SqlRunner.run(sql)
    end
  
    def self.destroy(id)
      sql = "DELETE FROM orders WHERE id = #{id}"
      SqlRunner.run(sql)
    end
  
    def self.delete_all()
      sql = "DELETE FROM orders"
      SqlRunner.run(sql)
    end
  
    def self.map_items(sql)
       orders = SqlRunner.run(sql)
       result = Orders.map { |order| Order.new(order) }
       return result
    end
  
    def self.map_item(sql)
      orders = Order.map_items(sql)
      return orders.first
    end
end