require 'xmlsimple'
require_relative('./../db/sqlRunner.rb')
require('json')


class Product
    attr_reader   :id, :itemId
    attr_accessor :model, :name, :weightInKg, :image, :description, :price, :rrp, :productThumbail, :smallMultiImage1,
                  :smallMultiImage2, :smallMultiImage3, :smallMultiImage4, :bigMultiImage1, :bigMultiImage2, :bigMultiImage3, :xlImage, :xlImage2,
                  :xlImage3, :xlImage4, :xlImage5, :productSize, :productPower, :lubeType, :categoryId, :categoryName,
                  :condomSafe, :liquidVolume, :noOfPills, :fastening, :washing, :insertable, :diameter, :harnessCompatible, :originalCircumference,
                  :originalDiameter, :productWidth, :coulur, :flexability, :controller, :waterproof, :designedForWho, :whatIsIt, :whatIsFor, :inCatName,
                  :features, :misc, :materialName, :brandName, :styleName, :productEAN, :productLength, :motion, :opening
                 
    def initialize(options)
      @id = options['id'].to_i
      @itemId = options['item']
      @model = options['model']
      @name = options['name']
      @weightInKg = options['weightinkg'].to_f
      @image = options['image']
      @description = options['description']
      @price = options['price'].to_f
      @rpr = options['rrp'].to_f
      @productThumbail = options['productthumbail']
      @smallMultiImage1 = options['smallmultiimage1']
      @smallMultiImage2 = options['smallmultiimage2']
      @smallMultiImage3 = options['smallmultiimage3']
      @smallMultiImage4 = options['smallmultiimage4']
      @bigMultiImage1 = options['bigmultiimage1']
      @bigMultiImage2 = options['bigmultiimage2']
      @bigMultiImage3 = options['bigmultiimage3']
      @xlImage = options['xlimage']
      @xlImage2 = options['xlimage2']
      @xlImage3 = options['xlimage3']
      @xlImage4 = options['xlimage4']
      @xlImage5 = options['xlimage5']
      @productSize = options['productsize']
      @productPower = options['productpower']
      @lubeType = options['lubetype']
      @condomSafe = options['condomsafe']
      @liquidVolume = options['liquidvolume']
      @noOfPills = options['noofpills']
      @fastening = options['fastening']
      @washing = options['washing']
      @insertable = options['insertable']
      @diameter = options['diameter']
      @harnessCompatible = options['harnesscompatible']
      @originalCircumference = options['originalcircumference']
      @originalDiameter = options['originaldiameter']
      @productWidth = options['productwidth']
      @coulur = options['coulur']
      @flexability = options['flexability']
      @controller = options['controller']
      @waterproof = options['waterproof']
      @designedForWho = options['designedforwho']
      @whatIsIt = options['whatisit']
      @whatIsFor = options['whatisfor']
      @features = options['features']
      @misc = options['misc']
      @materialName = options['materialname']
      @brandName = options['brandname']
      @styleName = options['stylename']
      @productEAN = options['productean']
      @inCatName = options['incatname']
      @productLength = options['productlength']
      @motion = options['motion']
      @opening = options['opening']
      @categoryId = options['categoryid'].to_i
      @categoryName = options['categoryname'] ?  JSON.parse(options['categoryname']) : nil
      @opening = options['opening']
    end
  
    def save()
      sql = "INSERT INTO products ( itemId, model, name, weightInKg, image, description, price, rrp, productThumbail, smallMultiImage1, smallMultiImage2, smallMultiImage3, 
                                    smallMultiImage4, bigMultiImage1, bigMultiImage2, bigMultiImage3, xlImage, xlImage2, xlImage3, xlImage4, xlImage5, productSize, 
                                    productPower, lubeType, categoryId, categoryName, condomSafe, liquidVolume, noOfPills, fastening, washing, insertable, diameter, 
                                    harnessCompatible, originalCircumference, originalDiameter, productWidth, coulur, flexability, controller, waterproof, designedForWho, 
                                    whatIsIt, whatIsFor, features, misc, materialName, brandName, styleName, productsEAN, productLength, motion, 
                                    opening)
           VALUES (#{@itemId}, '#{@model}', '#{@name}', #{@weightInKg}, '#{@image}', '#{@description}', #{@price}, #{@rrp}, '#{@productThumbail}', 
                   '#{@smallMultiImage1}', '#{@smallMultiImage2}', '#{@smallMultiImage3}', '#{@smallMultiImage4}', '#{@bigMultiImage1}', 
                   '#{@bigMultiImage2}', '#{@bigMultiImage3}', '#{@xlImage}', '#{@xlImage2}', '#{@xlImage3}', '#{@xlImage4}', '#{@xlImage5}', 
                   '#{@productSize}', '#{@productPower}', '#{@lubeType}', '#{categoryId}', '#{categoryName}', '#{@condomSafe}', 
                   '#{@liquidVolume}', '#{@noOfPills}', '#{@fastening}', '#{@washing}', '#{@insertable}', '#{@diameter}', '#{@harnessCompatible}', '#{@originalCircumference}',
                   '#{@originalDiameter}', '#{@productWidth}', '#{@coulur}', '#{@flexability}', '#{@controller}', '#{@waterproof}', '#{@designedForWho}', '#{@whatIsIt}', 
                   '#{@whatIsFor}', '#{@features}', '#{@misc}', '#{@materialName}', '#{@brandName}', '#{@styleName}', 
                    #{@productsEAN}, '#{@productLength}', '#{@motion}', '#{@opening}')"
      SqlRunner.run( sql )
      # # return Product.new( product )
      # return product
    end

    def self.getProductsByCategoryName(categoryName)
      sql = "SELECT * FROM products WHERE category LIKE '%#{categoryName}%'"
      result = Product.map_items(sql)
      return result
    end
  
    def self.find( id )
      sql = "SELECT * FROM products WHERE id = #{ id }"
      result = Product.map_item( sql )
      return result
    end
  
  
    def self.all()
      sql = "SELECT * FROM products"
      result = Product.map_items( sql )
      return result
    end

    def self.getAllAsHash()
      products = Product.all()
      result = []
      products.each { |product|
        item = {}
        product.instance_variables.each {|var| 
          item[var.to_s.delete("@")] = product.instance_variable_get(var) 
        }
        result.push(item)
      }
      return result
    end

    def self.getIdByName()
      products = Product.all()
      result = {}
      products.each { |product|
         if !result[product.name]
          result[product.name] = product.id
         end
      }
      return result
    end
    
    def self.update( options )
      sql = "UPDATE albums SET
      model = '#{options[:model]}',
      name = '#{options[:name]}',
      weightInKg = #{options[:weightInKg]},
      image = '#{options[:image]}',
      thumbnail = '#{options[:thumbnail]}',
      description = '#{options[:description]}',
      price = #{options[:price]},
      rpr = '#{options[:rpr]}', 
      productThumbail = '#{options[:productThumbail]}',
      productBigImage = '#{options[:productBigImage]}', 
      smallMultiImage1 = '#{options[:smallMultiImage1]}',
      smallMultiImage2 = '#{options[:smallMultiImage2]}', 
      smallMultiImage3 = '#{options[:smallMultiImage3]}',
      smallMultiImage4 = '#{options[:smallMultiImage4]}',
      bigMultiImage1 = '#{options[:bigMultiImage1]}', 
      bigMultiImage2 = '#{options[:bigMultiImage2]}', 
      bigMultiImage3 = '#{options[:bigMultiImage3]}',
      xlImage = '#{options[:xlImage]}', 
      xlImage2 = '#{options[:xlImage2]}',
      xlImage3 = '#{options[:xlImage3]}', 
      xlImage4 = '#{options[:xlImage4]}', 
      xlImage5 = '#{options[:xlImage5]}',
      categoryList = '#{options[:categoryList]}', 
      attributeList = '#{options[:attributeList]}', 
      productStatus = '#{options[:productStatus]}',
      dateAdded = '#{options[:dateAdded]}', 
      productSize = #{options[:productSize]}, 
      productPower = #{options[:productPower]}, 
      lubeType = '#{options[:lubeType]}',
      condomSafe = '#{options[:condomSafe]}',
      liquidVolume = #{options[:liquidVolume]},
      noOfPills = #{options[:noOfPills]},
      fastening = '#{options[:fastening]}',
      washable = '#{options[:washable]}',
      insertable = '#{options[:insertable]}', 
      diameter = '#{options[:diameter]}', 
      harnessCompatible = '#{options[:harnessCompatible]}',
      originalCircumference = '#{options[:originalCircumference]}',
      originalDiameter = '#{options[:originalDiameter]}', 
      productWidth = #{options[:productWidth]}, 
      coulur = '#{options[:coulur]}', 
      flecability = '#{options[:flecability]}', 
      controller = '#{options[:controller]}', 
      waterproof = '#{options[:waterproof]}', 
      designedForWho = '#{options[:designedForWho]}', 
      whatIsIt = '#{options[:whatIsIt]}',
      whatIsFor = '#{options[:whatIsFor]}', 
      productsAction = '#{options[:productsAction]}',
      features = '#{options[:features]}', 
      misc = '#{options[:misc]}', 
      materialName = '#{options[:materialName]}', 
      brandName = '#{options[:brandName]}', 
      styleName = '#{options[:styleName]}', 
      productsEAN = '#{options[:productsEAN]}', 
      attributeEAN = '#{options[:attributeEAN]}',
         WHERE id = #{ options[:id] }"
      SqlRunner.run( sql )
    end
  
    def self.destroy( id )
      sql = "DELETE FROM products WHERE id = #{id}"
      SqlRunner.run( sql )
    end
  
    def self.delete_all()
      sql = "DELETE FROM products"
      SqlRunner.run( sql )
    end
  
    def self.map_items( sql )
       products = SqlRunner.run( sql )
       result = products.map { |product| Product.new( product ) }
       return result
    end
  
    def self.map_item( sql )
      products = Product.map_items( sql )
      return products.first
    end
end