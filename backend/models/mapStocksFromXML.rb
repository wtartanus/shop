require 'xmlsimple'
require_relative( './product.rb' )

class MapStocksFromXML
    attr_reader :productId
    attr_accessor :inStock, :size

    def initialize(productId, inStock, size)
        @productId = productId
        @inStock = inStock
        @size = size
    end

    def self.itemInStock(product)
        if product['STOCK'] && product['STOCK'].length == 1
            return product['STOCK'][0].include?("In Stock") ? true : false
        elsif product['STOCK']
            result = false
            product['STOCK'].each { |item|
                if item['content'].include?("In Stock")
                    result = true
                    break
                end
            }
            return result
        end
    end

    def self.mapFromXML(path)
        result = []
        hash = XmlSimple.xml_in(path)
        productsIdsByName = Product.getIdByName()
        hash['PRODUCT'].each { |product|
            productId = productsIdsByName[product['NAME']]
            if productId
                inStock = self.itemInStock(product)
                size = product['STOCK'] && product['STOCK'].length > 1 ? product['STOCK'] : nil
                stock = MapStocksFromXML.new(productId, inStock, size)
                result.push(stock)
            end
        }

        result.each { |r|
           r.save()
        }
    end

    def save()
      sql = "INSERT INTO stocks ( productId, inStock, size)
             VALUES ( #{@productId}, '#{@inStock}', '#{@size}')"
      SqlRunner.run( sql )
    end

end