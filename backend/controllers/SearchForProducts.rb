require_relative('./../db/sqlRunner.rb')
require_relative('../models/product.rb')
require_relative('../models/stock.rb')
require_relative('../models/review.rb')

class GetProductsByCategoryQuery
    
    attr_reader :products, :stock
                 
    def initialize(searchTerm)
      @products = Product.searchForProducts(searchTerm)
      @stock = Stock.getAllAsHash()
    end

    def run()
      result = {
        :stockByProductId => GetProductsByCategoryQuery.getStockByProductId(@products, @stock),
        :products => @products,
        :reviews => Review.getReviewsByProductId()
      }
      return result.to_json
    end

    def self.getStockByProductId(products, stockAll)
      result = {}
      products.each { |product|
         stockAll.each { |stock|
            if product["id"] == stock["productId"]
               result[stock["productId"]] = stock
            end
         }
      }
      return result
    end

    def self.getReviewByProductId(products, reviewsAll)
      result = {}
      products.each { |product|
         reviewsAll.each { |review|
            if product["id"] == review["productId"]
               result[review["productId"]] = review
            end
         }
      }
      return result
    end
end