require 'rails_helper'

RSpec.describe "HealthChecks", type: :request do
  describe "GET /index" do
    it "HTTPステータス200を返すこと" do
      get health_check_path
      expect(response).to have_http_status(200)
    end
  end
end
