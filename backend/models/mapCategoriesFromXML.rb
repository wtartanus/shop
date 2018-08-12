require 'xmlsimple'

class MapCategoriesFromXML
    attr_accessor :categoryId, :name, :image, :parentId

    def initialize(options)
        @categoryId = options['categories_id'] && options['categories_id'][0] ? options['categories_id'][0].to_i : nil
        @name = options['categories_name'] && options['categories_name'][0] ? options['categories_name'][0] : nil
        @parentId = options['parent_id'] && options['parent_id'][0] ? options['parent_id'][0].to_i : nil
        @image = options['categories_image'] && options['categories_image'][0] ? options['categories_image'][0] : nil
    end

    def self.mapFromXML(path)
        result = []
        hash = XmlSimple.xml_in(path)
        # puts(hash['CREATED'][0]['category'][0])
        hash['CREATED'][0]['category'].each { |item|
          result.push(MapCategoriesFromXML.new(item))
        }

        result.each{ |r|
           r.save()
        }
    end

    def save()
      sql = "INSERT INTO categories ( categoryId, name, image, parentId)
             VALUES ( #{@categoryId}, '#{@name}', '#{@image}', #{@parentId})"
      SqlRunner.run( sql )
    end
end