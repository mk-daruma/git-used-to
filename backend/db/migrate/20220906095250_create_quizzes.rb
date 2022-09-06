class CreateQuizzes < ActiveRecord::Migration[6.1]
  def change
    create_table :quizzes do |t|
      t.references :user, null: false, foreign_key: true
      t.string :quiz_title
      t.text :quiz_introduction
      t.string :quiz_type

      t.timestamps
    end
  end
end
