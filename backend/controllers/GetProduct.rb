require_relative('./../db/sqlRunner.rb')
require_relative('../models/product.rb')
require_relative('../models/stock.rb')
require_relative('../models/review.rb')
require('pry')


class GetProduct
    
    attr_reader :product, :stock
                 
    def initialize(id)
      @product = Product.find(id)
      @stock = Stock.getAllAsHash()
    end

    def run()
      result = {
        :stockByProductId => GetProduct.getStockByProductId(@product, @stock),
        :product => @product,
        :reviews => Review.getReviewsByProductId()
      }
      return result.to_json
    end

    def self.getStockByProductId(product, stockAll)
         stockAll.each { |stock|
            if product["id"] == stock["productId"]
               return stock
            end
         }
    end

    def self.getReviewByProductId(product, reviewsAll)
      result = {}
         reviewsAll.each { |review|
            if product["id"] == review["productId"]
               result[review["productId"]] = review
            end
         }
      return result
    end
end