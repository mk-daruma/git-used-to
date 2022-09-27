class CreateQuizIndexFiles < ActiveRecord::Migration[6.1]
  def change
    create_table :quiz_index_files do |t|
      t.string :quiz_index_file_name
      t.string :quiz_index_file_text_status
      t.references :quiz_branch, null: false, foreign_key: true

      t.timestamps
    end
  end
end
