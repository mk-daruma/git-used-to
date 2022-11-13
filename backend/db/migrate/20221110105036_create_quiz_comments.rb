class CreateQuizComments < ActiveRecord::Migration[6.1]
  def change
    create_table :quiz_comments do |t|
      t.references :quiz, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.text :comment, null: false

      t.timestamps
    end
  end
end
