import React, {createContext} from 'react';
import {Form} from 'antd';

export const TableContext = createContext();

const TableRow = ({form, index, ...props}) => (
    <TableContext.Provider value={form}>
        <tr {...props} />
    </TableContext.Provider>
);

export const TableFormRow = Form.create()(TableRow);