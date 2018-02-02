require 'test_helper'

class WidgetInstallsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @widget_install = widget_installs(:one)
  end

  test "should get index" do
    get widget_installs_url
    assert_response :success
  end

  test "should get new" do
    get new_widget_install_url
    assert_response :success
  end

  test "should create widget_install" do
    assert_difference('WidgetInstall.count') do
      post widget_installs_url, params: { widget_install: { user_id: @widget_install.user_id, widget_id: @widget_install.widget_id } }
    end

    assert_redirected_to widget_install_url(WidgetInstall.last)
  end

  test "should show widget_install" do
    get widget_install_url(@widget_install)
    assert_response :success
  end

  test "should get edit" do
    get edit_widget_install_url(@widget_install)
    assert_response :success
  end

  test "should update widget_install" do
    patch widget_install_url(@widget_install), params: { widget_install: { user_id: @widget_install.user_id, widget_id: @widget_install.widget_id } }
    assert_redirected_to widget_install_url(@widget_install)
  end

  test "should destroy widget_install" do
    assert_difference('WidgetInstall.count', -1) do
      delete widget_install_url(@widget_install)
    end

    assert_redirected_to widget_installs_url
  end
end
