require( 'sinatra' )
require 'json'
require 'mail'
#require( 'sinatra/contrib/all' ) if development?
#require( 'pry-byebug' )

require_relative( './models/mapProductsFromXML.rb' )
require_relative( './models/mapStocksFromXML.rb' )
require_relative( './models/mapCategoriesFromXML.rb' )
require_relative( './models/mapDiscontinuedFromXML.rb' )
require_relative( './models/mapData.rb' )
require_relative( './models/review.rb' )
require_relative('./models/orders.rb')
require_relative('./models/orderedItem.rb')


options '/*' do
    response["Access-Control-Allow-Headers"] = "*"
    content_type :json    
    headers 'Access-Control-Allow-Origin' => '*', 
             'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST']  
end

before do
    content_type :json    
    headers 'Access-Control-Allow-Origin' => '*', 
             'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST']  
             response["Access-Control-Allow-Headers"] = "*"
 end

get '/' do
  return "{wojtek: wojtek}"
end

get '/mapProductsFromXML' do
    MapProductsFromXML.mapFromXML("./xml/xml_all.xml")
    return "OK"
end

get '/mapStockFromXML' do
    MapStocksFromXML.mapFromXML("./xml/stockatt.xml")
    return "OK"
end

get '/mapCategoriesFromXML' do
    MapCategoriesFromXML.mapFromXML("./xml/xml_cat.xml")
    return "OK"
end

get '/mapDiscFromXML' do
    MapDiscontinuedFromXML.mapFromXML('./xml/discontinued.xml')
    return "OK"
end

get '/data' do 
    result = MapData.getData()
    return result
end

get '/review/:productId' do
  result = Review.getByProductId(params['productId'].to_i)
  return result.to_json
end

post '/review' do
    payload = JSON.parse(request.body.read)
    review = Review.new(payload)
    reviewAfterSave = review.save()
    return reviewAfterSave.to_json
end

post '/order' do
    payload = JSON.parse(request.body.read)
    puts(payload)
    order = Order.new(payload['order'])
    orderAfterSave = order.save()
    for orderItem in payload['orderItems']
       orderItem['orderId'] = orderAfterSave[0]['id']
       puts(orderItem)
       orderItemObject = OrderedItem.new(orderItem)
       orderItemObject.save()
    end

    options = { :address              => "smtp.gmail.com",
                :port                 => 587,
                :user_name            => 'wtartanus@gmail.com',
                :password             => 'spierdalaj2',
                :authentication       => 'plain',
                :enable_starttls_auto => true  }

    Mail.defaults do
    delivery_method :smtp, options
    end

    Mail.deliver do
        to order.email
        from 'wtartanus@gmail.com'
        subject 'Order'
        html_part do
            content_type 'text/html; charset=UTF-8'
            body '<h3>Hi ' + order.fullName + '</h3>'
        end
    end

    return "{}".to_json
end

