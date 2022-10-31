class RemoveQuizFromQuizBranches < ActiveRecord::Migration[6.1]
  def change
    remove_reference :quiz_branches, :quiz, null: false, foreign_key: true
  end
end
