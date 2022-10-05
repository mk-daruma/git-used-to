require 'rails_helper'

RSpec.describe "Api::V1::QuizRemoteBranches", type: :request do
  describe "GET /create" do
    it "returns http success" do
      get "/api/v1/quiz_remote_branches/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/api/v1/quiz_remote_branches/show"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /update" do
    it "returns http success" do
      get "/api/v1/quiz_remote_branches/update"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/api/v1/quiz_remote_branches/destroy"
      expect(response).to have_http_status(:success)
    end
  end

end
