require( 'sinatra' )
require 'json'
require 'mail'
require('pry')
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
require_relative('./controllers/GetProductsByCategoryQuery.rb')
require_relative('./controllers/GetProductsByCategoryQuery.rb')
require_relative('./controllers/GetProduct.rb')

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

get '/product/:id' do
    getProduct = GetProduct.new(params[:id])
    return getProduct.run()
end

get '/category/:categoryName' do 
  getProductsByCategoryQuery = GetProductsByCategoryQuery.new(params[:categoryName])
  return getProductsByCategoryQuery.run()
end

get '/search/:term' do 
  getProductsByCategoryQuery = GetProductsByCategoryQuery.new(params[:term])
  return getProductsByCategoryQuery.run()
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
    items = []
    itemsHTML = ''
    for orderItem in payload['orderItems']
        itemHTML = '<tr><td>' + orderItem['name'] + '</td><td>' + orderItem['quantity'].to_s + '</td><td>£' + orderItem['price'].to_s + '</td></tr>';
        itemsHTML = itemsHTML + itemHTML
       orderItem['orderId'] = orderAfterSave[0]['id']
       orderItemObject = OrderedItem.new(orderItem)
       orderItemObject.save()
       items.push(orderItemObject)
    end

    options = { 
        :address => "smtp.gmail.com",
        :port => 587,
        :user_name => 'wtartanus@gmail.com',
        :password => 'spierdalaj2',
        :authentication => 'plain',
        :enable_starttls_auto => true  
    }

    Mail.defaults do
        delivery_method :smtp, options
    end

    Mail.deliver do
        to order.email
        from 'wtartanus@gmail.com'
        subject 'Order Confirmation'
        html_part do
            content_type 'text/html; charset=UTF-8'
            body '<h3>Dear ' + order.fullName + '</h3></br> Thanks for your order. Your order number is: <span style="color:green">'+
                  order.referenceNumber + '</span></br><h3>Delivery Addres</h3><br/><p>' + order.adres + '</p></br>' +
                  '<p>' + order.postcode + '</p></br><h4>Shipment info.</h4></br>' +
                  '<p>' + order.deliveryType + '</p></br><h3>Items</h3></br><table><tr><th>Item</th><th>Quantity</th><th>Price</th></tr>' +
                  itemsHTML + '<tr>Delivery</tr><tr><td colspan="2">' + order.deliveryType + '</td><td>£' + order.deliveryPrice + '</td></tr>'+
                  '<tr><td colspan="2">Total Price</td><td>' + order.totalCost.to_s + '</td></tr></table>'
        end
    end

    Mail.deliver do
        to 'wtartanus@gmail.com'
        from 'wtartanus@gmail.com'
        subject 'order'
        html_part do
            content_type 'text/html; charset=UTF-8'
            body ':)'
        end
    end

    return "{}".to_json
end

