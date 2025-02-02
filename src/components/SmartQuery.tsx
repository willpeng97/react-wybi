import { useState } from 'react';
import DashboardCard from "./DashboardCard";
import { GridTable, TableData } from "./GridTable";
import { ColumnDefinition } from "tabulator-tables";
import { Button, Form, Row, Col, Container } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai';

interface Condition {
  field: string;
  operator: string;
  value: string;
}

// Filter 組件
const Filter: React.FC<{ onSearch: (conditions: Condition[]) => void }> = ({ onSearch }) => {
  const [conditions, setConditions] = useState<Condition[]>([
    { field: '', operator: '=', value: '' }
  ]);

  const handleAddCondition = () => {
    setConditions([...conditions, { field: '', operator: '=', value: '' }]);
  };

  const handleRemoveCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const handleResetCondition = () => {
    setConditions([]);
  };

  const handleConditionChange = (index: number, key: keyof Condition, value: string) => {
    const newConditions = [...conditions];
    newConditions[index][key] = value;
    setConditions(newConditions);
  };

  const handleSearchClick = () => {
    onSearch(conditions);  // 在這裡觸發傳遞回 SmartQuery 的 onSearch
  };

  return (
    <Container fluid>
      {!conditions.length && ( <div className='mb-2'>No Conditions</div> )}
      {conditions.map((condition, index) => (
        <Row key={index} className="mb-2">
          <Col xs="auto" className="d-flex align-items-center">
            <Form.Label className="me-2 mb-0">Field:</Form.Label>
            <Form.Select 
              size='sm' 
              value={condition.field} 
              onChange={(e) => handleConditionChange(index, 'field', e.target.value)} 
            >
              <option value="id">ID</option>
              <option value="name">Name</option>
              <option value="age">Age</option>
              <option value="email">Email</option>
            </Form.Select>
          </Col>
          <Col xs="auto" className="d-flex align-items-center">
            <Form.Label className="me-2 mb-0">Type:</Form.Label>
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
          <Col xs="auto" className="d-flex align-items-center">
            <Form.Label className="me-2 mb-0">Value:</Form.Label>
            <Form.Control 
              size='sm' 
              type="text" 
              placeholder="key in..." 
              value={condition.value} 
              onChange={(e) => handleConditionChange(index, 'value', e.target.value)} 
            />
          </Col>
          <Col xs="auto" className="d-flex align-items-center">
            <AiOutlineClose 
              style={{ color: 'red', cursor: 'pointer' }} 
              size={20} 
              onClick={() => handleRemoveCondition(index)}
            />
          </Col>
        </Row>
      ))}
      <Button size='sm' className='me-2' variant='secondary' onClick={handleResetCondition}>Clear</Button>
      <Button className='me-2' size='sm' variant='secondary' onClick={handleAddCondition}>Add</Button>
      <Button size='sm' variant='primary' onClick={handleSearchClick}>Query</Button>
    </Container>
  );
};

// SmartQuery 組件
export const SmartQuery: React.FC = () => {
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

  const [filteredRows, setFilteredRows] = useState<TableData[]>(rows); // 用來儲存過濾後的資料

  // 查詢條件過濾邏輯
  const handleSearch = (conditions: Condition[]) => {
    let filteredData = rows;
  
    conditions.forEach(condition => {
      if (condition.field && condition.value) {
        filteredData = filteredData.filter((row) => {
          const fieldValue = row[condition.field as keyof TableData]; // 類型斷言，將 `condition.field` 鑑定為 `TableData` 中的某個欄位
    
          // 轉換為適當的比較類型
          let valueToCompare = condition.value;
    
          // 如果 fieldValue 和 condition.value 都是數字，將它們轉為字串比較
          if (typeof fieldValue === 'number' && !isNaN(Number(condition.value))) {
            valueToCompare = String(condition.value); // 將 condition.value 轉為字串
          } else if (typeof fieldValue === 'string' && typeof condition.value === 'string') {
            // 如果 fieldValue 和 condition.value 都是字串，將它們都轉為小寫後比較
            valueToCompare = condition.value.toLowerCase();
          }
    
          switch (condition.operator) {
            case '=':
              return String(fieldValue).toLowerCase() === valueToCompare.toLowerCase(); // 無論是字串還是數字，轉為字串後比較
            case '<':
              return typeof fieldValue === 'number' && fieldValue < Number(valueToCompare); // 確保 `fieldValue` 是數字
            case '>':
              return typeof fieldValue === 'number' && fieldValue > Number(valueToCompare); // 確保 `fieldValue` 是數字
            case 'like':
              return typeof fieldValue === 'string' && fieldValue.toLowerCase().includes(valueToCompare); // 確保 `fieldValue` 是字串
            default:
              return true;
          }
        });
      }
    });
  
    setFilteredRows(filteredData);
  };

  return (
    <div>
      <DashboardCard title="Query Condition" className='mb-2'>
        <Filter onSearch={handleSearch} />
      </DashboardCard>
      <DashboardCard>
        <GridTable rows={filteredRows} columns={columns} />
      </DashboardCard>
    </div>
  );
};