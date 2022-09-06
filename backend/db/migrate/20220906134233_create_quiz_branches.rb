class CreateQuizBranches < ActiveRecord::Migration[6.1]
  def change
    create_table :quiz_branches do |t|
      t.references :quiz, null: false, foreign_key: true
      t.string :quiz_branch_name

      t.timestamps
    end
  end
end
