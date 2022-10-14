require 'rails_helper'

RSpec.describe "Api::V1::QuizHistoryOfCommittedFiles", type: :request do
  describe "GET /create" do
    it "returns http success" do
      get "/api/v1/quiz_history_of_committed_files/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /update" do
    it "returns http success" do
      get "/api/v1/quiz_history_of_committed_files/update"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/api/v1/quiz_history_of_committed_files/destroy"
      expect(response).to have_http_status(:success)
    end
  end

end
