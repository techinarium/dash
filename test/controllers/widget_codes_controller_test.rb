require 'test_helper'

class WidgetCodesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @widget_code = widget_codes(:one)
  end

  test "should get index" do
    get widget_codes_url
    assert_response :success
  end

  test "should get new" do
    get new_widget_code_url
    assert_response :success
  end

  test "should create widget_code" do
    assert_difference('WidgetCode.count') do
      post widget_codes_url, params: { widget_code: { version: @widget_code.version, widget_code: @widget_code.widget_code, widget_id: @widget_code.widget_id } }
    end

    assert_redirected_to widget_code_url(WidgetCode.last)
  end

  test "should show widget_code" do
    get widget_code_url(@widget_code)
    assert_response :success
  end

  test "should get edit" do
    get edit_widget_code_url(@widget_code)
    assert_response :success
  end

  test "should update widget_code" do
    patch widget_code_url(@widget_code), params: { widget_code: { version: @widget_code.version, widget_code: @widget_code.widget_code, widget_id: @widget_code.widget_id } }
    assert_redirected_to widget_code_url(@widget_code)
  end

  test "should destroy widget_code" do
    assert_difference('WidgetCode.count', -1) do
      delete widget_code_url(@widget_code)
    end

    assert_redirected_to widget_codes_url
  end
end
