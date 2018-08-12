require 'xmlsimple'

class MapProductsFromXML
    attr_reader   :item
    attr_accessor :model, :name, :weightInKg, :image, :description, :price, :rrp, :productThumbail, :smallMultiImage1,
                  :smallMultiImage2, :smallMultiImage3, :smallMultiImage4, :bigMultiImage1, :bigMultiImage2, :bigMultiImage3, :xlImage, :xlImage2,
                  :xlImage3, :xlImage4, :xlImage5, :productSize, :productPower, :lubeType, :categoryId, :categoryName,
                  :condomSafe, :liquidVolume, :noOfPills, :fastening, :washing, :insertable, :diameter, :harnessCompatible, :originalCircumference,
                  :originalDiameter, :productWidth, :coulur, :flexability, :controller, :waterproof, :designedForWho, :whatIsIt, :whatIsFor, :inCatName,
                  :features, :misc, :materialName, :brandName, :styleName, :productEAN, :attributeEAN, :productLength, :motion, :opening
                 
    def initialize( options, categoryId, categoryName )
      @item = options['ITEM']
      @model = options['Model'] && options['Model'].first ? options['Model'].first : nil
      @name = options['NAME'] && options['NAME'].first ? options['NAME'].first : nil
      @weightInKg = options['WEIGHT'] && options['WEIGHT'].first ? options['WEIGHT'].first.to_f : nil
      @image = options[ 'IMAGE' ] && options['IMAGE'].first ? options['IMAGE'].first : nil
      @description = options[ 'DESCRIPTION' ] && options['DESCRIPTION'].first ? options['DESCRIPTION'].first : nil
      @price = options[ 'PRICE' ] && options['PRICE'].first ? options['PRICE'].first.to_f : nil
      @rrp = options['RRP'] && options['RRP'].first ? options['RRP'].first.to_f : nil
      @productThumbail = options['THUMB'] && options['THUMB'].first ? options['THUMB'].first : nil
      @smallMultiImage1 = options['MULTI1'] && options['MULTI1'].first ? options['MULTI1'].first : nil
      @smallMultiImage2 = options['MULTI2'] && options['MULTI2'].first ? options['MULTI2'].first : nil
      @smallMultiImage3 = options['MULTI3'] && options['MULTI3'].first ? options['MULTI3'].first : nil
      @smallMultiImage4 = options['MULTI4'] && options['MULTI4'].first ? options['MULTI4'].first : nil
      @bigMultiImage1 = options['BIGMULTI1'] && options['BIGMULTI1'].first ? options['BIGMULTI1'].first : nil
      @bigMultiImage2 = options['BIGMULTI2'] && options['BIGMULTI2'].first ? options['BIGMULTI2'].first : nil
      @bigMultiImage3 = options['BIGMULTI3'] && options['BIGMULTI3'].first ? options['BIGMULTI3'].first : nil
      @xlImage = options['XIMAGE'] && options['XIMAGE'].first ? options['XIMAGE'].first : nil
      @xlImage2 = options['XIMAGE2'] && options['XIMAGE2'].first ? options['XIMAGE2'].first : nil
      @xlImage3 = options['XIMAGE3'] && options['XIMAGE3'].first ? options['XIMAGE3'].first : nil
      @xlImage4 = options['XIMAGE4'] && options['XIMAGE4'].first ? options['XIMAGE4'].first : nil
      @xlImage5 = options['XIMAGE5'] && options['XIMAGE5'].first ? options['XIMAGE5'].first : nil
      @productSize = options['SIZE'] 
      @productPower = options['POWER'] && options['POWER'].first ? options['POWER'].first : nil
      @lubeType = options['LUBETYPE'] && options['LUBETYPE'].first ? options['LUBETYPE'].first : nil
      @condomSafe = options['CONDOMSAFE'] && options['CONDOMSAFE'].first == "Yes" ? true : false
      @liquidVolume = options['LIQUIDVOLUME'] 
      @noOfPills = options['NUMBEROFPILLS'] && options['NUMBEROFPILLS'].first ? options['NUMBEROFPILLS'].first : nil
      @fastening = options['FASTENING'] && options['FASTENING'].first ? options['FASTENING'].first : nil
      @washing = options['WASHING'] && options['WASHING'].first ? options['WASHING'].first : nil
      @insertable = options['INSERTABLE'] && options['INSERTABLE'].first ? options['INSERTABLE'].first : nil
      @diameter = options['DIAMETER'] && options['DIAMETER'].first ? options['DIAMETER'].first : nil
      @harnessCompatible = options['HARNESSCOMPATIBLE'] && options['HARNESSCOMPATIBLE'].first == "Yes" ? true : false
      @originalCircumference = options['ORINGCIRC'] && options['ORINGCIRC'].first ? options['ORINGCIRC'].first : nil
      @originalDiameter = options['ORINGDIAM'] && options['ORINGDIAM'].first ? options['ORINGDIAM'].first : nil
      @productWidth = options['WIDTH'] && options['WIDTH'].first ? options['WIDTH'].first : nil
      @coulur = options['COLOUR'] && options['COLOUR'].first ? options['COLOUR'].first : nil
      @flexability = options['FLEXIBILITY'] && options['FLEXIBILITY'].first ? options['FLEXIBILITY'].first : nil
      @controller = options['CONTROLLER'] && options['CONTROLLER'].first ? options['CONTROLLER'].first : nil
      @waterproof = options['WATERPROOF'] && options['WATERPROOF'].first == "Yes" ? true : false
      @designedForWho = options['FORWHO'] && options['FORWHO'].first ? options['FORWHO'].first : nil
      @whatIsIt = options['WHATISIT'] && options['WHATISIT'].first ? options['WHATISIT'].first : nil
      @whatIsFor = options['FOR'] && options['FOR'].first ? options['FOR'].first : nil
      @features = options['FEATURES'] && options['FEATURES'].first ? options['FEATURES'].first : nil
      @misc = options['MISC'] && options['MISC'].first ? options['MISC'].first : nil
      @materialName = options['MATERIAL'] && options['MATERIAL'].first ? options['MATERIAL'].first : nil
      @brandName = options['BRAND'] && options['BRAND'].first ? options['BRAND'].first : nil
      @styleName = options['STYLE'] && options['STYLE'].first ? options['STYLE'].first : nil
      @productEAN = options['EAN'] && !options['EAN'][0].empty? ? options['EAN'][0] : nil
      @inCatName = options['INCATNAME'] 
      @productLength = options['LENGTH'] 
      @motion = options['MOTION'] 
      @opening = options['OPENING'] && options['OPENING'].first ? options['OPENING']: nil
      @categoryId = categoryId.to_i
      @categoryName = categoryName ? MapProductsFromXML.stripSpaces(categoryName) : nil
    end

    def self.stripSpaces(categoryNames)
      categoryNames = categoryNames.split('>')

      if !categoryNames
        return nil
      end

      result = []

      categoryNames.each { |name|
        name = name.strip
        result.push(name)
      }
      return result
  end

    def mapProductSize(size)
      #["6, 5, and 4 Inches"]
      #["3.5 Inches and 6 Inches"]
      #["4 and 6 Inches"]
      #["7 Inches, 6.5 Inches, 6.5 Inches"]
      #["6.5, 6, 6, 2, 9, 11 Inches"]
      #["4, 5.5 and 7.5 Inches"]
      #["UK 8 to 14"]
      #["One Size 1618 UK"]
      #["Fits 1418 UK"]
      #["7273 Inches"]
      #["5 and 5.5 Inches"]
      #["5.5  5.75 Inches"]
      #["6.5, 7 and 8 Inches"]
      #["6.5  6.75 Inches"]
      #["6, 5, 4 Inches"]
      #["4.75  5 Inches"]
      #["6, 5.5 and 5 Inches"]
      #["5.5  6.5 Inches"]
      #["5.25  5.5 Inches"]
      #["53/4 11/2 x 11/4"]
      #["Small/Medium"]
      #["3.5  5.7 Inches"]
      #["7.5 / 5.5 / 5 Inches"]
      #["6 and 10 Inches"]
      #["1.75  2 Inches"]
      #["One Size 1418 UK"]
      #["4, 4.5, 5 Inches"]
      #["5, 6 and 7 Inches"]
      #["One Size (Fits 812)"]
      #["7.5  8 Inches"]
      #["7.5 Inches, 4 Inches"]
    end

    def self.mapFromXML( path )
      result = []
      hash = XmlSimple.xml_in(path)
      hash["CREATED"][0]["CATEGORY"].each { |item|
        item["PRODUCT"].each { |product|
           mappedProduct = MapProductsFromXML.new(product, item['id'], item['name'])
           result.push(mappedProduct)
        }
      }
      result = result.map { |product| 
        product.save()
      }
    end

    def save()
      sql = "INSERT INTO products ( item, model, name, weightInKg, image, description, price, rrp, productThumbail, smallMultiImage1, smallMultiImage2, smallMultiImage3, 
                                    smallMultiImage4, bigMultiImage1, bigMultiImage2, bigMultiImage3, xlImage, xlImage2, xlImage3, xlImage4, xlImage5, productSize, 
                                    productPower, lubeType, categoryId, categoryName, condomSafe, liquidVolume, noOfPills, fastening, washing, insertable, diameter, 
                                    harnessCompatible, originalCircumference, originalDiameter, productWidth, coulur, flexability, controller, waterproof, designedForWho, 
                                    whatIsIt, whatIsFor, features, misc, materialName, brandName, styleName, productEAN, productLength, motion, 
                                    opening)
           VALUES ( '#{@item}', '#{@model}', '#{@name}', #{@weightInKg}, '#{@image}', '#{@description}', #{@price}, #{@rrp}, '#{@productThumbail}', 
                   '#{@smallMultiImage1}', '#{@smallMultiImage2}', '#{@smallMultiImage3}', '#{@smallMultiImage4}', '#{@bigMultiImage1}', 
                   '#{@bigMultiImage2}', '#{@bigMultiImage3}', '#{@xlImage}', '#{@xlImage2}', '#{@xlImage3}', '#{@xlImage4}', '#{@xlImage5}', 
                   '#{@productSize}', '#{@productPower}', '#{@lubeType}', #{categoryId}, '#{categoryName}', #{@condomSafe}, 
                   '#{@liquidVolume}', '#{@noOfPills}', '#{@fastening}', '#{@washing}', '#{@insertable}', '#{@diameter}', #{@harnessCompatible}, '#{@originalCircumference}',
                   '#{@originalDiameter}', '#{@productWidth}', '#{@coulur}', '#{@flexability}', '#{@controller}', #{@waterproof}, '#{@designedForWho}', '#{@whatIsIt}', 
                   '#{@whatIsFor}', '#{@features}', '#{@misc}', '#{@materialName}', '#{@brandName}', '#{@styleName}', 
                   '#{@productEAN}', '#{@productLength}', '#{@motion}', '#{@opening}')"
      SqlRunner.run( sql )
    end
end