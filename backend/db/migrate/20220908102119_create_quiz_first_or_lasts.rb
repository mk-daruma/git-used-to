class CreateQuizFirstOrLasts < ActiveRecord::Migration[6.1]
  def change
    create_table :quiz_first_or_lasts do |t|
      t.references :quiz, null: false, foreign_key: true
      t.string :quiz_first_or_last_status

      t.timestamps
    end
  end
end
