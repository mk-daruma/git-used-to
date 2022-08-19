require 'rails_helper'

RSpec.describe User, type: :model do
  describe "validates presence" do
    context "全てのカラムに値が入力されている場合" do
      let(:user) { create(:user) }

      it "userのレコード作成が成功すること" do
        expect(user).to be_valid
      end
    end

    context "emailのみ値が入力されていない場合" do
      let(:user) { build(:user, email: nil) }

      it "エラーになること" do
        user.valid?
        expect(user.errors.messages[:email]).to include "can't be blank"
      end
    end

    context "passwordのみ値が入力されていない場合" do
      let(:user) { build(:user, password: nil) }

      it "エラーになること" do
        user.valid?
        expect(user.errors.messages[:password]).to include "can't be blank"
      end
    end
  end

  describe "validates uniqueness" do
    context "保存されたメールアドレスを使用して新規ユーザーが値を入力した場合" do
      let(:user1) { create(:user) }
      let(:user2) { build(:user, email: user1.email) }

      it "エラーになること" do
        user2.valid?
        expect(user2.errors.messages[:email]).to include "has already been taken"
      end
    end
  end
end
