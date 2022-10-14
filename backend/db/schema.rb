# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_10_14_112445) do

  create_table "quiz_branches", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "quiz_branch_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "quiz_first_or_last_id", null: false
    t.index ["quiz_first_or_last_id"], name: "index_quiz_branches_on_quiz_first_or_last_id"
  end

  create_table "quiz_commit_messages", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "quiz_branch_id", null: false
    t.text "quiz_commit_message"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["quiz_branch_id"], name: "index_quiz_commit_messages_on_quiz_branch_id"
  end

  create_table "quiz_first_or_lasts", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "quiz_id", null: false
    t.string "quiz_first_or_last_status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["quiz_id"], name: "index_quiz_first_or_lasts_on_quiz_id"
  end

  create_table "quiz_history_of_committed_files", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "quiz_history_of_committed_files_name"
    t.string "quiz_history_of_committed_files_text_status"
    t.string "quiz_history_of_committed_files_past_text_status"
    t.text "quiz_history_of_committed_files_parent_past_commit_message"
    t.bigint "quiz_branch_id", null: false
    t.bigint "quiz_commit_message_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["quiz_branch_id"], name: "index_quiz_history_of_committed_files_on_quiz_branch_id"
    t.index ["quiz_commit_message_id"], name: "index_quiz_history_of_committed_files_on_quiz_commit_message_id"
  end

  create_table "quiz_index_files", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "quiz_index_file_name"
    t.string "quiz_index_file_text_status"
    t.bigint "quiz_branch_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["quiz_branch_id"], name: "index_quiz_index_files_on_quiz_branch_id"
  end

  create_table "quiz_remote_branches", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "quiz_remote_branch_name"
    t.bigint "quiz_first_or_last_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["quiz_first_or_last_id"], name: "index_quiz_remote_branches_on_quiz_first_or_last_id"
  end

  create_table "quiz_remote_commit_messages", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "quiz_remote_commit_message"
    t.bigint "quiz_remote_branch_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["quiz_remote_branch_id"], name: "index_quiz_remote_commit_messages_on_quiz_remote_branch_id"
  end

  create_table "quiz_remote_repository_files", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "quiz_remote_repository_file_name"
    t.string "quiz_remote_repository_file_text_status"
    t.bigint "quiz_remote_commit_message_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "quiz_remote_branch_id", null: false
    t.index ["quiz_remote_branch_id"], name: "index_quiz_remote_repository_files_on_quiz_remote_branch_id"
    t.index ["quiz_remote_commit_message_id"], name: "index_quiz_remote_repository_files_on_remote_commit_message_id"
  end

  create_table "quiz_repository_files", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "quiz_commit_message_id", null: false
    t.string "quiz_repository_file_name"
    t.string "quiz_repository_file_status"
    t.string "quiz_repository_file_text_status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "quiz_branch_id", null: false
    t.index ["quiz_branch_id"], name: "index_quiz_repository_files_on_quiz_branch_id"
    t.index ["quiz_commit_message_id"], name: "index_quiz_repository_files_on_quiz_commit_message_id"
  end

  create_table "quiz_worktree_files", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "quiz_branch_id", null: false
    t.string "quiz_worktree_file_name"
    t.string "quiz_worktree_file_status"
    t.string "quiz_worktree_file_text_status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["quiz_branch_id"], name: "index_quiz_worktree_files_on_quiz_branch_id"
  end

  create_table "quizzes", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "quiz_title"
    t.text "quiz_introduction"
    t.string "quiz_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_quizzes_on_user_id"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "user_name"
    t.string "nickname"
    t.text "user_self_introduction"
    t.string "image"
    t.string "email"
    t.text "tokens"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "quiz_branches", "quiz_first_or_lasts"
  add_foreign_key "quiz_commit_messages", "quiz_branches"
  add_foreign_key "quiz_first_or_lasts", "quizzes"
  add_foreign_key "quiz_history_of_committed_files", "quiz_branches"
  add_foreign_key "quiz_history_of_committed_files", "quiz_commit_messages"
  add_foreign_key "quiz_index_files", "quiz_branches"
  add_foreign_key "quiz_remote_branches", "quiz_first_or_lasts"
  add_foreign_key "quiz_remote_commit_messages", "quiz_remote_branches"
  add_foreign_key "quiz_remote_repository_files", "quiz_remote_commit_messages"
  add_foreign_key "quiz_repository_files", "quiz_commit_messages"
  add_foreign_key "quiz_worktree_files", "quiz_branches"
  add_foreign_key "quizzes", "users"
end
