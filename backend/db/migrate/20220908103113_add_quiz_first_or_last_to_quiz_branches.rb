class AddQuizFirstOrLastToQuizBranches < ActiveRecord::Migration[6.1]
  def change
    add_reference :quiz_branches, :quiz_first_or_last, null: false, foreign_key: true
  end
end
