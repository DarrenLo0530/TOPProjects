class StaticPagesController < ApplicationController
  def index
    flickr = Flickr.new
    token = flickr.get_request_token
    if params[:user_id]
      #Get all public photos from the user
      begin
        photos_info = flickr.people.getPublicPhotos(api_key: ENV['FLICKR_API_KEY'], user_id: params[:user_id], format: 'rest')
      rescue => exception
        redirect_to root_path, notice: "Could not find user with that id"
      else
        #Create links to the photos using the photos hash
        @photo_links = photos_info.map {|photo_info| Flickr.url_b(photo_info)}
      end

    end
  end
end
