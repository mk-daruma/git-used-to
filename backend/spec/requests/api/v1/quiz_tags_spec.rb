require 'rails_helper'

RSpec.describe "Api::V1::QuizTags", type: :request do
  describe "GET /create" do
    it "returns http success" do
      get "/api/v1/quiz_tags/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/api/v1/quiz_tags/destroy"
      expect(response).to have_http_status(:success)
    end
  end

end
