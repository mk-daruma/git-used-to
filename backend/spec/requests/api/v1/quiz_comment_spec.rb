require 'rails_helper'

RSpec.describe "Api::V1::QuizComments", type: :request do
  describe "GET /create" do
    it "returns http success" do
      get "/api/v1/quiz_comment/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/api/v1/quiz_comment/show"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/api/v1/quiz_comment/destroy"
      expect(response).to have_http_status(:success)
    end
  end

end
