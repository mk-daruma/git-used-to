class RemoveCredentialsFromUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :credentials, :text
  end
end
