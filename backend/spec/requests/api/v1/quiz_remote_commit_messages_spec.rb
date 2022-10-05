require 'rails_helper'

RSpec.describe "Api::V1::QuizRemoteCommitMessages", type: :request do
  describe "GET /create" do
    it "returns http success" do
      get "/api/v1/quiz_remote_commit_messages/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/api/v1/quiz_remote_commit_messages/show"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /update" do
    it "returns http success" do
      get "/api/v1/quiz_remote_commit_messages/update"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/api/v1/quiz_remote_commit_messages/destroy"
      expect(response).to have_http_status(:success)
    end
  end

end
