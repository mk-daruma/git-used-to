class CreateQuizAnswerRecords < ActiveRecord::Migration[6.1]
  def change
    create_table :quiz_answer_records do |t|
      t.references :user, null: false, foreign_key: true
      t.references :quiz, null: false, foreign_key: true

      t.timestamps
    end
  end
end
