import { useState } from 'react';
import DashboardCard from "./DashboardCard";
import { GridTable, TableData } from "./GridTable";
import { ColumnDefinition } from "tabulator-tables";
import { Button, Form, Row, Col, Container } from 'react-bootstrap';



interface Condition {
  field: string;
  operator: string;
  value: string;
}

const Filter = () => {
  const [conditions, setConditions] = useState([
    { field: '', operator: '=', value: '' }
  ]);

  const handleAddCondition = () => {
    setConditions([...conditions, { field: '', operator: '=', value: '' }]);
  };

  const handleConditionChange = (index: number, key: keyof Condition, value: string)  => {
    const newConditions = [...conditions];
    newConditions[index][key] = value;
    setConditions(newConditions);
  };

  return (
    <Container fluid>
      {conditions.map((condition, index) => (
        <Row key={index} className="mb-2">
          <Col>
            <Form.Control 
              size='sm' 
              type="text" 
              placeholder="欄位名" 
              value={condition.field} 
              onChange={(e) => handleConditionChange(index, 'field', e.target.value)} 
            />
          </Col>
          <Col>
            <Form.Select 
              size='sm' 
              value={condition.operator} 
              onChange={(e) => handleConditionChange(index, 'operator', e.target.value)}
            >
              <option value="=">=</option>
              <option value="<">&lt;</option>
              <option value=">">&gt;</option>
              <option value="like">like</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Control 
              size='sm' 
              type="text" 
              placeholder="條件輸入" 
              value={condition.value} 
              onChange={(e) => handleConditionChange(index, 'value', e.target.value)} 
            />
          </Col>
        </Row>
      ))}
      <Button className='me-2' size='sm' variant='secondary' onClick={handleAddCondition}>新增條件</Button>
      <Button size='sm' variant='primary'>查詢</Button>
    </Container>
  );
};


const SmartQuery = () => {
  const rows: TableData[] = [
    { id: 1, name: "Alice", age: 25, email: "alice@example.com" },
    { id: 2, name: "Bob", age: 30, email: "bob@example.com" },
    { id: 3, name: "Charlie", age: 28, email: "charlie@example.com" },
  ];

  const columns: ColumnDefinition[] = [
    { title: "ID", field: "id" },
    { title: "Name", field: "name" },
    { title: "Age", field: "age" },
    { title: "Email", field: "email" },
  ];


  return (
    <div>
      <DashboardCard title="Query Condityion" className='mb-2'>
        <Filter />
      </DashboardCard>
      <DashboardCard title="Query Results">
        <GridTable rows={rows} columns={columns} />
      </DashboardCard>
    </div>
  );
};

export default SmartQuery;
