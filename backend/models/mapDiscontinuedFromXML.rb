require 'xmlsimple'

class MapDiscontinuedFromXML
    attr_accessor :item, :discounted, :date

    def initialize(options)
        @item = options['ITEM']
        @date = options['DATE'] && options['DATE'][0] ? options['DATE'][0] : nil
        @discontinued = options['AVAILABLE'] && options['AVAILABLE'][0] == "Discontinued" ? true : false
    end

    def self.mapFromXML(path)
        result = []
        hash = XmlSimple.xml_in(path)
        puts(hash['PRODUCT'][0])
        hash['PRODUCT'].each { |item|
          result.push(MapDiscontinuedFromXML.new(item))
        }

        result.each{ |r|
           r.save()
        }
    end

    def save()
        sql = "INSERT INTO discontinued ( item, date, discontinued)
             VALUES ( '#{@item}', '#{@date}', '#{@discontinued}')"
        SqlRunner.run( sql )
    end
end