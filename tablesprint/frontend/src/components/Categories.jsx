import React, { useState, useEffect } from 'react';
import { Layout, Menu, Table, Input, Button, Space, Modal } from 'antd';
import { SearchOutlined, PlusOutlined, DashboardOutlined, ShoppingOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Sider, Content } = Layout;

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', image: '', status: '', sequence: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to fetch categories. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
      filteredValue: [searchText],
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt="Category" style={{ width: 50 }} />,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Sequence',
      dataIndex: 'sequence',
      key: 'sequence',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleAddCategory = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      await axios.post('/api/categories', newCategory);
      setIsModalVisible(false);
      fetchCategories();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleEdit = (record) => {
    console.log('Edit category:', record);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} theme="dark">
        <Menu
          mode="vertical"
          theme="dark"
          defaultSelectedKeys={['2']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<ShoppingOutlined />}>
            Categories
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            Users
          </Menu.Item>
          <Menu.Item key="4" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: '#fff',
          }}
        >
          <div style={{ marginBottom: 16 }}>
            <Input
              placeholder="Search categories"
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: 200, marginRight: 16 }}
              prefix={<SearchOutlined />}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddCategory}
            >
              Add Category
            </Button>
          </div>
          <Table 
            columns={columns} 
            dataSource={categories} 
            rowKey="id" 
            loading={loading}
            pagination={{ pageSize: 10 }}
          />
          <Modal
            title="Add Category"
            visible={isModalVisible}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
          >
            <Input
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            />
            {/* Add more inputs for image, status, and sequence */}
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Categories;
