require_relative('./../db/sqlRunner.rb')

class Category
    attr_reader   :id, :categoryId
    attr_accessor :parentId, :name, :image
                 
    def initialize(options)
      @id = options['id'].to_i
      @categoryId = options['categoryId'].to_i
      @parentId = options['parentId'] ? options['parentId'].to_i : nil
      @name = options['name']
      @image = options['image']
    end
  
    def save()
      sql = "INSERT INTO categories (categoryId, parentId, name, image)
             VALUES (#{@categoryId}, #{@parentId}, '#{@name}', '#{@image}')"
      SqlRunner.run( sql )
    end
  
    def self.find( id )
      sql = "SELECT * FROM categories WHERE id = #{ id }"
      result = Category.map_item( sql )
      return result
    end
  
  
    def self.all()
      sql = "SELECT * FROM categories"
      result = Category.map_items( sql )
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