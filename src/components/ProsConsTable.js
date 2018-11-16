import React from 'react';
import {Table, Button, Popconfirm} from 'antd';
import PropTypes from 'prop-types';

import {TableFormRow} from './TableRow';
import TableCell from './TableCell';

export default class ProsConsTable extends React.Component {

    constructor(props) {
        super(props);
        this.columns = [{
            title: props.name,
            dataIndex: 'name',
            width: '70%',
            editable: true,
        }, {
            title: '',
            dataIndex: '',
            render: (text, record) => {
                return (
                    this.props.data.length >= 1
                        ? (
                            <Popconfirm title="Are you Sure?" onConfirm={() => this.handleDelete(record.key)}>
                                <Button type="danger">
                                    -
                                </Button>
                            </Popconfirm>
                        ) : null
                );
            },
        }];
    }

    handleDelete = (key) => {
        const dataSource = [...this.props.data];
        dataSource.splice(key, 1);
        this.props.onUpdate(dataSource);
    };

    handleAdd = () => {
        const {data} = this.props;
        const newData = {
            key: data.length,
            name: `random reason ${data.length + 1}`,
        };
        this.props.onUpdate([...data, newData.name]);
    };

    handleSave = (row) => {
        const newData = [...this.props.data],
            index = newData.findIndex(item => row.key === item.key);
        newData.splice(index, 1, row.name);
        this.props.onUpdate(newData);
    };

    render() {
        const {data} = this.props,
            tableData = data.map((item, index) => {
                return {
                    key: index,
                    name: item
                }
            });
        const components = {
            body: {
                row: TableFormRow,
                cell: TableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    pagination={false}
                    dataSource={tableData}
                    columns={columns}
                />
                <Button onClick={this.handleAdd} type="primary" style={{margin: 16}}>
                    +
                </Button>
            </div>
        );
    }
}

ProsConsTable.propTypes = {
    data: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};