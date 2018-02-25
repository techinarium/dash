json.extract! widget_instance, :id, :user_id, :widget_id, :data, :created_at, :updated_at,
                               :size_x, :size_y, :coord_x, :coord_y
json.url widget_instance_url(widget_instance, format: :json)
