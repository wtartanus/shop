require( 'sinatra' )
require 'json'
#require( 'sinatra/contrib/all' ) if development?
#require( 'pry-byebug' )

require_relative( './models/mapProductsFromXML.rb' )
require_relative( './models/mapStocksFromXML.rb' )
require_relative( './models/mapCategoriesFromXML.rb' )
require_relative( './models/mapDiscontinuedFromXML.rb' )
require_relative( './models/mapData.rb' )


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
    # data = MapData.new()
    result = MapData.getData()
    return result
end

