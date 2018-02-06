require 'test_helper'

class WidgetInstancesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @widget_instance = widget_instances(:one)
  end

  test "should get index" do
    get widget_instances_url
    assert_response :success
  end

  test "should get new" do
    get new_widget_instance_url
    assert_response :success
  end

  test "should create widget_instance" do
    assert_difference('WidgetInstance.count') do
      post widget_instances_url, params: { widget_instance: { data: @widget_instance.data, user_id: @widget_instance.user_id, widget_id: @widget_instance.widget_id } }
    end

    assert_redirected_to widget_instance_url(WidgetInstance.last)
  end

  test "should show widget_instance" do
    get widget_instance_url(@widget_instance)
    assert_response :success
  end

  test "should get edit" do
    get edit_widget_instance_url(@widget_instance)
    assert_response :success
  end

  test "should update widget_instance" do
    patch widget_instance_url(@widget_instance), params: { widget_instance: { data: @widget_instance.data, user_id: @widget_instance.user_id, widget_id: @widget_instance.widget_id } }
    assert_redirected_to widget_instance_url(@widget_instance)
  end

  test "should destroy widget_instance" do
    assert_difference('WidgetInstance.count', -1) do
      delete widget_instance_url(@widget_instance)
    end

    assert_redirected_to widget_instances_url
  end
end
