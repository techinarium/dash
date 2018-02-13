json.extract! review, :id, :rating, :review_text, :user_id, :widget_id, :created_at, :updated_at
json.url review_url(review, format: :json)
