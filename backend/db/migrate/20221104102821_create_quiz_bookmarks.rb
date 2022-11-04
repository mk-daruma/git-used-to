class CreateQuizBookmarks < ActiveRecord::Migration[6.1]
  def change
    create_table :quiz_bookmarks do |t|
      t.references :quiz, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
