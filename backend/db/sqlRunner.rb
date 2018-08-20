require( 'pg' )

class SqlRunner

  def self.run( sql )
    begin
      db = PG.connect(:dbname => 'shop', :host => 'localhost', :port => 5432, :user => 'postgres', :password => 'spierdalaj')
      result = db.exec( sql )
    ensure
      db.close()
    end
    return result
  end

end