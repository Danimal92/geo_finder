class SummariesController < ApplicationController
    
    def index
        summaries = Summary.all
        render :json => summaries
    
    end

    def show
        summary = Summary.find(params[:id])
        render :json => summary
    end

    def getSummaryOfUser
        summaries = Summary.where(user_id: params[:userId])
        # byebug
        render :json => summaries
    end

    def create
        user = User.find(params[:user_id])
        summary = Summary.create(set_param)
        user.points = user.points + summary.points
        user.save
        render :json => summary
    end

    def destroy
        summary = Summary.find(params[:id])
        summary.destroy
    end

    
    private

    def set_param
        params.require(:summary).permit(:user_id, :input_lat, :input_lng, :actual_lat, :actual_lng, :points, :guessed_address, :actual_address)
    end
end
