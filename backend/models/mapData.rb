require_relative( './stock.rb' )
require_relative( './product.rb' )
require_relative( './category.rb' )
require_relative( './discountinued.rb' )
require_relative( './review.rb')

require('json')

class MapData

    attr_accessor :products, :stocks, :categories, :discountinued

    def initilize()
        @products = Product.all()
        @stocks = Stock.all()
        @categories = Category.all()
        @discountinued = Discountinued.all()
    end

    def mapCategoryTree(categories, productsByCategory)
        categoriesByCategoryId = {}
        categories.each { |category|
           if !categoriesByCategoryId[category.categoryId]
               categoriesByCategoryId[category.categoryId] = category
           end
        }
        result = {}
        # top categories by category id = { data: category, parentId: parentId, children: {}, products: []}
        categories.each { |category|
           if !category.parentId && !result[category.categoryId]
              result[category.categoryId] = {
                  :data => category,
                  :parentId => nil,
                  :children => {},
                  :products => productsByCategory[category.name] ? productsByCategory[category.name] : []
              }
           elsif category.parentId && result[category.parentId]
              result[category.parentId][:children]
           end
        }
    end

    def self.getData()
        products = Product.getAllAsHash()
        stocks = Stock.getAllAsHash()
        categories = Category.getAllAsHash()
        discountinued = Discountinued.getAllAsHash()
        reviews = Review.getReviewsByProductId()

        data = {
            :productsById => {},
            :productsByCategory => {},
            :stockByProductsId => {},
            :discountedProductsByItem => {},
            :categoryTree => {},
            :reviews => reviews
        }
        
        products.each { |product|
           data[:productsById][product['id']] = product
        }
        
        #products by category
        categories.each { |category|
           if !data[:productsByCategory][category['name']]
              data[:productsByCategory][category['name']] = []
           end
        }
        for  product in products
            for category in product['categoryName']
                if data[:productsByCategory][category]
                    data[:productsByCategory][category].push(product)
                end
            end
        end
        #stockByProductId
        stocks.each{ |stock|
           data[:stockByProductsId][stock['productId']] = stock
        }
        #discounted products by item
        discountinued.each { |disc|
           data[:discountedProductsByItem][disc['item']] = disc
        }

        #category tree
        # data[:categoryTree] = self.mapCategoryTree(categories, products)
         return data.to_json
    end
end