require_relative('./../db/sqlRunner.rb')

class Review
    attr_reader   :id
    attr_accessor :productId, :text, :name, :ranking
                 
    def initialize(options)
      @id = options['id'].to_i
      @productId = options['productId'].to_i
      @text = options['text'] 
      @name = options['name']
      @ranking = options['ranking'].to_i
    end
  
    def save()
      sql = "INSERT INTO reviews (productId, text, name, ranking)
             VALUES (#{@productId}, '#{@text}', '#{@name}', #{@ranking}) RETURNING *"
     review = SqlRunner.run( sql )
     return Review.mapToObjects(review)
    end
  
    def self.find( id )
      sql = "SELECT * FROM reviews WHERE id = #{ id }"
      result = Review.map_item( sql )
      return result
    end
  
  
    def self.all()
      sql = "SELECT * FROM reviews"
      result = Review.map_items( sql )
      return result
    end

    def self.getByProductId(id)
        sql = "SELECT * FROM reviews where productId = #{id}"
        result = SqlRunner.run( sql )
        return Review.mapToObjects(result)
    end

    def self.mapToObjects(list)
      result = []
      list.each{ |item|
         itemCopy = {
           :id => item['id'].to_i,
           :productId => item['productId'].to_i,
           :text => item['text'],
           :name => item['name'],
           :ranking => item['ranking'].to_i
         }
         result.push(itemCopy)
      }
      return result
    end

    
    def self.update( options )
        sql = "UPDATE reviews SET
                productId = #{options[:productId]},
                text = '#{options[:text]}',
                name = '#{options[:name]}',
                ranking = #{@options[ranking]},
                WHERE id = #{ options[:id] }"
        SqlRunner.run( sql )
    end
  
    def self.destroy( id )
      sql = "DELETE FROM reviews WHERE id = #{id}"
      SqlRunner.run( sql )
    end
  
    def self.delete_all()
      sql = "DELETE FROM reviews"
      SqlRunner.run( sql )
    end
  
    def self.map_items( sql )
       reviews = SqlRunner.run( sql )
       result = reviews.map { |review| Review.new( review ) }
       return result
    end
  
    def self.map_item( sql )
      reviews = Review.map_items( sql )
      return reviews.first
    end
end